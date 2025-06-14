import { Controller, Get, Param, Post, Body, Inject } from '@nestjs/common';
import { IGameService } from '../../../domain/interfaces/game.service.interface';
import { RoomIdParamDto } from '../dtos/room-id-param.dto';
import { CheckAnswerDto } from '../dtos/check-answer.dto';

@Controller('game')
export class GameController {
  constructor(
    @Inject('GameService')
    private readonly gameService: IGameService,
  ) {}

  @Get('room/:id')
  getRoom(@Param('params') params: RoomIdParamDto) {
    return this.gameService.getRoom(params.id);
  }

  @Post('room/:id/check-answer')
  checkAnswer(@Param() params: RoomIdParamDto, @Body() body: CheckAnswerDto) {
    return this.gameService.checkAnswer(params.id, body.answer);
  }

  @Get('progress')
  getProgress() {
    return {
      success: true,
      data: this.gameService.getGameProgress(),
    };
  }

  @Post('reset')
  resetGame() {
    const result = this.gameService.resetGame();
    return {
      success: result.success,
      data: result.progress,
      message: result.message,
    };
  }
}
