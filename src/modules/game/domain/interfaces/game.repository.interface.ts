export interface IGameRepository {
  findRoomById(roomId: number): Promise<any>;
  updateRoomCompleted(roomId: number, completed: boolean): Promise<any>;
  countRooms(): Promise<number>;
  countCompletedRooms(): Promise<number>;
  resetAllRooms(): Promise<any>;
}
