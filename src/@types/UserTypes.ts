export interface CreateUserObj {
  [key: string]: {
    name: string;
  };
}

export interface BoardGameTracking {
  wins: number;
  losses: number;
}

export interface User {
  [key: string]: string | number | BoardGameTracking;
}

export type UserList = User[];
