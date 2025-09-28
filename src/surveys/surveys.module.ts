import { Module } from '@nestjs/common';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { DatabaseModule, DatabaseService } from '../database';

@Module({
  imports: [DatabaseModule],
  controllers: [SurveysController],
  providers: [SurveysService, DatabaseService],
})
export class SurveysModule {}
