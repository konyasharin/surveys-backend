import { Answer, NewQuestion, Question } from '../types';
import { BadRequestException } from '@nestjs/common';

export const collectAnswersToCreate = (q: NewQuestion[], qFull: Question[]) => {
  return qFull.reduce(
    (acc, current) => {
      const answers = q.find((item) => item.text === current.text)?.answers;
      if (!answers) throw new BadRequestException();
      return [
        ...acc,
        ...answers.map((a) => ({ ...a, questionId: current.id })),
      ];
    },
    [] as Omit<Answer, 'id'>[],
  );
};
