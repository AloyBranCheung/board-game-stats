import type { Merge } from "type-fest";

export interface BoardGameTracking {
  wins: number;
  losses: number;
}

export interface BoardGamesTracking {
  [key: string]: BoardGameTracking;
}

export interface UserObj {
  _id: string;
  name: string;
}

export type FullUserObj = Merge<UserObj, BoardGamesTracking>;
export interface CreateUserObj {
  [key: string]: UserObj;
}

export interface User {
  [key: string]: string | number | BoardGameTracking | CreateUserObj;
}

export type UserList = User[];
