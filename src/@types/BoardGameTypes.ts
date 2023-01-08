import dayjs from "dayjs";
export interface BoardGameHistory {
  datePicked: dayjs.Dayjs; // unix
  boardGame: string;
  winner: string; // _id
  loser: string; // _id
  comments?: string;
}

export interface OverallGameHistory {
  [date: string]: BoardGameHistory;
}
