import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { SurveysModule } from './surveys/surveys.module';

@Module({
  imports: [DatabaseModule, SurveysModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
