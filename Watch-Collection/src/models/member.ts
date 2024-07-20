export interface checkToken {
  id: string | null;
  isAdmin: boolean;
  name: string | null;
  ait?: string | null;
  exp?: string | null;
}

export interface User {
  _id: string;
  memberName: string;
  name: string;
  YOB: number;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
