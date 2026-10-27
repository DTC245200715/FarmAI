/**
 * Unit Test: Công Thức Tính Liều Thuốc Thú Y Theo Thể Trọng
 * Đáp ứng tiêu chí kiểm thử đơn vị của SDLC AI Factory
 */

function calculateDosage(weightKg: number, rateMlPerKg: number): number {
  if (weightKg <= 0) {
    throw new Error('Thể trọng vật nuôi phải lớn hơn 0 kg');
  }
  const dosage = weightKg * rateMlPerKg;
  return Math.min(dosage, 20.0); // Ngưỡng an toàn trần
}

export function runDosageUnitTests(): { total: number; passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  // Test 1: Happy path - Heo 90kg, liều 1ml/20kg (0.05 ml/kg) -> 4.5ml
  try {
    const res = calculateDosage(90, 0.05);
    if (Math.abs(res - 4.5) < 0.001) passed++;
    else failed++;
  } catch {
    failed++;
  }

  // Test 2: Boundary test - Bò 850kg, liều 1ml/20kg -> 42.5ml -> phải cắt ở trần 20.0ml
  try {
    const res = calculateDosage(850, 0.05);
    if (res === 20.0) passed++;
    else failed++;
  } catch {
    failed++;
  }

  // Test 3: Negative test - Trọng lượng âm -> Phải ném ngoại lệ
  try {
    calculateDosage(-10, 0.05);
    failed++;
  } catch {
    passed++;
  }

  return { total: 3, passed, failed };
}

