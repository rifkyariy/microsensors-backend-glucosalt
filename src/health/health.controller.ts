import { Controller, Get, Post, Body, Param, Query, Sse, MessageEvent } from '@nestjs/common';
import { Observable, interval, map, switchMap } from 'rxjs';
import { HealthService } from './health.service';
import { CreateHealthMetricDto } from './dto/create-health-metric.dto';
import { QueryHealthMetricsDto } from './dto/query-health-metrics.dto';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  /**
   * POST /health/metrics - ESP32 sends sensor data here
   */
  @Post('metrics')
  create(@Body() createHealthMetricDto: CreateHealthMetricDto) {
    return this.healthService.createHealthMetric(createHealthMetricDto);
  }

  /**
   * GET /health/metrics/:userId - Query health metrics
   */
  @Get('metrics/:userId')
  findAll(@Param('userId') userId: string, @Query() query: QueryHealthMetricsDto) {
    return this.healthService.getHealthMetrics(userId, query);
  }

  /**
   * GET /health/stats/:userId - Get health statistics
   */
  @Get('stats/:userId')
  getStats(@Param('userId') userId: string, @Query() query: QueryHealthMetricsDto) {
    return this.healthService.getHealthStats(userId, query);
  }

  /**
   * SSE /health/stream/:userId - Real-time health metrics stream
   */
  @Sse('stream/:userId')
  streamMetrics(@Param('userId') userId: string): Observable<MessageEvent> {
    return interval(2000).pipe(
      switchMap(async () => {
        const result = await this.healthService.getLatestMetric(userId);
        return result;
      }),
      map((data) => ({
        data,
      })),
    );
  }

  /**
   * DEBUG: Get recent raw InfluxDB rows for a user (for troubleshooting writes/queries)
   */
  @Get('debug/:userId')
  debugRecent(@Param('userId') userId: string, @Query('lookback') lookback?: string) {
    return this.healthService.getRawRecentMetrics(userId, lookback || '-1h');
  }

  /**
   * DEBUG: Get recent raw InfluxDB rows across all users (no user_id filter)
   */
  @Get('debug-recent')
  debugRecentAll(@Query('lookback') lookback?: string) {
    return this.healthService.getRecentAllMetrics(lookback || '-1h');
  }

  /**
   * GET /health/ppg/:userId - Get PPG raw data for analytics
   */
  @Get('ppg/:userId')
  getPpgRawData(
    @Param('userId') userId: string,
    @Query('start') start?: string,
    @Query('limit') limit?: string,
  ) {
    return this.healthService.getPpgRawData(
      userId,
      start || '-24h',
      limit ? parseInt(limit, 10) : 100,
    );
  }
}
