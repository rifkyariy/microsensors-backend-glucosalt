import { Module } from '@nestjs/common';
import { BmiService } from './bmi.service';
import { BmiController } from './bmi.controller';

@Module({
  controllers: [BmiController],
  providers: [BmiService],
})
export class BmiModule {}
