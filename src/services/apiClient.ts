/**
 * FarmPro AI - Centralized HTTP API Client
 * Tự động gắn Token / Role, xử lý Base URL, bắt lỗi 401/403 tập trung
 */

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  params?: Record<string, string | number | boolean>;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || '';
  }

  /**
   * Lấy token xác thực hoặc vai trò hiện tại từ LocalStorage
   */
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    try {
      // 1. Kiểm tra JWT token
      const token = localStorage.getItem('farmpro_jwt_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // 2. Kiểm tra Role người dùng hiện tại (phục vụ RBAC header fallback)
      const userStr = localStorage.getItem('farmpro_current_user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user && user.role) {
          headers['x-user-role'] = encodeURIComponent(user.role);
        }
      }
    } catch {
      // Bỏ qua lỗi parsing localStorage nếu môi trường không hỗ trợ
    }

    return headers;
  }

  /**
   * Thực thi HTTP Request với cơ chế timeout và xử lý lỗi tập trung
   */
  async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { timeoutMs = 15000, params, ...customOptions } = options;

    let url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          searchParams.append(key, String(val));
        }
      });
      const queryStr = searchParams.toString();
      if (queryStr) {
        url += (url.includes('?') ? '&' : '?') + queryStr;
      }
    }

    const defaultHeaders = this.getAuthHeaders();
    const config: RequestInit = {
      ...customOptions,
      headers: {
        ...defaultHeaders,
        ...(customOptions.headers as Record<string, string>),
      },
      signal: options.signal || AbortSignal.timeout(timeoutMs),
    };

    let response: Response;
    try {
      response = await fetch(url, config);
    } catch (err: any) {
      if (err.name === 'TimeoutError' || err.name === 'AbortError') {
        throw new ApiError('Yêu cầu hết thời gian chờ (Request Timeout). Vui lòng thử lại!', 408);
      }
      throw new ApiError(err.message || 'Lỗi kết nối mạng đến máy chủ', 0);
    }

    // Xử lý mã lỗi 401 Unauthorized - Hết phiên đăng nhập
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('farmpro-auth-required'));
      }
      throw new ApiError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!', 401);
    }

    // Xử lý mã lỗi 403 Forbidden - Không có quyền
    if (response.status === 403) {
      throw new ApiError('CẢNH BÁO RBAC: Bạn không có đủ thẩm quyền để thực hiện thao tác này!', 403);
    }

    // Đọc JSON hoặc Text an toàn
    let data: any = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch {
        data = null;
      }
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMessage =
        (data && (data.error || data.message)) ||
        `Lỗi máy chủ với mã phản hồi HTTP ${response.status}`;
      throw new ApiError(errorMessage, response.status, data);
    }

    return data as T;
  }

  get<T = any>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T = any>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

