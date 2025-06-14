import { GameService } from './game.service';
import { IGameRepository } from '../../domain/interfaces/game.repository.interface';

const mockRoom = {
  id: 1,
  name: 'Room 1',
  description: 'First room',
  challenge: {
    type: 'riddle',
    question: 'What has keys but can’t open locks?',
    answer: 'piano',
  },
  completed: false,
};

const mockCompletedRoom = { ...mockRoom, completed: true };

describe('GameService', () => {
  let service: GameService;
  let gameRepository: jest.Mocked<IGameRepository>;

  beforeEach(() => {
    gameRepository = {
      findRoomById: jest.fn(),
      updateRoomCompleted: jest.fn(),
      countRooms: jest.fn(),
      countCompletedRooms: jest.fn(),
      resetAllRooms: jest.fn(),
    } as jest.Mocked<IGameRepository>;

    service = new GameService(gameRepository);
  });

  describe('getRoom', () => {
    it('should return room data if found', async () => {
      gameRepository.findRoomById.mockResolvedValue(mockRoom);

      const result = await service.getRoom(1);

      expect(result).toEqual({
        id: mockRoom.id,
        name: mockRoom.name,
        description: mockRoom.description,
        challenge: {
          type: mockRoom.challenge.type,
          question: mockRoom.challenge.question,
        },
        completed: mockRoom.completed,
      });
    });

    it('should throw if room not found', async () => {
      gameRepository.findRoomById.mockResolvedValue(null);

      await expect(service.getRoom(1)).rejects.toThrow('Sala não encontrada');
    });

    it('should throw if challenge not found', async () => {
      gameRepository.findRoomById.mockResolvedValue({
        ...mockRoom,
        challenge: null,
      });

      await expect(service.getRoom(1)).rejects.toThrow(
        'Desafio da sala não encontrado',
      );
    });
  });

  describe('checkAnswer', () => {
    it('should return success if answer is correct (case-insensitive)', async () => {
      gameRepository.findRoomById.mockResolvedValue(mockRoom);
      gameRepository.updateRoomCompleted.mockResolvedValue(mockCompletedRoom);
      gameRepository.countRooms.mockResolvedValue(3);
      gameRepository.countCompletedRooms.mockResolvedValue(1);

      const result = await service.checkAnswer(1, 'Piano');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Resposta correta!');
      expect(result.currentProgress).toEqual({
        percentage: 33,
        completedRooms: 1,
        totalRooms: 3,
      });
    });

    it('should return failure if answer is incorrect', async () => {
      gameRepository.findRoomById.mockResolvedValue(mockRoom);

      const result = await service.checkAnswer(1, 'wrong');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Resposta incorreta. Tente novamente!');
    });

    it('should throw if room not found', async () => {
      gameRepository.findRoomById.mockResolvedValue(null);

      await expect(service.checkAnswer(1, 'piano')).rejects.toThrow(
        'Sala não encontrada',
      );
    });

    it('should throw if challenge not found', async () => {
      gameRepository.findRoomById.mockResolvedValue({
        ...mockRoom,
        challenge: null,
      });

      await expect(service.checkAnswer(1, 'piano')).rejects.toThrow(
        'Desafio da sala não encontrado',
      );
    });
  });

  describe('getGameProgress', () => {
    it('should return progress', async () => {
      gameRepository.countRooms.mockResolvedValue(5);
      gameRepository.countCompletedRooms.mockResolvedValue(2);

      const result = await service.getGameProgress();

      expect(result).toEqual({
        percentage: 40,
        completedRooms: 2,
        totalRooms: 5,
      });
    });
  });

  describe('resetGame', () => {
    it('should reset all rooms and return progress', async () => {
      gameRepository.resetAllRooms.mockResolvedValue(undefined);
      gameRepository.countRooms.mockResolvedValue(4);
      gameRepository.countCompletedRooms.mockResolvedValue(0);

      const result = await service.resetGame();

      expect(result.success).toBe(true);
      expect(result.message).toBe('Jogo resetado com sucesso');
      expect(result.progress).toEqual({
        percentage: 0,
        completedRooms: 0,
        totalRooms: 4,
      });
    });
  });
});
