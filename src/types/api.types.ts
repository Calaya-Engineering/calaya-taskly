export type ApiResponse<T> = {
  data: T | null;
  error: { code: string; message: string | object } | null;
  meta: { total: number; page: number; limit: number } | null;
};
