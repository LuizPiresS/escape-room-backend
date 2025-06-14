import { Module } from '@nestjs/common';
import { GameController } from './presentation/http/controllers/game.controller';
import { PrismaModule } from '../../core/infrastructure/database/prisma/prisma.module';
import { GameRepository } from './infrastructure/repositories/game.repository';
import { GameService } from './application/services/game.service';

@Module({
  imports: [PrismaModule],
  controllers: [GameController],
  providers: [
    {
      provide: 'GameService',
      useClass: GameService,
    },
    {
      provide: 'GameRepository',
      useClass: GameRepository,
    },
  ],
})
export class GameModule {}
