export interface BaseResponse<T> {
  error: string | null;
  result: T;
}
