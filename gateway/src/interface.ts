export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  error?: { code: string; message: string } | null;
  timestamp: string;
}
