export interface ApiResponse<T> {
  success: boolean;
  status_code: number;
  message: string;
  data?: T;
  error?: { code: string; message: string } | null;
  timestamp: string;
}
