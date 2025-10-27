import { Injectable, Logger } from '@nestjs/common';
import { InfluxdbService } from '../influxdb/influxdb.service';
import { CreateHealthMetricDto } from './dto/create-health-metric.dto';
import { QueryHealthMetricsDto } from './dto/query-health-metrics.dto';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private influxdbService: InfluxdbService) {}

  /**
   * Store health metrics from ESP32 device
   */
  async createHealthMetric(createHealthMetricDto: CreateHealthMetricDto) {
    try {
      await this.influxdbService.writeHealthMetric({
        userId: createHealthMetricDto.user_id,
        deviceId: createHealthMetricDto.device_id,
        heartRate: createHealthMetricDto.heart_rate,
        bloodOxygen: createHealthMetricDto.blood_oxygen,
        ppgIr: createHealthMetricDto.ppg_ir,
        ppgRed: createHealthMetricDto.ppg_red,
        timestamp: createHealthMetricDto.timestamp ? new Date(createHealthMetricDto.timestamp) : undefined,
      });

      return {
        success: true,
        message: 'Health metric recorded successfully',
        data: createHealthMetricDto,
      };
    } catch (error) {
      this.logger.error('Failed to create health metric', error);
      throw error;
    }
  }

  /**
   * Query health metrics for a user
   */
  async getHealthMetrics(userId: string, query: QueryHealthMetricsDto) {
    try {
      const metrics = await this.influxdbService.queryHealthMetrics({
        userId,
        start: query.start,
        end: query.end,
        aggregateWindow: query.interval,
      });

      return {
        success: true,
        data: metrics,
        count: metrics.length,
      };
    } catch (error) {
      this.logger.error('Failed to query health metrics', error);
      throw error;
    }
  }

  /**
   * Get health statistics for a user
   */
  async getHealthStats(userId: string, query: QueryHealthMetricsDto) {
    try {
      const stats = await this.influxdbService.getHealthStats({
        userId,
        start: query.start,
        end: query.end,
      });

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      this.logger.error('Failed to get health stats', error);
      throw error;
    }
  }

  /**
   * Get latest health metric for a user (for real-time streaming)
   */
  async getLatestMetric(userId: string) {
    try {
      // Use a dedicated method that pivots heart_rate and blood_oxygen into one row
      // Increased lookback to -1h to catch recent manual/device posts during testing
      const latest = await this.influxdbService.getLatestHealthMetric(userId, '-1h');

      return {
        success: true,
        data: latest,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Failed to get latest metric', error);
      return {
        success: false,
        data: null,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /** Debug: return recent raw rows from Influx for a user */
  async getRawRecentMetrics(userId: string, lookback = '-1h') {
    try {
      const query = `
        from(bucket: "${(this as any).influxdbService.bucket}")
          |> range(start: ${lookback})
          |> filter(fn: (r) => r["_measurement"] == "health_metrics")
          |> filter(fn: (r) => r["user_id"] == "${userId}")
          |> sort(columns:["_time"], desc: true)
          |> limit(n:50)
      `;

      // use the raw query helper
      const rows = await (this as any).influxdbService.queryRaw(query);
      return { success: true, data: rows, count: rows.length };
    } catch (error) {
      this.logger.error('Failed to fetch raw recent metrics', error);
      return { success: false, data: [], count: 0, error: error.message || String(error) };
    }
  }

  /** Debug: return recent raw rows across all users (no user_id filter) */
  async getRecentAllMetrics(lookback = '-1h') {
    try {
      const query = `
        from(bucket: "${(this as any).influxdbService.bucket}")
          |> range(start: ${lookback})
          |> filter(fn: (r) => r["_measurement"] == "health_metrics")
          |> sort(columns:["_time"], desc: true)
          |> limit(n:100)
      `;

      const rows = await (this as any).influxdbService.queryRaw(query);
      return { success: true, data: rows, count: rows.length };
    } catch (error) {
      this.logger.error('Failed to fetch recent metrics', error);
      return { success: false, data: [], count: 0, error: error.message || String(error) };
    }
  }

  /**
   * Get PPG raw data for analytics
   */
  async getPpgRawData(userId: string, start = '-24h', limit = 100) {
    try {
      const ppgData = await this.influxdbService.queryPpgRawData({
        userId,
        start,
        limit,
      });

      return {
        success: true,
        data: ppgData,
        count: ppgData.length,
      };
    } catch (error) {
      this.logger.error('Failed to fetch PPG raw data', error);
      throw error;
    }
  }
}
