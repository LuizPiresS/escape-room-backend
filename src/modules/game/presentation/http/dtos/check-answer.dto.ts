import { IsString } from 'class-validator';

export class CheckAnswerDto {
  @IsString()
  answer: string;
}
