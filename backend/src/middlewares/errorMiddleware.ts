/**
 * Centralized Error & Rate Limit Middleware
 * Bắt và chuẩn hóa toàn bộ lỗi ngoại lệ, bảo vệ hệ thống khỏi crash
 */
import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/responseHelper.ts';
import { SYSTEM_CONFIG } from '../config/constants.ts';

/**
 * Centralized Error Handling Middleware
 */
export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  console.error('[Error Middleware]:', err.stack || err.message || err);
  const status = typeof err.status === 'number' ? err.status : 500;
  const message = err.message || 'Lỗi máy chủ nội bộ (Internal Server Error)';
  return sendError(res, message, status, process.env.NODE_ENV === 'development' ? err.stack : undefined);
}

/**
 * Simple In-Memory Sliding-Window Rate Limiter for AI Endpoints
 */
const ipRequestHistory = new Map<string, number[]>();

export function aiRateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const windowStart = now - SYSTEM_CONFIG.AI_RATE_LIMIT.WINDOW_MS;

  const timestamps = (ipRequestHistory.get(ip) || []).filter((t) => t > windowStart);

  if (timestamps.length >= SYSTEM_CONFIG.AI_RATE_LIMIT.MAX_REQUESTS) {
    sendError(
      res,
      'CẢNH BÁO RATE LIMIT: Bạn đã vượt quá giới hạn 60 yêu cầu AI mỗi phút. Vui lòng thử lại sau giây lát!',
      429
    );
    return;
  }

  timestamps.push(now);
  ipRequestHistory.set(ip, timestamps);
  next();
}
