import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  private rooms = [
    {
      id: 1,
      name: 'Sala do Código',
      description: 'Decifre o código para avançar',
      challenge: {
        type: 'code',
        question: 'Qual é o resultado de 2 + 2 * 2?',
        answer: '6',
      },
      completed: false,
    },
    {
      id: 2,
      name: 'Sala do Enigma',
      description: 'Resolva o enigma para continuar',
      challenge: {
        type: 'riddle',
        question: 'Quanto mais você tira, maior eu fico. O que sou?',
        answer: 'buraco',
      },
      completed: false,
    },
    {
      id: 3,
      name: 'Sala Final',
      description: 'Último desafio para escapar',
      challenge: {
        type: 'pattern',
        question: 'Qual é o próximo número na sequência: 2, 4, 8, 16, ___?',
        answer: '32',
      },
      completed: false,
    },
  ];

  getRoom(roomId: number) {
    const room = this.rooms.find((r) => r.id === roomId);
    if (!room) throw new Error('Sala não encontrada');
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

  checkAnswer(roomId: number, answer: string) {
    const room = this.rooms.find((r) => r.id === roomId);
    if (!room) throw new Error('Sala não encontrada');

    const isCorrect =
      room.challenge.answer.toLowerCase() === answer.toLowerCase();
    if (isCorrect) {
      room.completed = true;
      return {
        success: true,
        message: 'Resposta correta!',
        currentProgress: this.calculateProgress(),
      };
    }
    return {
      success: false,
      message: 'Resposta incorreta. Tente novamente!',
    };
  }

  private calculateProgress() {
    const completedCount = this.rooms.filter((r) => r.completed).length;
    const total = this.rooms.length;
    return {
      percentage: Math.round((completedCount / total) * 100),
      completedRooms: completedCount,
      totalRooms: total,
    };
  }

  getGameProgress() {
    return this.calculateProgress();
  }

  resetGame() {
    this.rooms.forEach((room) => {
      room.completed = false;
    });
    return {
      success: true,
      message: 'Jogo resetado com sucesso',
      progress: this.calculateProgress(),
    };
  }
}
