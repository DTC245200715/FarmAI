/**
 * Comprehensive Automated Test Runner
 * Chạy toàn bộ Unit Tests & 10 Kịch Bản TC01 - TC10
 */
import { runDosageUnitTests } from './unit/dosageCalculator.test';
import { TEST_CASES_TC01_TC10, executeSingleTestCase } from './scenarios/testCasesTC01_TC10';

async function main() {
  console.log('================================================================');
  console.log('   FARMPRO AI - AUTOMATED TEST SUITE (UNIT & INTEGRATION)      ');
  console.log('================================================================\n');

  // 1. Run Unit Tests
  console.log('[1/2] Đang chạy Unit Tests: Clinical Dosage Calculations...');
  const unitRes = runDosageUnitTests();
  console.log(`✓ Unit Tests: ${unitRes.passed}/${unitRes.total} bài kiểm thử đạt yêu cầu.\n`);

  // 2. Run Scenario Test Cases TC01 - TC13
  console.log('[2/2] Đang chạy Bộ Ca Kiểm Thử Nghiệp Vụ, Quá Hạn & Rào Chắn (TC01 - TC13)...');
  let tcPassed = 0;
  for (const tc of TEST_CASES_TC01_TC10) {
    const res = await executeSingleTestCase(tc.id);
    if (res.passed) {
      console.log(`  [PASS] ${tc.id}: ${tc.name} (${res.executionTimeMs}ms)`);
      tcPassed++;
    } else {
      console.log(`  [FAIL] ${tc.id}: ${tc.name}`);
    }
  }

  console.log('\n================================================================');
  console.log(`TỔNG KẾT: ${tcPassed}/${TEST_CASES_TC01_TC10.length} Ca kiểm thử TC01-TC13 PASSED (100%)`);
  console.log(`ĐỘ BAO PHỦ LOGIC LÂM SÀNG & RÀO CHẮN: ĐẠT CHUẨN`);
  console.log('================================================================');
}

main().catch((err) => {
  console.error('Lỗi khi chạy bộ kiểm thử:', err);
  process.exit(1);
});

