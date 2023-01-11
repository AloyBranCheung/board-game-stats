export interface BoardGameHistory {
  datePicked: string; // unix
  boardGame: string;
  winner: string; // _id
  loser: string; // _id
  comments?: string;
}
export interface BoardGameHistoryDb {
  _id: string;
  datePicked: string; // unix
  boardGame: string;
  winner: string; // _id
  loser: string; // _id
  comments?: string;
}

export interface OverallGameHistory {
  [date: string]: BoardGameHistory;
}

export interface BoardGameOption {
  [key: string]: {
    _id: string;
    boardGameName: string;
  };
}
