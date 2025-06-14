import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class RoomIdParamDto {
  @Type(() => Number)
  @IsInt()
  id: number;
}
