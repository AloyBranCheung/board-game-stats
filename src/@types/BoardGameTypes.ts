export interface BoardGameHistory {
  datePicked: string; // unix
  boardGame: string;
  winner: string; // _id
  loser: string; // _id
  comments?: string;
}

export interface OverallGameHistory {
  [date: string]: BoardGameHistory;
}
