import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database';
import { CreateSurveyDto } from './dtos';
import { collectAnswersToCreate } from './utils';

@Injectable()
export class SurveysService {
  constructor(private db: DatabaseService) {}

  public async create(data: CreateSurveyDto) {
    return this.db.$transaction(async (tx) => {
      const { id } = await tx.survey.create({
        data: {
          title: data.title,
          description: data.description,
        },
      });
      const newQuestions = await tx.question.createManyAndReturn({
        data: data.questions.map((question) => ({
          text: question.text,
          type: question.type,
          surveyId: id,
        })),
      });
      await tx.answer.createMany({
        data: collectAnswersToCreate(data.questions, newQuestions),
      });

      return { id };
    });
  }
}
