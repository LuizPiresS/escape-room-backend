import { Module } from '@nestjs/common';
import { GameController } from './presentation/http/controllers/game.controller';
import { GameService } from './application/services/game.service';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GameController],
  providers: [
    {
      provide: 'GameService',
      useClass: GameService,
    },
  ],
})
export class GameModule {}
