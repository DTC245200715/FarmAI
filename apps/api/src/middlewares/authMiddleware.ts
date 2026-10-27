/**
 * Role-Based Access Control (RBAC) Middleware
 * Kiểm tra quyền hạn và trả về HTTP 403 Forbidden khi người dùng gọi API trái quyền
 */
import { Request, Response, NextFunction } from 'express';

export type UserRole = 'Chủ trang trại' | 'Bác sĩ thú y' | 'Kỹ sư chăn nuôi' | 'Nhân viên';

// Extend Express Request interface to hold authenticated user info
declare global {
  namespace Express {
    interface Request {
      userRole?: UserRole;
      userEmail?: string;
    }
  }
}

/**
 * Middleware trích xuất và xác thực vai trò người dùng từ Header
 * Header hỗ trợ: 'x-user-role' và 'x-user-email' (hoặc Bearer token trong production)
 */
export function authenticateRole(req: Request, _res: Response, next: NextFunction) {
  const roleHeader = (req.headers['x-user-role'] as string) || '';
  const emailHeader = (req.headers['x-user-email'] as string) || '';

  // Default fallback nếu không truyền header là 'Chủ trang trại' cho demo mượt mà
  // Nhưng nếu client chủ động gửi role 'Nhân viên' hoặc 'Kỹ sư chăn nuôi', middleware sẽ áp dụng nghiêm ngặt
  req.userRole = (roleHeader as UserRole) || 'Chủ trang trại';
  req.userEmail = emailHeader || 'owner@farmpro.vn';

  next();
}

/**
 * Guard kiểm tra danh sách các vai trò được phép truy cập
 * Nếu vai trò hiện tại không nằm trong danh sách cho phép -> Trả về HTTP 403 Forbidden
 */
export function requireRoles(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const currentRole = req.userRole || 'Chủ trang trại';

    if (!allowedRoles.includes(currentRole)) {
      return res.status(403).json({
        success: false,
        errorCode: 'ERR_FORBIDDEN_ROLE',
        error: `Truy cập bị từ chối (HTTP 403 Forbidden): Vai trò '${currentRole}' không có quyền thực hiện thao tác này.`,
        requiredRoles: allowedRoles,
        currentRole: currentRole,
        timestamp: new Date().toISOString(),
      });
    }

    next();
  };
}
