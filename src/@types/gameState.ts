export interface ScoreFields {
  _id: string;
  birds: number;
  bonusCards: number;
  endOfRoundGoals: number;
  eggs: number;
  foodOnCards: number;
  tuckedCards: number;
}

export interface GameRounds {
  [rounds: number]: ScoreFields;
}

export interface SingleScorecard {
  socketId: string;
  username: string;
  rounds: GameRounds;
}

// Note: should be Object.keys(GameState).length < 5
export interface AppGameState {
  [socketId: string]: SingleScorecard;
}
