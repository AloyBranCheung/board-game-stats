/* eslint-disable no-console */
import { AppGameState, SingleScorecard } from "src/@types/gameState";
import Scorecard from "./scorecardObj";

class GameState {
  private appGameState: AppGameState;

  constructor() {
    this.appGameState = {};
  }

  public addScorecard = (scorecard: SingleScorecard) => {
    if (scorecard.socketId in this.appGameState) return;
    if (Object.keys(this.appGameState).length < 5) {
      this.appGameState[scorecard.socketId] = scorecard;
    }
  };

  public deleteScorecard = (socketId: string) => {
    if (socketId in this.appGameState) delete this.appGameState[socketId];
  };

  public updateScorecard = (scorecard: SingleScorecard) => {
    this.appGameState[scorecard.socketId] = scorecard;
  };

  public clearCard = ({
    socketId,
    username,
  }: {
    socketId: string;
    username: string;
  }) => {
    if (socketId in this.appGameState) {
      this.appGameState[socketId] = new Scorecard(socketId, username);
    }
  };

  public resetState = () => {
    this.appGameState = {};
  };

  public currState = () => {
    return this.appGameState;
  };
}

export default GameState;
