import { ScoreFields, SingleScorecard, GameRounds } from "src/@types/gameState";
import { v4 } from "uuid";

export const playerColumnState = (): ScoreFields => ({
  _id: v4(),
  birds: 0,
  bonusCards: 0,
  endOfRoundGoals: 0,
  eggs: 0,
  foodOnCards: 0,
  tuckedCards: 0,
});

class Scorecard implements SingleScorecard {
  socketId: string;
  username: string;
  rounds: GameRounds;

  constructor(socketId: string, username: string) {
    this.socketId = socketId;
    this.username = username;
    this.rounds = {};
    new Array(4)
      .fill(0)
      .map(() => playerColumnState())
      .forEach((columnObj, index) => {
        this.rounds[index] = columnObj;
      });
  }
}

export default Scorecard;
