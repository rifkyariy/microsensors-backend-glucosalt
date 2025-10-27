import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { BmiService } from './bmi.service';
import { CreateBmiDto } from './dto/create-bmi.dto';

@Controller('bmi')
export class BmiController {
  constructor(private readonly bmiService: BmiService) {}

  @Post()
  create(@Body() createBmiDto: CreateBmiDto) {
    return this.bmiService.create(createBmiDto);
  }

  @Get(':userId')
  findByUser(@Param('userId') userId: string, @Query('limit') limit?: string) {
    return this.bmiService.findByUser(userId, limit ? parseInt(limit, 10) : 30);
  }

  @Get(':userId/latest')
  getLatest(@Param('userId') userId: string) {
    return this.bmiService.getLatest(userId);
  }

  @Put(':userId/sync')
  syncBmiRecords(@Param('userId') userId: string) {
    return this.bmiService.syncBmiRecords(userId);
  }
}
