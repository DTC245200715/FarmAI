/**
 * FarmPro AI - API Endpoints Integration Test Suite
 * Kiểm thử tích hợp chuỗi API giữa Frontend, Backend và AI Microservice
 */

export interface TestResult {
  endpoint: string;
  method: string;
  description: string;
  passed: boolean;
  statusCode: number;
  expectedStatus: number;
  timeMs: number;
  message?: string;
}

export async function runApiIntegrationTests(baseUrl = 'http://localhost:3000'): Promise<{
  total: number;
  passed: number;
  failed: number;
  results: TestResult[];
}> {
  const results: TestResult[] = [];

  const testCases = [
    {
      method: 'GET',
      path: '/api/health',
      expectedStatus: 200,
      description: 'Kiểm tra trạng thái sức khỏe dịch vụ hệ thống (System Health Check)',
    },
    {
      method: 'GET',
      path: '/api/db/status',
      expectedStatus: 200,
      description: 'Kiểm tra trạng thái kết nối Cơ sở dữ liệu (MySQL / Simulation)',
    },
    {
      method: 'GET',
      path: '/api/animals',
      expectedStatus: 200,
      description: 'Lấy danh sách đàn vật nuôi toàn trại',
    },
    {
      method: 'POST',
      path: '/api/animals',
      body: { tagId: '', name: '', weightKg: -10 },
      headers: { 'x-user-role': 'Chủ trang trại' },
      expectedStatus: 400,
      description: 'Validate chặn đầu vào không hợp lệ khi tạo vật nuôi (cân nặng âm, tên rỗng)',
    },
    {
      method: 'DELETE',
      path: '/api/animals/an-1',
      headers: { 'x-user-role': 'Nhân viên' },
      expectedStatus: 403,
      description: 'Rào chắn RBAC: Chặn nhân viên chuồng trại xóa dữ liệu vật nuôi (403 Forbidden)',
    },
    {
      method: 'PUT',
      path: '/api/animals/an-5/sell',
      headers: { 'x-user-role': 'Chủ trang trại' },
      body: { salePriceVnd: 7500000, buyer: 'HTX' },
      expectedStatus: 400,
      description: 'Rào chắn An toàn sinh học VietGAHP: Chặn xuất bán cá thể đang điều trị bệnh (an-5)',
    },
    {
      method: 'POST',
      path: '/api/ai/herd-summary',
      body: { animals: [] },
      expectedStatus: 200,
      description: 'Tóm tắt tình trạng sức khỏe đàn và khuyến nghị sinh học bằng AI',
    },
    {
      method: 'POST',
      path: '/api/ai/growth-report',
      body: { species: 'Heo', initialWeightKg: 20, currentWeightKg: 95, daysOnFeed: 90, totalFeedKg: 190 },
      expectedStatus: 200,
      description: 'Tính toán chỉ số ADG và hiệu quả chuyển hóa thức ăn FCR',
    },
    {
      method: 'GET',
      path: '/api/ai/prompt-comparison',
      expectedStatus: 200,
      description: 'Truy vấn bảng đối chiếu hiệu năng Prompt v1 vs v2 vs v3 (A/B Benchmark)',
    },
  ];

  for (const tc of testCases) {
    const t0 = Date.now();
    try {
      const res = await fetch(`${baseUrl}${tc.path}`, {
        method: tc.method,
        headers: {
          'Content-Type': 'application/json',
          ...(tc.headers || {}),
        },
        body: tc.body ? JSON.stringify(tc.body) : undefined,
        signal: AbortSignal.timeout(5000),
      });

      const timeMs = Date.now() - t0;
      const passed = res.status === tc.expectedStatus;

      results.push({
        endpoint: tc.path,
        method: tc.method,
        description: tc.description,
        passed,
        statusCode: res.status,
        expectedStatus: tc.expectedStatus,
        timeMs,
      });
    } catch (err: any) {
      results.push({
        endpoint: tc.path,
        method: tc.method,
        description: tc.description,
        passed: false,
        statusCode: 0,
        expectedStatus: tc.expectedStatus,
        timeMs: Date.now() - t0,
        message: err.message,
      });
    }
  }

  const passedCount = results.filter((r) => r.passed).length;
  return {
    total: results.length,
    passed: passedCount,
    failed: results.length - passedCount,
    results,
  };
}
