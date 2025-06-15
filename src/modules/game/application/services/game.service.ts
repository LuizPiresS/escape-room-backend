import {
  Inject,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { IGameService } from '../../domain/interfaces/game.service.interface';
import { IGameRepository } from '../../domain/interfaces/game.repository.interface';

@Injectable()
export class GameService implements IGameService {
  constructor(
    @Inject('GameRepository')
    private readonly gameRepository: IGameRepository,
  ) {}

  async getRoom(roomId: number) {
    // Verifica se todas as salas anteriores estão completas
    if (roomId > 1) {
      for (let i = 1; i < roomId; i++) {
        const prevRoom = await this.gameRepository.findRoomById(i);
        if (!prevRoom || !prevRoom.completed) {
          throw new ForbiddenException(
            'Você precisa completar as salas anteriores antes de acessar esta sala.',
          );
        }
      }
    }

    const room = await this.gameRepository.findRoomById(roomId);
    if (!room) throw new NotFoundException('Sala não encontrada');
    if (!room.challenge) {
      throw new NotFoundException('Desafio da sala não encontrado');
    }
    return {
      id: room.id,
      name: room.name,
      description: room.description,
      challenge: {
        type: room.challenge.type,
        question: room.challenge.question,
      },
      completed: room.completed,
    };
  }

  async checkAnswer(roomId: number, answer: string) {
    const room = await this.gameRepository.findRoomById(roomId);
    if (!room) throw new NotFoundException('Sala não encontrada');
    if (!room.challenge) {
      throw new NotFoundException('Desafio da sala não encontrado');
    }
    const isCorrect =
      room.challenge.answer.toLowerCase() === answer.toLowerCase();
    if (isCorrect) {
      await this.gameRepository.updateRoomCompleted(roomId, true);
      return {
        success: true,
        message: 'Resposta correta!',
        currentProgress: await this.calculateProgress(),
      };
    }
    return {
      success: false,
      message: 'Resposta incorreta. Tente novamente!',
    };
  }

  private async calculateProgress() {
    const total = await this.gameRepository.countRooms();
    const completedCount = await this.gameRepository.countCompletedRooms();
    return {
      percentage: Math.round((completedCount / total) * 100),
      completedRooms: completedCount,
      totalRooms: total,
    };
  }

  async getGameProgress() {
    return this.calculateProgress();
  }

  async resetGame() {
    await this.gameRepository.resetAllRooms();
    return {
      success: true,
      message: 'Jogo resetado com sucesso',
      progress: await this.calculateProgress(),
    };
  }
}
