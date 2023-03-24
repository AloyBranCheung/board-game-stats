import { PlayerColumnObj } from "src/@types/playerColumns";

class PlayerColumnState implements PlayerColumnObj {
  username: string;
  socketId: string;
  birds: number;
  bonusCards: number;
  endOfRoundGoals: number;
  eggs: number;
  foodOnCards: number;
  tuckedCards: number;
  total: number;

  constructor(username: string, socketId: string) {
    this.username = username;
    this.socketId = socketId;
    this.birds = 0;
    this.bonusCards = 0;
    this.endOfRoundGoals = 0;
    this.eggs = 0;
    this.foodOnCards = 0;
    this.tuckedCards = 0;
    this.total = 0;
  }
}

export default PlayerColumnState;
