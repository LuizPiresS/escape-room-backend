import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
describe('GameController', () => {
  let controller: GameController;
  let gameService: { getRoom: jest.Mock };

  beforeEach(async () => {
    gameService = {
      getRoom: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [{ provide: 'GameService', useValue: gameService }],
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  describe('getRoom', () => {
    it('should call gameService.getRoom with parsed id and return its result', () => {
      const mockRoom = { id: 1, name: 'Test Room' };
      gameService.getRoom.mockReturnValue(mockRoom);

      const result = controller.getRoom('1');

      expect(gameService.getRoom).toHaveBeenCalledWith(1);
      expect(result).toBe(mockRoom);
    });

    it('should parse id string to integer', () => {
      controller.getRoom('42');
      expect(gameService.getRoom).toHaveBeenCalledWith(42);
    });

    it('should handle non-numeric id gracefully', () => {
      gameService.getRoom.mockReturnValue(undefined);
      const result = controller.getRoom('abc');
      expect(gameService.getRoom).toHaveBeenCalledWith(NaN);
      expect(result).toBeUndefined();
    });
  });
});
