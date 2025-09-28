import { Body, Controller, Post } from '@nestjs/common';
import { CreateSurveyDto } from './dtos';
import { SurveysService } from './surveys.service';

@Controller('surveys')
export class SurveysController {
  constructor(private surveysService: SurveysService) {}

  @Post('new')
  public async createSurvey(@Body() dto: CreateSurveyDto) {
    return this.surveysService.create(dto);
  }
}
