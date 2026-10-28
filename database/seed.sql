-- ========================================================
-- FarmPro AI - MySQL Database Seed Data
-- Dữ liệu mẫu chuẩn hóa VietGAHP phục vụ khởi tạo môi trường thử nghiệm
-- ========================================================

USE `farmpro_db`;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Seed Users (RBAC)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `role`, `farm_name`, `phone`) VALUES
('usr-01', 'owner@farmpro.vn', '$2b$10$demoOwnerPasswordHash1234567890', 'Nguyễn Văn Chủ', 'Chủ trang trại', 'Trang Trại Bò Sữa & Heo Thịt Hòa Phát', '0912 345 678'),
('usr-02', 'vet@farmpro.vn', '$2b$10$demoVetPasswordHash1234567890', 'BS. Nguyễn Mai Lan', 'Bác sĩ thú y', 'Trang Trại Bò Sữa & Heo Thịt Hòa Phát', '0988 765 432'),
('usr-03', 'technician@farmpro.vn', '$2b$10$demoTechPasswordHash1234567890', 'KS. Trần Văn Hùng', 'Kỹ sư chăn nuôi', 'Trang Trại Bò Sữa & Heo Thịt Hòa Phát', '0977 112 233');

-- 2. Seed Products
DELETE FROM `farm_products`;
INSERT INTO `farm_products` (`id`, `name`, `brand`, `category`, `target_species`, `price_vnd`, `unit`, `active_ingredients`, `indications`, `dosage`, `withdrawal_days`, `in_stock`, `keywords`) VALUES
('prod-01', 'Kháng sinh Amox-Colis Đặc Trị Hô Hấp & Tiêu Hóa', 'Marphavet', 'Thuốc & Vắc xin', '["Heo", "Bò", "Gà", "Vịt", "Dê"]', 145000, 'Chai 100ml', 'Amoxicillin Trihydrate 15%, Colistin Sulfate 25M UI', 'Đặc trị sốt phát ban, viêm phổi cấp, thở giật bụng, viêm ruột tiêu chảy.', 'Tiêm bắp 1ml / 10 - 12kg thể trọng, ngày 1 lần liên tục 3-5 ngày.', 14, 25, '["sốt đỏ", "viêm phổi", "thở dốc", "tiêu chảy"]'),
('prod-02', 'Kháng sinh Flo-Doxy Max Tác Dụng Kéo Dài 48H', 'Marphavet', 'Thuốc & Vắc xin', '["Heo", "Bò", "Dê"]', 185000, 'Chai 100ml', 'Florfenicol 30%, Doxycycline Hyclate 10%', 'Đặc trị viêm phổi dính sườn (APP), suyễn heo do Mycoplasma, tai xanh ghép sốt đỏ.', 'Tiêm bắp sâu 1ml / 20kg thể trọng, một mũi tác dụng 48 giờ.', 28, 18, '["viêm phổi dính sườn", "app", "suyễn heo", "tai xanh"]'),
('prod-03', 'Vắc xin Lở Mồm Long Móng Aftovaxpur 3 Type (O, A, Asia1)', 'Virbac', 'Thuốc & Vắc xin', '["Bò", "Heo", "Dê", "Cừu"]', 850000, 'Lọ 50 liều', 'Kháng nguyên vô hoạt FMD Type O, A, Asia1', 'Tạo miễn dịch chủ động phòng bệnh LMLM ở gia súc guốc chẵn.', 'Tiêm bắp: Bò 2ml/con, Heo 1ml/con. Tiêm nhắc định kỳ 6 tháng.', 0, 10, '["lở mồm long móng", "lmlm", "vắc xin", "virbac"]'),
('prod-04', 'Dung Dịch Hạ Sốt & Kháng Viêm Anagin-C Hạ Nhiệt Cấp', 'Bio-Pharmachemie', 'Thuốc & Vắc xin', '["Bò", "Heo", "Dê"]', 68000, 'Chai 100ml', 'Analgin 20%, Vitamin C 5%', 'Hạ sốt nhanh trong các bệnh truyền nhiễm cấp tính, tiêu viêm, trợ lực.', 'Tiêm bắp 1ml / 10 - 15kg thể trọng, lặp lại sau 8 - 12 giờ.', 7, 40, '["hạ sốt", "sốt cao", "giảm đau", "anagin"]'),
('prod-05', 'Cám Hỗn Hợp Vỗ Béo Bò Thịt Cao Cấp Beef Master CP 992', 'CP Việt Nam', 'Thức ăn & Dinh dưỡng', '["Bò", "Dê"]', 380000, 'Bao 40kg', 'Đạm thô 16%, Xơ thô max 12%, Năng lượng ME 2800 kcal/kg', 'Cung cấp năng lượng đạm tối ưu cho bò thịt giai đoạn vỗ béo tăng trọng nhanh.', 'Cho ăn 3 - 5 kg/con/ngày kết hợp cỏ voi ủ chua.', 0, 50, '["vỗ béo", "tăng trọng", "cám bò", "cp việt nam"]');

-- 3. Seed Barns
DELETE FROM `barns`;
INSERT INTO `barns` (`id`, `name`, `species`, `capacity`, `current_count`, `temperature`, `humidity`, `ventilation`, `cleanliness`, `last_sanitized`) VALUES
('barn-1', 'Chuồng Bò Sữa Cao Sản A1', 'Bò', 60, 48, 25.5, 68.0, 'Bật', 'Tốt', '2026-10-25'),
('barn-2', 'Chuồng Bò Thịt Vỗ Béo A2', 'Bò', 80, 72, 27.2, 70.0, 'Bật', 'Tốt', '2026-10-24'),
('barn-3', 'Chuồng Heo Nái Sinh Sản B1', 'Heo', 50, 42, 26.0, 65.0, 'Bật', 'Tốt', '2026-10-26'),
('barn-4', 'Chuồng Heo Thịt Thương Phẩm B2', 'Heo', 120, 110, 28.5, 75.0, 'Bật', 'Khá', '2026-10-23'),
('barn-iso', 'Khu Cách Ly Y Tế Khẩn Cấp C1', 'Heo', 20, 3, 24.8, 60.0, 'Bật', 'Tốt', '2026-10-27');

-- 4. Seed Animals
DELETE FROM `animals`;
INSERT INTO `animals` (`id`, `tag_id`, `name`, `species`, `breed`, `gender`, `birth_date`, `weight_kg`, `barn_id`, `status`, `sales_status`, `notes`) VALUES
('an-1', 'BO-0102', 'Bò Sữa Bella (HF)', 'Bò', 'Holstein Friesian thuần', 'Cái', '2024-03-12', 540.00, 'barn-1', 'healthy', 'active', 'Sản lượng 28L sữa/ngày'),
('an-2', 'BO-0105', 'Bò Sữa Daisy', 'Bò', 'Holstein Friesian lai F1', 'Cái', '2024-04-18', 510.00, 'barn-1', 'monitoring', 'active', 'Bầu vú sưng nhẹ sau vắt sữa'),
('an-3', 'BO-0211', 'Bò Đực Giống Angus 01', 'Bò', 'Black Angus', 'Đực', '2023-11-05', 780.00, 'barn-2', 'healthy', 'active', 'Thể lực sung mãn, nguồn tinh giống tốt'),
('an-4', 'HEO-304', 'Heo Nái Yorkshire Hoa Cúc', 'Heo', 'Yorkshire thuần', 'Cái', '2024-01-20', 215.00, 'barn-3', 'pregnant', 'active', 'Dự kiến sinh tuần tới'),
('an-5', 'HEO-419', 'Heo Thịt Đàn B2-19', 'Heo', 'Duroc x Landrace', 'Đực', '2024-05-10', 98.00, 'barn-4', 'sick', 'active', 'Sốt 39.8°C, ho ngắt quãng'),
('an-6', 'HEO-420', 'Heo Thịt Đàn B2-20', 'Heo', 'Duroc x Landrace', 'Đực', '2024-05-10', 95.00, 'barn-iso', 'isolated', 'active', 'Thở giật bụng, cách ly y tế');

-- 5. Seed Weight Records
DELETE FROM `weight_records`;
INSERT INTO `weight_records` (`id`, `animal_id`, `recorded_date`, `weight_kg`, `adg_g_per_day`, `notes`) VALUES
('wr-01', 'an-5', '2024-07-10', 45.00, 750, 'Giai đoạn sinh trưởng 1'),
('wr-02', 'an-5', '2024-08-10', 68.00, 766, 'Tăng trưởng đạt chuẩn FCR 2.5'),
('wr-03', 'an-5', '2024-09-10', 90.00, 733, 'Chuẩn bị vỗ béo xuất chuồng'),
('wr-04', 'an-5', '2024-10-10', 98.00, 266, 'CẢNH BÁO: Tăng trọng sụt giảm do ho sốt');

-- 6. Seed Health Logs
DELETE FROM `health_logs`;
INSERT INTO `health_logs` (`id`, `animal_id`, `log_date`, `symptoms`, `diagnosis`, `treatment`, `veterinarian`, `status`, `withdrawal_until_date`) VALUES
('hl-01', 'an-5', '2026-10-24', 'Sốt 39.8°C, bỏ ăn, ho thở dốc', 'Viêm phổi dính sườn (APP) giai đoạn khởi phát', 'Tiêm Anagin-C 10ml + Flo-Doxy Max 5ml', 'BS. Nguyễn Mai Lan', 'Đang điều trị', '2026-11-21'),
('hl-02', 'an-2', '2026-10-25', 'Bầu vú sưng nóng một bên sau vắt sữa', 'Viêm vú lâm sàng cấp', 'Thụt rửa vú, chườm lạnh, tiêm thảo dược kháng viêm', 'BS. Nguyễn Mai Lan', 'Theo dõi thêm', '2026-11-01');

-- 7. Seed Inventory Items
DELETE FROM `inventory_items`;
INSERT INTO `inventory_items` (`id`, `name`, `category`, `quantity`, `unit`, `min_threshold`, `unit_price`, `supplier`, `expiry_date`) VALUES
('inv-01', 'Cám Bò Thịt Vỗ Béo CP 992', 'Thức ăn', 85.00, 'Bao 40kg', 20.00, 380000, 'CP Việt Nam', '2027-02-15'),
('inv-02', 'Kháng sinh Flo-Doxy Max', 'Thuốc & Vắc xin', 12.00, 'Chai 100ml', 10.00, 185000, 'Marphavet', '2027-08-20'),
('inv-03', 'Hạ Sốt Anagin-C Bio', 'Thuốc & Vắc xin', 6.00, 'Chai 100ml', 10.00, 68000, 'Bio-Pharmachemie', '2027-06-10');

-- 8. Seed Care Tasks
DELETE FROM `care_tasks`;
INSERT INTO `care_tasks` (`id`, `title`, `category`, `due_date`, `priority`, `status`, `assigned_to`, `notes`, `is_ai_generated`) VALUES
('tsk-01', 'Tiêm Vắc xin Lở Mồm Long Móng Đợt 2 cho Đàn Bò A2', 'Vắc xin', '2026-10-20', 'Khẩn cấp', 'pending', 'BS. Nguyễn Mai Lan', 'CẢNH BÁO: ĐÃ QUÁ HẠN TIÊM 7 NGÀY CẦN XỬ LÝ GẤP', FALSE),
('tsk-02', 'Phun sát trùng định kỳ toàn trại bằng Omnicide Extra', 'Vệ sinh chuồng', '2026-10-28', 'Cao', 'pending', 'KS. Trần Văn Hùng', 'Pha tỷ lệ 1:200 theo quy chuẩn', FALSE),
('tsk-03', 'Đo thân nhiệt và tiêm nhắc mũi 2 cho Heo HEO-419', 'Kiểm tra sức khỏe', '2026-10-27', 'Cao', 'pending', 'BS. Nguyễn Mai Lan', 'Kiểm tra xem đã cắt sốt chưa', TRUE);

-- 9. Seed Sales Records
DELETE FROM `sales_records`;
INSERT INTO `sales_records` (`id`, `animal_id`, `tag_id`, `sale_date`, `weight_at_sale_kg`, `price_per_kg_vnd`, `total_revenue_vnd`, `buyer_name`, `biosecurity_cleared`) VALUES
('sl-01', 'an-prev-01', 'HEO-399', '2026-10-15', 112.50, 68000, 7650000, 'Hợp tác xã Chăn nuôi Thái Nguyên', TRUE),
('sl-02', 'an-prev-02', 'BO-0098', '2026-10-18', 620.00, 95000, 58900000, 'Công ty Cổ phần Thực phẩm Sạch', TRUE);

-- 10. Seed Alerts
DELETE FROM `alerts`;
INSERT INTO `alerts` (`id`, `alert_type`, `severity`, `title`, `message`, `is_resolved`) VALUES
('alt-01', 'QUÁ HẠN TIÊM', 'CRITICAL', 'Lịch tiêm Vắc xin LMLM quá hạn 7 ngày', 'Mũi tiêm cho Đàn Bò A2 quá hạn từ ngày 20/10/2026 chưa thực hiện.', FALSE),
('alt-02', 'SỐT DỊCH TỄ', 'CRITICAL', 'Phát hiện ca bệnh nghi ngờ APP/Tai xanh', 'Cá thể HEO-420 có biểu hiện sốt thở dốc giật bụng, đã chuyển chuồng cách ly C1.', FALSE),
('alt-03', 'CẢNH BÁO KHO CẠN', 'WARNING', 'Thuốc hạ sốt Anagin-C chạm ngưỡng an toàn', 'Tồn kho chỉ còn 6 lọ (ngưỡng an toàn là 10 lọ), cần đặt hàng thêm.', FALSE);

SET FOREIGN_KEY_CHECKS = 1;
