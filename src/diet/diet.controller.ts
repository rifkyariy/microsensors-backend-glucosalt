import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DietService } from './diet.service';
import { CreateDietDto } from './dto/create-diet.dto';
import { QueryDietDto } from './dto/query-diet.dto';

@Controller('diet')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Post()
  create(@Body() createDietDto: CreateDietDto) {
    return this.dietService.create(createDietDto);
  }

  @Get(':userId')
  findByUser(@Param('userId') userId: string, @Query() query: QueryDietDto) {
    return this.dietService.findByUser(userId, query);
  }

  @Get(':userId/daily')
  getDailySummary(@Param('userId') userId: string, @Query('date') date?: string) {
    return this.dietService.getDailySummary(userId, date);
  }

  @Get('food/search')
  searchFood(@Query('q') query: string) {
    return this.dietService.searchFood(query);
  }
}
