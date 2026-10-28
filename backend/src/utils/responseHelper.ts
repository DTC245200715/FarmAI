/**
 * Unified API Response Helper
 * Chuẩn hóa định dạng phản hồi toàn diện cho toàn bộ backend Express
 */
import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | null;
  timestamp: string;
  [key: string]: any;
}

export function sendSuccess<T = any>(
  res: Response,
  data?: T,
  message = 'Thao tác thành công',
  statusCode = 200,
  extra: Record<string, any> = {}
): Response {
  const payload: ApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
    ...extra,
  };
  return res.status(statusCode).json(payload);
}

export function sendError(
  res: Response,
  message = 'Đã có lỗi xảy ra',
  statusCode = 400,
  errorDetail?: string | null,
  extra: Record<string, any> = {}
): Response {
  const errText = errorDetail || message;
  const payload: ApiResponse = {
    success: false,
    message,
    error: errText,
    timestamp: new Date().toISOString(),
    ...extra,
  };
  return res.status(statusCode).json(payload);
}
