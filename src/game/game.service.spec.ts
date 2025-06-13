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
});
