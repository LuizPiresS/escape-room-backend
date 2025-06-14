export interface IGameService {
  getRoom(roomId: number): {
    id: number;
    name: string;
    description: string;
    challenge: {
      type: string;
      question: string;
    };
    completed: boolean;
  };

  checkAnswer(
    roomId: number,
    answer: string,
  ): {
    success: boolean;
    message: string;
    currentProgress?: {
      percentage: number;
      completedRooms: number;
      totalRooms: number;
    };
  };

  getGameProgress(): {
    percentage: number;
    completedRooms: number;
    totalRooms: number;
  };

  resetGame(): {
    success: boolean;
    message: string;
    progress: {
      percentage: number;
      completedRooms: number;
      totalRooms: number;
    };
  };
}
