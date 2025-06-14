import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/infrastructure/database/prisma/prisma.service';
import { IGameRepository } from '../../domain/interfaces/game.repository.interface';

@Injectable()
export class GameRepository implements IGameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findRoomById(roomId: number) {
    return this.prisma.room.findUnique({
      where: { id: roomId },
      include: { challenge: true },
    });
  }

  async updateRoomCompleted(roomId: number, completed: boolean) {
    return this.prisma.room.update({
      where: { id: roomId },
      data: { completed },
    });
  }

  async countRooms() {
    return this.prisma.room.count();
  }

  async countCompletedRooms() {
    return this.prisma.room.count({
      where: { completed: true },
    });
  }

  async resetAllRooms() {
    return this.prisma.room.updateMany({
      data: { completed: false },
    });
  }
}
