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
  async getRoom(@Param() params: RoomIdParamDto) {
    return this.gameService.getRoom(params.id);
  }

  @Post('room/:id/check-answer')
  async checkAnswer(
    @Param() params: RoomIdParamDto,
    @Body() body: CheckAnswerDto,
  ) {
    return this.gameService.checkAnswer(params.id, body.answer);
  }

  @Get('progress')
  async getProgress() {
    return {
      success: true,
      data: await this.gameService.getGameProgress(),
    };
  }

  @Post('reset')
  async resetGame() {
    const result = await this.gameService.resetGame();
    return {
      success: result.success,
      data: result.progress,
      message: result.message,
    };
  }
}
