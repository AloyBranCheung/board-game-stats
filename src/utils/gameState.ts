/* eslint-disable no-console */
import { PlayerColumnObj } from "src/@types/playerColumns";

class GameState {
  private gameState: PlayerColumnObj[];
  private gameStateHash: { [socketId: string]: PlayerColumnObj };

  constructor() {
    this.gameState = [];
    this.gameStateHash = {};
  }

  public addScorecard = (scorecard: PlayerColumnObj) => {
    if (scorecard.socketId in this.gameStateHash) return;
    if (this.gameState.length < 5) {
      this.gameState.push(scorecard);
      this.gameStateHash[scorecard.socketId] = scorecard;
    }
  };

  public deleteScorecard = (socketId: string) => {
    this.gameState = this.gameState.filter(
      (columnObj) => columnObj.socketId !== socketId
    );
    delete this.gameStateHash[socketId];
  };

  public updateScorecard = (scorecard: PlayerColumnObj) => {
    this.deleteScorecard(scorecard.socketId);
    this.gameState.push(scorecard);
    this.gameStateHash[scorecard.socketId] = scorecard;
  };

  public resetState = () => {
    this.gameState = [];
    this.gameStateHash = {};
  };

  public currState = () => {
    const gameState = this.gameState;
    const gameStateHash = this.gameStateHash;
    return { gameState, gameStateHash };
  };
}

export default GameState;
