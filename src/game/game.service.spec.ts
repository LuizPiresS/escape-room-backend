import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
  });

  describe('getRoom', () => {
    it('should return room data without answer', () => {
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

    it('should throw error if room does not exist', () => {
      expect(() => service.getRoom(999)).toThrow('Sala não encontrada');
    });
  });

  describe('checkAnswer', () => {
    it('should return correct=true for correct answer (case insensitive)', () => {
      const result = service.checkAnswer(1, '6');
      expect(result).toEqual({
        correct: true,
        message: 'Resposta correta!',
        nextRoomAvailable: true,
        escaped: false,
      });
    });

    it('should mark room as completed after correct answer', () => {
      service.checkAnswer(1, '6');
      const progress = service.getGameProgress();
      expect(progress.completedRooms).toBe(1);
    });

    it('should return correct=false for incorrect answer', () => {
      const result = service.checkAnswer(1, '5');
      expect(result).toEqual({
        correct: false,
        message: 'Resposta incorreta. Tente novamente!',
      });
    });

    it('should throw error if room does not exist', () => {
      expect(() => service.checkAnswer(999, 'any')).toThrow(
        'Sala não encontrada',
      );
    });

    it('should return escaped=true for last room', () => {
      service.checkAnswer(1, '6');
      service.checkAnswer(2, 'buraco');
      const result = service.checkAnswer(3, '32');
      expect(result).toEqual({
        correct: true,
        message: 'Resposta correta!',
        nextRoomAvailable: false,
        escaped: true,
      });
    });
  });

  describe('getGameProgress', () => {
    it('should return 0 progress initially', () => {
      const progress = service.getGameProgress();
      expect(progress).toEqual({
        totalRooms: 3,
        completedRooms: 0,
        progress: 0,
      });
    });

    it('should update progress after completing rooms', () => {
      service.checkAnswer(1, '6');
      let progress = service.getGameProgress();
      expect(progress).toEqual({
        totalRooms: 3,
        completedRooms: 1,
        progress: 33,
      });

      service.checkAnswer(2, 'buraco');
      progress = service.getGameProgress();
      expect(progress).toEqual({
        totalRooms: 3,
        completedRooms: 2,
        progress: 67,
      });

      service.checkAnswer(3, '32');
      progress = service.getGameProgress();
      expect(progress).toEqual({
        totalRooms: 3,
        completedRooms: 3,
        progress: 100,
      });
    });
  });
});
