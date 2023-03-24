export interface PlayerColumnObj {
  username: string;
  socketId: string;
  birds: number;
  bonusCards: number;
  endOfRoundGoals: number;
  eggs: number;
  foodOnCards: number;
  tuckedCards: number;
}

export interface PlayerColumnHash {
  [socketId: string]: PlayerColumnObj;
}

export interface GameSync {
  clientId: string; // socketId;
  playerColumns: PlayerColumnObj[];
  playerColumnsHash: PlayerColumnHash;
}
