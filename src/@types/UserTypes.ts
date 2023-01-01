export interface BoardGameTracking {
  wins: number;
  losses: number;
}
export interface UserObj {
  _id: string;
  name: string;
}
export interface CreateUserObj {
  [key: string]: UserObj;
}

export interface User {
  [key: string]: string | number | BoardGameTracking | CreateUserObj;
}

export type UserList = User[];
