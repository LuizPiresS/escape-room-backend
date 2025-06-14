export interface IGameService {
  getRoom(roomId: number): Promise<{
    id: number;
    name: string;
    description: string;
    challenge: {
      type: string;
      question: string;
    };
    completed: boolean;
  }>;

  checkAnswer(
    roomId: number,
    answer: string,
  ): Promise<{
    success: boolean;
    message: string;
    currentProgress?: {
      percentage: number;
      completedRooms: number;
      totalRooms: number;
    };
  }>;

  getGameProgress(): Promise<{
    percentage: number;
    completedRooms: number;
    totalRooms: number;
  }>;

  resetGame(): Promise<{
    success: boolean;
    message: string;
    progress: {
      percentage: number;
      completedRooms: number;
      totalRooms: number;
    };
  }>;
}
