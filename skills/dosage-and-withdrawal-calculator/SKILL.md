---
name: dosage-and-withdrawal-calculator
description: Kỹ năng chuyên biệt giúp AI tính toán chính xác liều lượng thuốc tiêm/uống theo mg/kg thể trọng thực tế và kiểm soát thời gian ngừng thuốc (Withdrawal period) theo tiêu chuẩn an toàn thực phẩm VietGAHP.
version: 1.0.0
author: FarmPro AI Team
---

# KỸ NĂNG: TÍNH LIỀU LƯỢNG & KIỂM SOÁT THỜI GIAN NGỪNG THUỐC (DOSAGE & WITHDRAWAL CALCULATOR)

## 1. Định nghĩa & Mục đích
Kỹ năng chuyên biệt này bảo đảm AI không tự ý phỏng đoán liều lượng, mà sử dụng công thức dược lý thú y chuẩn xác:
- Tính thể tích thuốc thực tế cần dùng ($ml$) dựa trên thể trọng con vật ($kg$).
- Giới hạn thể tích tối đa cho một vị trí tiêm bắp để tránh áp-xe cơ.
- Xác định số ngày tối thiểu phải cách ly trước khi xuất bán thịt/sữa để loại bỏ hoàn toàn tồn dư kháng sinh.

## 2. Công thức Dược lý Thú y Áp dụng
$$\text{Liều tiêm (ml)} = \frac{\text{Thể trọng (kg)} \times \text{Liều chỉ định (mg/kg)}}{\text{Nồng độ hoạt chất (mg/ml)}}$$

*Ví dụ:*
- Vật nuôi: Heo thịt thể trọng $60\text{ kg}$.
- Thuốc: Dung dịch tiêm Florfenicol $10\%$ ($100\text{ mg/ml}$).
- Liều chỉ định: $10\text{ mg/kg}$ thể trọng.
- Kết quả: $\text{Liều dùng} = \frac{60 \times 10}{100} = 6.0\text{ ml/ngày}$.

## 3. Rào chắn An toàn Sinh học (VietGAHP Guardrails)
1. **Chặn liều âm và cận biên:**
   - Thể trọng $\le 0\text{ kg}$: Báo lỗi ngoại lệ lập tức.
   - Thể tích cho một mũi tiêm bắp: Cắt trần tối đa $20\text{ ml/vị trí}$. Nếu vượt quá, bắt buộc chia đôi liều tiêm sang hai bên bắp thịt đối xứng.
2. **Kiểm soát xuất bán:**
   - Nếu cá thể đang trong thời gian ngừng thuốc (ví dụ: Florfenicol $14\text{ ngày}$), hệ thống tự động khóa tính năng xuất bán, bảo đảm an toàn thực phẩm người tiêu dùng.
