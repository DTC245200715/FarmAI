/**
 * Integration Test Runner
 * Chạy kiểm thử API HTTP thực tế tới server (cổng 3000)
 */
import { runApiIntegrationTests } from './apiEndpoints.test.ts';

async function main() {
  console.log('================================================================');
  console.log('   FARMPRO AI - HTTP API INTEGRATION TEST RUNNER               ');
  console.log('================================================================\n');

  console.log('Đang kiểm tra kết nối API tới http://localhost:3000...');
  const res = await runApiIntegrationTests('http://localhost:3000');

  for (const r of res.results) {
    if (r.passed) {
      console.log(`  [PASS] [${r.method}] ${r.endpoint.padEnd(28)} -> HTTP ${r.statusCode} (${r.timeMs}ms) | ${r.description}`);
    } else {
      console.log(`  [FAIL] [${r.method}] ${r.endpoint.padEnd(28)} -> Nhận HTTP ${r.statusCode}, Kỳ vọng HTTP ${r.expectedStatus} | ${r.message || r.description}`);
    }
  }

  console.log('\n================================================================');
  console.log(`KẾT QUẢ TÍCH HỢP: ${res.passed}/${res.total} Test Cases Passed (${Math.round((res.passed / res.total) * 100)}%)`);
  console.log('================================================================');

  if (res.failed > 0) {
    console.log('\n[Lưu ý]: Đảm bảo Backend Server đang chạy tại http://localhost:3000 (npm run dev) khi chạy test tích hợp.');
  }
}

main().catch(console.error);
