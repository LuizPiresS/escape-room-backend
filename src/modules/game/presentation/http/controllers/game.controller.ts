import { Controller, Get, Param, Post, Body, Inject } from '@nestjs/common';
import { IGameService } from '../../../domain/interfaces/game.service.interface';

@Controller('game')
export class GameController {
  constructor(
    @Inject('GameService')
    private readonly gameService: IGameService,
  ) {}

  @Get('room/:id')
  getRoom(@Param('id') id: string) {
    return this.gameService.getRoom(parseInt(id));
  }

  @Post('room/:id/check-answer')
  checkAnswer(@Param('id') id: string, @Body('answer') answer: string) {
    return this.gameService.checkAnswer(parseInt(id), answer);
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
