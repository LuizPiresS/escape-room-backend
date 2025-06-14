import { Test, TestingModule } from '@nestjs/testing';
import { RoomIdParamDto } from '../dtos/room-id-param.dto';
import { CheckAnswerDto } from '../dtos/check-answer.dto';
import { GameController } from './game.controller';
describe('GameController', () => {
  let controller: GameController;
  let gameService: {
    getRoom: jest.Mock;
    checkAnswer: jest.Mock;
    getGameProgress: jest.Mock;
    resetGame: jest.Mock;
  };

  beforeEach(async () => {
    gameService = {
      getRoom: jest.fn(),
      checkAnswer: jest.fn(),
      getGameProgress: jest.fn(),
      resetGame: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [{ provide: 'GameService', useValue: gameService }],
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  describe('getRoom', () => {
    it('should call gameService.getRoom with id from DTO and return its result', () => {
      const mockRoom = { id: 1, name: 'Test Room' };
      gameService.getRoom.mockReturnValue(mockRoom);

      const params: RoomIdParamDto = { id: 1 };
      const result = controller.getRoom(params);

      expect(gameService.getRoom).toHaveBeenCalledWith(1);
      expect(result).toBe(mockRoom);
    });

    it('should handle non-numeric id gracefully', () => {
      gameService.getRoom.mockReturnValue(undefined);
      // Simulando um DTO inválido (id não numérico)
      const params = { id: NaN } as RoomIdParamDto;
      const result = controller.getRoom(params);
      expect(gameService.getRoom).toHaveBeenCalledWith(NaN);
      expect(result).toBeUndefined();
    });
  });

  describe('checkAnswer', () => {
    it('should call gameService.checkAnswer with id and answer from DTOs and return its result', () => {
      const mockResult = { success: true };
      gameService.checkAnswer.mockReturnValue(mockResult);

      const params: RoomIdParamDto = { id: 2 };
      const body: CheckAnswerDto = { answer: 'resposta' };
      const result = controller.checkAnswer(params, body);

      expect(gameService.checkAnswer).toHaveBeenCalledWith(2, 'resposta');
      expect(result).toBe(mockResult);
    });
  });

  describe('getProgress', () => {
    it('should return game progress wrapped in success response', () => {
      const mockProgress = { percentage: 50, completedRooms: 1, totalRooms: 2 };
      gameService.getGameProgress.mockReturnValue(mockProgress);

      const result = controller.getProgress();

      expect(gameService.getGameProgress).toHaveBeenCalled();
      expect(result).toEqual({
        success: true,
        data: mockProgress,
      });
    });
  });

  describe('resetGame', () => {
    it('should call gameService.resetGame and return formatted response', () => {
      const mockReset = {
        success: true,
        message: 'Game reset',
        progress: { percentage: 0, completedRooms: 0, totalRooms: 3 },
      };
      gameService.resetGame.mockReturnValue(mockReset);

      const result = controller.resetGame();

      expect(gameService.resetGame).toHaveBeenCalled();
      expect(result).toEqual({
        success: true,
        data: mockReset.progress,
        message: mockReset.message,
      });
    });
  });
});
