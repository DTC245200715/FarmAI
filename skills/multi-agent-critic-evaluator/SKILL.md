---
name: multi-agent-critic-evaluator
description: Kỹ năng chuyên biệt dành cho Tác tử Phản biện (Critic Agent) trong hệ thống Đa tác tử (Multi-Agent System), giúp chấm điểm chất lượng phác đồ, quét chống chỉ định y khoa và kích hoạt vòng lặp thử lại (Retry Loop) tự động.
version: 1.0.0
author: FarmPro AI Team
---

# KỸ NĂNG: THẨM ĐỊNH PHẢN BIỆN ĐỘC LẬP & TỰ ĐỘNG THỬ LẠI (CRITIC EVALUATOR & RETRY LOOP)

## 1. Định nghĩa & Mục đích
Kỹ năng chuyên biệt này hoạt động như một "Hội đồng kiểm duyệt số":
- Ngăn chặn triệt để tình trạng ảo giác (hallucination) của AI tạo sinh khi kê đơn thuốc.
- Kiểm tra tính tương thích giữa ngân sách của chủ trại và giá bán thực tế của dược phẩm.
- Tự động kích hoạt cơ chế tự phục hồi (Self-healing / Retry Loop tối đa 3 lần) nếu phác đồ chưa đạt chuẩn an toàn.

## 2. Tiêu chí Chấm điểm Phác đồ (Scoring Matrix)
Phác đồ điều trị được thẩm định trên thang điểm 100% dựa trên 4 trọng số:
1. **Đúng chỉ định bệnh lý (40%):** Thuốc được chọn có hoạt chất đặc trị đúng triệu chứng hay không.
2. **An toàn sinh học & Chống chỉ định (30%):** Không dùng thuốc cấm, không dùng thuốc gây sảy thai cho gia súc mang thai.
3. **Phù hợp ngân sách (15%):** Tổng chi phí đơn thuốc không vượt quá ngân sách người nuôi yêu cầu.
4. **Hãng sản xuất chỉ định (15%):** Ưu tiên đúng thương hiệu người nuôi tin dùng (Marphavet, Virbac, Bayer, CP...).

## 3. Quy tắc Kích hoạt Vòng lặp Thử lại (Retry Loop Protocol)
- **Nếu Tổng điểm $\ge 70\%$:** Phê duyệt (APPROVE) -> Chuyển sang Tác tử Phác đồ (Response Agent).
- **Nếu Tổng điểm $< 70\%$:** Từ chối (REJECT) -> Gửi thông điệp phản biện kèm lý do lỗi về cho Tác tử Điều phối (Orchestrator Agent) để yêu cầu Tác tử Tra cứu tìm phương án khác.
- **Giới hạn số lần thử lại:** Tối đa 3 chu kỳ để bảo đảm thời gian phản hồi không vượt quá $30\text{ giây}$.
