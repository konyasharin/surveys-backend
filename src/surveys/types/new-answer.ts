import { PickType } from '@nestjs/swagger';
import { Answer } from './answer';

export class NewAnswer extends PickType(Answer, ['text', 'isTrue']) {}
