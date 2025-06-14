import { GameService } from './game.service';

describe('GameService - resetGame', () => {
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
  });

  it('should reset all rooms to not completed', () => {
    // Complete some rooms first
    service.checkAnswer(1, '6');
    service.checkAnswer(2, 'buraco');
    // Ensure rooms are completed
    expect(service['rooms'][0].completed).toBe(true);
    expect(service['rooms'][1].completed).toBe(true);

    // Reset game
    const result = service.resetGame();

    // All rooms should be not completed
    service['rooms'].forEach((room) => {
      expect(room.completed).toBe(false);
    });

    // Check return value
    expect(result).toEqual({
      success: true,
      message: 'Jogo resetado com sucesso',
      progress: {
        percentage: 0,
        completedRooms: 0,
        totalRooms: 3,
      },
    });
  });

  it('should not throw if called when all rooms are already not completed', () => {
    // All rooms are not completed by default
    const result = service.resetGame();
    expect(result.success).toBe(true);
    service['rooms'].forEach((room) => {
      expect(room.completed).toBe(false);
    });
  });

  it('should mark a room as completed when the correct answer is given', () => {
    const result = service.checkAnswer(1, '6');
    expect(result).toEqual({
      success: true,
      message: 'Resposta correta!',
      currentProgress: {
        percentage: 33,
        completedRooms: 1,
        totalRooms: 3,
      },
    });
    expect(service['rooms'][0].completed).toBe(true);
  });

  it('should not mark a room as completed when the answer is incorrect', () => {
    const result = service.checkAnswer(2, 'errado');
    expect(result).toEqual({
      success: false,
      message: 'Resposta incorreta. Tente novamente!',
    });
    expect(service['rooms'][1].completed).toBe(false);
  });

  it('should throw an error if room does not exist in checkAnswer', () => {
    expect(() => service.checkAnswer(999, 'qualquer')).toThrow(
      'Sala não encontrada',
    );
  });

  it('should return room data without answer in getRoom', () => {
    const room = service.getRoom(1);
    expect(room).toEqual({
      id: 1,
      name: 'Sala do Código',
      description: 'Decifre o código para avançar',
      challenge: {
        type: 'code',
        question: 'Qual é o resultado de 2 + 2 * 2?',
      },
      completed: false,
    });
  });

  it('should throw an error if room does not exist in getRoom', () => {
    expect(() => service.getRoom(999)).toThrow('Sala não encontrada');
  });

  it('should calculate progress correctly after completing rooms', () => {
    service.checkAnswer(1, '6');
    service.checkAnswer(2, 'buraco');
    const progress = service.getGameProgress();
    expect(progress).toEqual({
      percentage: 67,
      completedRooms: 2,
      totalRooms: 3,
    });
  });
});
