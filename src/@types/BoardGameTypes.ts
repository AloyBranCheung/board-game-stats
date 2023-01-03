export interface BoardGameHistory {
  date: string; // unix
  boardGame: string;
  winners: string[]; // _id
  losers: string[]; // _id
  comments: string;
}

export interface OverallGameHistory {
  [date: string]: BoardGameHistory;
}
