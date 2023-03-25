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

  public deleteScorecard = ({
    socketId,
    index,
  }: {
    socketId: string;
    index: number;
  }) => {
    const preItem = this.gameState.slice(0, index);
    const postItem = this.gameState.slice(index + 1);
    this.gameState = preItem.concat(postItem);
    delete this.gameStateHash[socketId];
  };

  public updateScorecard = (scorecard: PlayerColumnObj) => {
    const index = this.gameState.findIndex(
      (obj) => obj.socketId === scorecard.socketId
    );

    this.gameState[index] = scorecard;
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
