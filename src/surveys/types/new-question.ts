import { ApiProperty, PickType } from '@nestjs/swagger';
import { Question } from './question';
import { NewAnswer } from './new-answer';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';

export class NewQuestion extends PickType(Question, ['text', 'type']) {
  @ApiProperty({ type: [NewAnswer] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => NewAnswer)
  answers: NewAnswer[];
}
