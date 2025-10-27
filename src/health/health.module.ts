import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { InfluxdbModule } from '../influxdb/influxdb.module';

@Module({
  imports: [InfluxdbModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
