import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InfluxDB, Point, QueryApi, WriteApi } from '@influxdata/influxdb-client';

@Injectable()
export class InfluxdbService {
  private readonly logger = new Logger(InfluxdbService.name);
  private influxDB: InfluxDB;
  private writeApi: WriteApi;
  private queryApi: QueryApi;
  private bucket: string;
  private org: string;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('INFLUXDB_URL') || 'http://localhost:8086';
    const token = this.configService.get<string>('INFLUXDB_TOKEN') || '';
    this.org = this.configService.get<string>('INFLUXDB_ORG') || 'default';
    this.bucket = this.configService.get<string>('INFLUXDB_BUCKET') || 'health_metrics';

    this.influxDB = new InfluxDB({ url, token });
    this.writeApi = this.influxDB.getWriteApi(this.org, this.bucket);
    this.queryApi = this.influxDB.getQueryApi(this.org);

    this.logger.log('InfluxDB service initialized');
  }

  /**
   * Run a raw query and return the rows as objects. Used for debugging.
   */
  async queryRaw(query: string): Promise<any[]> {
    try {
      const results: any[] = [];
      await this.queryApi.queryRows(query, {
        next(row: any, tableMeta: any) {
          results.push(tableMeta.toObject(row));
        },
        error(err: any) {
          throw err;
        },
        complete() {},
      });
      return results;
    } catch (error) {
      this.logger.error('Error running raw query', error);
      throw error;
    }
  }

  /**
   * Write health metrics data point to InfluxDB
   */
  async writeHealthMetric(data: {
    userId: string;
    deviceId: string;
    heartRate: number;
    bloodOxygen: number;
    ppgIr?: number[];
    ppgRed?: number[];
    timestamp?: Date;
  }): Promise<void> {
    try {
      const point = new Point('health_metrics')
        .tag('user_id', data.userId)
        .tag('device_id', data.deviceId)
        .floatField('heart_rate', data.heartRate)
        .floatField('blood_oxygen', data.bloodOxygen)
        .timestamp(data.timestamp || new Date());

      // Detailed debug log: include bucket/org and point values to help trace writes
      this.logger.log(
        `Writing health metric -> bucket=${this.bucket} org=${this.org} user=${data.userId} device=${data.deviceId} hr=${data.heartRate} spo2=${data.bloodOxygen} ts=${(data.timestamp || new Date()).toISOString()}`,
      );

      this.writeApi.writePoint(point);
      await this.writeApi.flush();

      // If PPG data is provided, store it in a separate measurement for analytics
      if (data.ppgIr && data.ppgIr.length > 0 && data.ppgRed && data.ppgRed.length > 0) {
        const ppgPoint = new Point('ppg_raw')
          .tag('user_id', data.userId)
          .tag('device_id', data.deviceId)
          .stringField('ppg_ir', JSON.stringify(data.ppgIr))
          .stringField('ppg_red', JSON.stringify(data.ppgRed))
          .intField('sample_count', data.ppgIr.length)
          .timestamp(data.timestamp || new Date());

        this.writeApi.writePoint(ppgPoint);
        await this.writeApi.flush();

        this.logger.log(`Written PPG data for user ${data.userId} (${data.ppgIr.length} samples)`);
      }

      this.logger.log(`Written health metric for user ${data.userId}`);
    } catch (error) {
      this.logger.error('Error writing to InfluxDB', error);
      throw error;
    }
  }

  /**
   * Query health metrics for a specific user within a time range
   */
  async queryHealthMetrics(params: {
    userId: string;
    start?: string; // e.g., '-7d', '-24h'
    end?: string;
    aggregateWindow?: string; // e.g., '1h', '5m'
  }): Promise<any[]> {
    const { userId, start = '-7d', end = 'now()', aggregateWindow } = params;

    let query = `
      from(bucket: "${this.bucket}")
        |> range(start: ${start}, stop: ${end})
        |> filter(fn: (r) => r["_measurement"] == "health_metrics")
        |> filter(fn: (r) => r["user_id"] == "${userId}")
        |> filter(fn: (r) => r["_field"] == "heart_rate" or r["_field"] == "blood_oxygen")
    `;

    if (aggregateWindow) {
      query += `
        |> aggregateWindow(every: ${aggregateWindow}, fn: mean, createEmpty: false)
      `;
    }

    query += `
      |> yield(name: "mean")
    `;

    try {
      // Use Promise wrapper for proper async handling
      const results: any[] = await new Promise((resolve, reject) => {
        const rows: any[] = [];
        this.queryApi.queryRows(query, {
          next(row: any, tableMeta: any) {
            const record = tableMeta.toObject(row);
            rows.push(record);
          },
          error(error: any) {
            reject(error);
          },
          complete() {
            resolve(rows);
          },
        });
      });

      return results;
    } catch (error) {
      this.logger.error('Error querying InfluxDB', error);
      throw error;
    }
  }

  /**
   * Get the latest health metric (heart_rate + blood_oxygen) for a user
   * Attempts to pivot fields into a single record and return the most recent row.
   */
  async getLatestHealthMetric(userId: string, lookback = '-5m'): Promise<any | null> {
    // Many Influx rows for different fields may have slightly different timestamps
    // Pivoting on exact _time can return no rows if timestamps don't match. Instead,
    // query the last value for each field separately and merge them.
    const baseFilter = `from(bucket: "${this.bucket}") |> range(start: ${lookback}) |> filter(fn: (r) => r["_measurement"] == "health_metrics") |> filter(fn: (r) => r["user_id"] == "${userId}")`;

    const heartQuery = `${baseFilter} |> filter(fn: (r) => r["_field"] == "heart_rate") |> last()`;
    const oxyQuery = `${baseFilter} |> filter(fn: (r) => r["_field"] == "blood_oxygen") |> last()`;

    this.logger.debug(`getLatestHealthMetric: bucket=${this.bucket} org=${this.org} userId=${userId} lookback=${lookback}`);
    this.logger.debug(`Heart query: ${heartQuery}`);
    this.logger.debug(`Oxy query: ${oxyQuery}`);

    try {
      // Use Promise-based wrapper for queryRows to ensure proper async handling
      const heartResults: any[] = await new Promise((resolve, reject) => {
        const results: any[] = [];
        this.queryApi.queryRows(heartQuery, {
          next(row: any, tableMeta: any) {
            results.push(tableMeta.toObject(row));
          },
          error(err: any) {
            reject(err);
          },
          complete() {
            resolve(results);
          },
        });
      });

      const oxyResults: any[] = await new Promise((resolve, reject) => {
        const results: any[] = [];
        this.queryApi.queryRows(oxyQuery, {
          next(row: any, tableMeta: any) {
            results.push(tableMeta.toObject(row));
          },
          error(err: any) {
            reject(err);
          },
          complete() {
            resolve(results);
          },
        });
      });

      this.logger.debug(`Heart results count: ${heartResults.length}, Oxy results count: ${oxyResults.length}`);
      if (heartResults.length > 0) this.logger.debug(`Heart sample: ${JSON.stringify(heartResults[0])}`);
      if (oxyResults.length > 0) this.logger.debug(`Oxy sample: ${JSON.stringify(oxyResults[0])}`);

      const heart = heartResults.length ? heartResults[0] : null;
      const oxy = oxyResults.length ? oxyResults[0] : null;

      if (!heart && !oxy) return null;

      // Choose a timestamp: prefer the most recent of available points
      const times = [heart?._time, oxy?._time].filter(Boolean).map((t: any) => new Date(t));
      const latestTime = times.length ? new Date(Math.max(...times.map((d: Date) => d.getTime()))) : null;

      return {
        _time: latestTime ? latestTime.toISOString() : null,
        heart_rate: heart?._value ?? null,
        blood_oxygen: oxy?._value ?? null,
        device_id: heart?.device_id ?? oxy?.device_id ?? null,
        user_id: userId,
      };
    } catch (error) {
      this.logger.error('Error getting latest health metric', error);
      throw error;
    }
  }  /**
   * Get statistics for health metrics
   */
  async getHealthStats(params: {
    userId: string;
    start?: string;
    end?: string;
  }): Promise<{
    heartRate: { mean: number; min: number; max: number };
    bloodOxygen: { mean: number; min: number; max: number };
  }> {
    const { userId, start = '-7d', end = 'now()' } = params;

    const query = `
      from(bucket: "${this.bucket}")
        |> range(start: ${start}, stop: ${end})
        |> filter(fn: (r) => r["_measurement"] == "health_metrics")
        |> filter(fn: (r) => r["user_id"] == "${userId}")
        |> filter(fn: (r) => r["_field"] == "heart_rate" or r["_field"] == "blood_oxygen")
    `;

    try {
      // Use Promise wrapper for proper async handling
      const results: any[] = await new Promise((resolve, reject) => {
        const rows: any[] = [];
        this.queryApi.queryRows(query, {
          next(row: any, tableMeta: any) {
            const record = tableMeta.toObject(row);
            rows.push(record);
          },
          error(error: any) {
            reject(error);
          },
          complete() {
            resolve(rows);
          },
        });
      });

      // Calculate statistics
      const heartRateValues = results
        .filter((r: any) => r._field === 'heart_rate')
        .map((r: any) => Number(r._value));
      const bloodOxygenValues = results
        .filter((r: any) => r._field === 'blood_oxygen')
        .map((r: any) => Number(r._value));

      return {
        heartRate: {
          mean: heartRateValues.length
            ? heartRateValues.reduce((a, b) => a + b, 0) / heartRateValues.length
            : 0,
          min: heartRateValues.length ? Math.min(...heartRateValues) : 0,
          max: heartRateValues.length ? Math.max(...heartRateValues) : 0,
        },
        bloodOxygen: {
          mean: bloodOxygenValues.length
            ? bloodOxygenValues.reduce((a, b) => a + b, 0) / bloodOxygenValues.length
            : 0,
          min: bloodOxygenValues.length ? Math.min(...bloodOxygenValues) : 0,
          max: bloodOxygenValues.length ? Math.max(...bloodOxygenValues) : 0,
        },
      };
    } catch (error) {
      this.logger.error('Error getting health stats', error);
      throw error;
    }
  }

  /**
   * Query PPG raw data for analytics
   */
  async queryPpgRawData(params: {
    userId: string;
    start: string;
    end?: string;
    limit?: number;
  }): Promise<any[]> {
    try {
      const endFilter = params.end ? `|> range(start: ${params.start}, stop: ${params.end})` : `|> range(start: ${params.start})`;
      const limitFilter = params.limit ? `|> limit(n: ${params.limit})` : '';

      const query = `
        from(bucket: "${this.bucket}")
          ${endFilter}
          |> filter(fn: (r) => r["_measurement"] == "ppg_raw")
          |> filter(fn: (r) => r["user_id"] == "${params.userId}")
          |> sort(columns: ["_time"], desc: true)
          ${limitFilter}
      `;

      const results: any[] = await new Promise((resolve, reject) => {
        const rows: any[] = [];
        this.queryApi.queryRows(query, {
          next(row: any, tableMeta: any) {
            const record = tableMeta.toObject(row);
            rows.push(record);
          },
          error(error: any) {
            reject(error);
          },
          complete() {
            resolve(rows);
          },
        });
      });

      // Parse JSON strings back to arrays and structure the data
      const ppgRecords: any[] = [];
      const groupedByTime: { [key: string]: any } = {};

      results.forEach((row: any) => {
        const timestamp = new Date(row._time).toISOString();
        if (!groupedByTime[timestamp]) {
          groupedByTime[timestamp] = {
            timestamp,
            device_id: row.device_id,
            user_id: row.user_id,
          };
        }

        if (row._field === 'ppg_ir') {
          try {
            groupedByTime[timestamp].ppg_ir = JSON.parse(row._value);
          } catch (e) {
            groupedByTime[timestamp].ppg_ir = [];
          }
        } else if (row._field === 'ppg_red') {
          try {
            groupedByTime[timestamp].ppg_red = JSON.parse(row._value);
          } catch (e) {
            groupedByTime[timestamp].ppg_red = [];
          }
        } else if (row._field === 'sample_count') {
          groupedByTime[timestamp].sample_count = row._value;
        }
      });

      return Object.values(groupedByTime);
    } catch (error) {
      this.logger.error('Error querying PPG raw data', error);
      throw error;
    }
  }

  /**
   * Close connections on app shutdown
   */
  async onModuleDestroy() {
    try {
      await this.writeApi.close();
      this.logger.log('InfluxDB connection closed');
    } catch (error) {
      this.logger.error('Error closing InfluxDB connection', error);
    }
  }
}
