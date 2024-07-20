export interface Response<T> {
  success: boolean;
  data: T[];
  totalPages: number;
}

export interface ResponseSingle<T> {
  success: boolean;
  data?: T;
}
