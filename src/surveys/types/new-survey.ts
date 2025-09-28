import { ApiProperty, PickType } from '@nestjs/swagger';
import { Survey } from './survey';
import { NewQuestion } from './new-question';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class NewSurvey extends PickType(Survey, [
  'title',
  'description',
] as const) {
  @ApiProperty({ type: [NewQuestion] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => NewQuestion)
  questions: NewQuestion[];
}
