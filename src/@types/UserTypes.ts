export interface CreateUserObj {
  [key: string]: {
    name: string;
    _id: string;
  };
}

export interface BoardGameTracking {
  wins: number;
  losses: number;
}

export interface User {
  [key: string]: string | number | BoardGameTracking | CreateUserObj;
}

export type UserList = User[];
