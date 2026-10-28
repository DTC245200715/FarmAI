/**
 * FarmPro AI - System & Business Constants
 * Chuẩn hóa các hằng số hệ thống, ngưỡng nghiệp vụ và cấu hình rào chắn
 */

export const SYSTEM_CONFIG = {
  DEFAULT_PORT: 3000,
  DEFAULT_MAS_PORT: 5050,
  DEFAULT_MAS_URL: 'http://localhost:5050',
  CORS_ALLOWED_ORIGINS: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
  ],
  AI_RATE_LIMIT: {
    WINDOW_MS: 60 * 1000, // 1 phút
    MAX_REQUESTS: 60, // Tối đa 60 requests / phút / IP
  },
} as const;

export const USER_ROLES = {
  OWNER: 'Chủ trang trại',
  VET: 'Bác sĩ thú y',
  TECHNICIAN: 'Kỹ sư chăn nuôi',
  WORKER: 'Nhân viên',
} as const;

export const BUSINESS_RULES = {
  ANIMAL: {
    MIN_WEIGHT_KG: 0.1,
    MAX_WEIGHT_KG: 2000,
    VALID_STATUSES: ['healthy', 'monitoring', 'sick', 'isolated', 'pregnant'] as const,
    VALID_SPECIES: ['Bò', 'Heo', 'Gà', 'Vịt', 'Dê', 'Cừu', 'Khác'] as const,
  },
  BARN: {
    MIN_CAPACITY: 1,
    MAX_CAPACITY: 5000,
    MIN_TEMP_C: -10,
    MAX_TEMP_C: 60,
    MIN_HUMIDITY_PERCENT: 0,
    MAX_HUMIDITY_PERCENT: 100,
  },
  INVENTORY: {
    MIN_QUANTITY: 0,
    MIN_PRICE_VND: 0,
    MIN_THRESHOLD: 0,
  },
  SALES: {
    MIN_PRICE_VND: 0,
  },
} as const;

