-- ========================================================
-- FarmPro AI - MySQL Database Schema & Initial Seed Data
-- Khớp 100% với ERD và Phân Tích Nghiệp Vụ Chuẩn VietGAHP
-- ========================================================

CREATE DATABASE IF NOT EXISTS `farmpro_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `farmpro_db`;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Bảng Người Dùng & Phân Quyền Vai Trò (RBAC)
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `role` ENUM('Chủ trang trại', 'Bác sĩ thú y', 'Kỹ sư chăn nuôi', 'Nhân viên') NOT NULL DEFAULT 'Kỹ sư chăn nuôi',
  `farm_name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(20),
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `role`, `farm_name`, `phone`) VALUES
('usr-01', 'owner@farmpro.vn', '$2b$10$demoOwnerPasswordHash1234567890', 'Nguyễn Văn Chủ', 'Chủ trang trại', 'Trang Trại Bò Sữa & Heo Thịt Hòa Phát', '0912 345 678'),
('usr-02', 'vet@farmpro.vn', '$2b$10$demoVetPasswordHash1234567890', 'BS. Nguyễn Mai Lan', 'Bác sĩ thú y', 'Trang Trại Bò Sữa & Heo Thịt Hòa Phát', '0988 765 432'),
('usr-03', 'technician@farmpro.vn', '$2b$10$demoTechPasswordHash1234567890', 'KS. Trần Văn Hùng', 'Kỹ sư chăn nuôi', 'Trang Trại Bò Sữa & Heo Thịt Hòa Phát', '0977 112 233');

-- 2. Bảng Danh Mục Sản Phẩm & Thuốc Thú Y (Dành cho Multi-Agent System TC01-TC10)
DROP TABLE IF EXISTS `farm_products`;
CREATE TABLE `farm_products` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `brand` VARCHAR(100) NOT NULL,
  `category` ENUM('Thuốc & Vắc xin', 'Thức ăn & Dinh dưỡng', 'Thực phẩm bổ sung', 'Vật tư & Sát trùng') NOT NULL,
  `target_species` JSON NOT NULL,
  `price_vnd` INT UNSIGNED NOT NULL,
  `unit` VARCHAR(50) NOT NULL,
  `active_ingredients` TEXT NOT NULL,
  `indications` TEXT NOT NULL,
  `dosage` TEXT NOT NULL,
  `withdrawal_days` INT UNSIGNED DEFAULT 0,
  `in_stock` INT UNSIGNED NOT NULL DEFAULT 0,
  `keywords` JSON NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_brand` (`brand`),
  INDEX `idx_category` (`category`),
  INDEX `idx_price` (`price_vnd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `farm_products` (`id`, `name`, `brand`, `category`, `target_species`, `price_vnd`, `unit`, `active_ingredients`, `indications`, `dosage`, `withdrawal_days`, `in_stock`, `keywords`) VALUES
('prod-01', 'Kháng sinh Amox-Colis Đặc Trị Hô Hấp & Tiêu Hóa', 'Marphavet', 'Thuốc & Vắc xin', '["Heo", "Bò", "Gà", "Vịt", "Dê"]', 145000, 'Chai 100ml', 'Amoxicillin Trihydrate 15%, Colistin Sulfate 25M UI', 'Đặc trị sốt phát ban, viêm phổi cấp, thở giật bụng, viêm ruột tiêu chảy.', 'Tiêm bắp 1ml / 10 - 12kg thể trọng, ngày 1 lần liên tục 3-5 ngày.', 14, 25, '["sốt đỏ", "viêm phổi", "thở dốc", "tiêu chảy"]'),
('prod-02', 'Kháng sinh Flo-Doxy Max Tác Dụng Kéo Dài 48H', 'Marphavet', 'Thuốc & Vắc xin', '["Heo", "Bò", "Dê"]', 185000, 'Chai 100ml', 'Florfenicol 30%, Doxycycline Hyclate 10%', 'Đặc trị viêm phổi dính sườn (APP), suyễn heo do Mycoplasma, tai xanh ghép sốt đỏ.', 'Tiêm bắp sâu 1ml / 20kg thể trọng, một mũi tác dụng 48 giờ.', 28, 18, '["viêm phổi dính sườn", "app", "suyễn heo", "tai xanh"]'),
('prod-03', 'Vắc xin Lở Mồm Long Móng Aftovaxpur 3 Type (O, A, Asia1)', 'Virbac', 'Thuốc & Vắc xin', '["Bò", "Heo", "Dê", "Cừu"]', 850000, 'Lọ 50 liều', 'Kháng nguyên vô hoạt FMD Type O, A, Asia1', 'Tạo miễn dịch chủ động phòng bệnh LMLM ở gia súc guốc chẵn.', 'Tiêm bắp: Bò 2ml/con, Heo 1ml/con. Tiêm nhắc định kỳ 6 tháng.', 0, 10, '["lở mồm long móng", "lmlm", "vắc xin", "virbac"]'),
('prod-04', 'Dung Dịch Hạ Sốt & Kháng Viêm Anagin-C Hạ Nhiệt Cấp', 'Bio-Pharmachemie', 'Thuốc & Vắc xin', '["Bò", "Heo", "Dê"]', 68000, 'Chai 100ml', 'Analgin 20%, Vitamin C 5%', 'Hạ sốt nhanh trong các bệnh truyền nhiễm cấp tính, tiêu viêm, trợ lực.', 'Tiêm bắp 1ml / 10 - 15kg thể trọng, lặp lại sau 8 - 12 giờ.', 7, 40, '["hạ sốt", "sốt cao", "giảm đau", "anagin"]'),
('prod-05', 'Cám Hỗn Hợp Vỗ Béo Bò Thịt Cao Cấp Beef Master CP 992', 'CP Việt Nam', 'Thức ăn & Dinh dưỡng', '["Bò", "Dê"]', 380000, 'Bao 40kg', 'Đạm thô 16%, Xơ thô max 12%, Năng lượng ME 2800 kcal/kg', 'Cung cấp năng lượng đạm tối ưu cho bò thịt giai đoạn vỗ béo tăng trọng nhanh.', 'Cho ăn 3 - 5 kg/con/ngày kết hợp cỏ voi ủ chua.', 0, 50, '["vỗ béo", "tăng trọng", "cám bò", "cp việt nam"]');

-- 3. Bảng Quản Lý Chuồng Trại
DROP TABLE IF EXISTS `barns`;
CREATE TABLE `barns` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `species` VARCHAR(50) NOT NULL,
  `capacity` INT UNSIGNED NOT NULL,
  `current_count` INT UNSIGNED NOT NULL,
  `temperature` DECIMAL(4,1) NOT NULL,
  `humidity` DECIMAL(4,1) NOT NULL,
  `ventilation` ENUM('Bật', 'Tắt') NOT NULL DEFAULT 'Bật',
  `cleanliness` ENUM('Tốt', 'Khá', 'Cần dọn') NOT NULL DEFAULT 'Tốt',
  `last_sanitized` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `barns` (`id`, `name`, `species`, `capacity`, `current_count`, `temperature`, `humidity`, `ventilation`, `cleanliness`, `last_sanitized`) VALUES
('barn-1', 'Chuồng Bò Sữa Cao Sản A1', 'Bò', 60, 48, 25.5, 68.0, 'Bật', 'Tốt', '2026-10-25'),
('barn-2', 'Chuồng Bò Thịt Vỗ Béo A2', 'Bò', 80, 72, 27.2, 70.0, 'Bật', 'Tốt', '2026-10-24'),
('barn-3', 'Chuồng Heo Nái Sinh Sản B1', 'Heo', 50, 42, 26.0, 65.0, 'Bật', 'Tốt', '2026-10-26'),
('barn-4', 'Chuồng Heo Thịt Thương Phẩm B2', 'Heo', 120, 110, 28.5, 75.0, 'Bật', 'Khá', '2026-10-23'),
('barn-iso', 'Khu Cách Ly Y Tế Khẩn Cấp C1', 'Heo', 20, 3, 24.8, 60.0, 'Bật', 'Tốt', '2026-10-27');

-- 4. Bảng Quản Lý Vật Nuôi (Đàn Cá Thể)
DROP TABLE IF EXISTS `animals`;
CREATE TABLE `animals` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `tag_id` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `species` VARCHAR(50) NOT NULL,
  `breed` VARCHAR(100) NOT NULL,
  `gender` ENUM('Đực', 'Cái') NOT NULL,
  `birth_date` DATE NOT NULL,
  `weight_kg` DECIMAL(6,2) NOT NULL,
  `barn_id` VARCHAR(50) NOT NULL,
  `status` ENUM('healthy', 'monitoring', 'sick', 'isolated', 'pregnant') NOT NULL DEFAULT 'healthy',
  `sales_status` ENUM('active', 'sold') NOT NULL DEFAULT 'active',
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`barn_id`) REFERENCES `barns`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `animals` (`id`, `tag_id`, `name`, `species`, `breed`, `gender`, `birth_date`, `weight_kg`, `barn_id`, `status`, `sales_status`, `notes`) VALUES
('an-1', 'BO-0102', 'Bò Sữa Bella (HF)', 'Bò', 'Holstein Friesian thuần', 'Cái', '2024-03-12', 540.00, 'barn-1', 'healthy', 'active', 'Sản lượng 28L sữa/ngày'),
('an-2', 'BO-0105', 'Bò Sữa Daisy', 'Bò', 'Holstein Friesian lai F1', 'Cái', '2024-04-18', 510.00, 'barn-1', 'monitoring', 'active', 'Bầu vú sưng nhẹ sau vắt sữa'),
('an-3', 'BO-0211', 'Bò Đực Giống Angus 01', 'Bò', 'Black Angus', 'Đực', '2023-11-05', 780.00, 'barn-2', 'healthy', 'active', 'Thể lực sung mãn, nguồn tinh giống tốt'),
('an-4', 'HEO-304', 'Heo Nái Yorkshire Hoa Cúc', 'Heo', 'Yorkshire thuần', 'Cái', '2024-01-20', 215.00, 'barn-3', 'pregnant', 'active', 'Dự kiến sinh tuần tới'),
('an-5', 'HEO-419', 'Heo Thịt Đàn B2-19', 'Heo', 'Duroc x Landrace', 'Đực', '2024-05-10', 98.00, 'barn-4', 'sick', 'active', 'Sốt 39.8°C, ho ngắt quãng'),
('an-6', 'HEO-420', 'Heo Thịt Đàn B2-20', 'Heo', 'Duroc x Landrace', 'Đực', '2024-05-10', 95.00, 'barn-iso', 'isolated', 'active', 'Thở giật bụng, cách ly y tế');

-- 5. Bảng Lịch Sử Cân Nặng Định Kỳ (Theo Dõi Tăng Trưởng ADG)
DROP TABLE IF EXISTS `weight_records`;
CREATE TABLE `weight_records` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `animal_id` VARCHAR(50) NOT NULL,
  `recorded_date` DATE NOT NULL,
  `weight_kg` DECIMAL(6,2) NOT NULL,
  `adg_g_per_day` INT, -- Tăng trọng bình quân ngày (gam/ngày)
  `notes` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`animal_id`) REFERENCES `animals`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `weight_records` (`id`, `animal_id`, `recorded_date`, `weight_kg`, `adg_g_per_day`, `notes`) VALUES
('wr-01', 'an-5', '2024-07-10', 45.00, 750, 'Giai đoạn sinh trưởng 1'),
('wr-02', 'an-5', '2024-08-10', 68.00, 766, 'Tăng trưởng đạt chuẩn FCR 2.5'),
('wr-03', 'an-5', '2024-09-10', 90.00, 733, 'Chuẩn bị vỗ béo xuất chuồng'),
('wr-04', 'an-5', '2024-10-10', 98.00, 266, 'CẢNH BÁO: Tăng trọng sụt giảm do ho sốt');

-- 6. Bảng Hồ Sơ Bệnh Án Điện Tử (Health Logs)
DROP TABLE IF EXISTS `health_logs`;
CREATE TABLE `health_logs` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `animal_id` VARCHAR(50) NOT NULL,
  `log_date` DATE NOT NULL,
  `symptoms` TEXT NOT NULL,
  `diagnosis` VARCHAR(255) NOT NULL,
  `treatment` TEXT NOT NULL,
  `veterinarian` VARCHAR(100) NOT NULL,
  `status` ENUM('Đang điều trị', 'Đã khỏi', 'Theo dõi thêm', 'Chuyển cách ly') NOT NULL,
  `withdrawal_until_date` DATE, -- Thời gian ngừng thuốc bắt buộc
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`animal_id`) REFERENCES `animals`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `health_logs` (`id`, `animal_id`, `log_date`, `symptoms`, `diagnosis`, `treatment`, `veterinarian`, `status`, `withdrawal_until_date`) VALUES
('hl-01', 'an-5', '2026-10-24', 'Sốt 39.8°C, bỏ ăn, ho thở dốc', 'Viêm phổi dính sườn (APP) giai đoạn khởi phát', 'Tiêm Anagin-C 10ml + Flo-Doxy Max 5ml', 'BS. Nguyễn Mai Lan', 'Đang điều trị', '2026-11-21'),
('hl-02', 'an-2', '2026-10-25', 'Bầu vú sưng nóng một bên sau vắt sữa', 'Viêm vú lâm sàng cấp', 'Thụt rửa vú, chườm lạnh, tiêm thảo dược kháng viêm', 'BS. Nguyễn Mai Lan', 'Theo dõi thêm', '2026-11-01');

-- 7. Bảng Kho Dược Phẩm & Thức Ăn Trang Trại
DROP TABLE IF EXISTS `inventory_items`;
CREATE TABLE `inventory_items` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `category` ENUM('Thức ăn', 'Thuốc & Vắc xin', 'Thực phẩm bổ sung', 'Vật tư chuồng trại') NOT NULL,
  `quantity` DECIMAL(8,2) NOT NULL,
  `unit` VARCHAR(50) NOT NULL,
  `min_threshold` DECIMAL(8,2) NOT NULL,
  `unit_price` INT UNSIGNED NOT NULL,
  `supplier` VARCHAR(100) NOT NULL,
  `expiry_date` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `inventory_items` (`id`, `name`, `category`, `quantity`, `unit`, `min_threshold`, `unit_price`, `supplier`, `expiry_date`) VALUES
('inv-01', 'Cám Bò Thịt Vỗ Béo CP 992', 'Thức ăn', 85.00, 'Bao 40kg', 20.00, 380000, 'CP Việt Nam', '2027-02-15'),
('inv-02', 'Kháng sinh Flo-Doxy Max', 'Thuốc & Vắc xin', 12.00, 'Chai 100ml', 10.00, 185000, 'Marphavet', '2027-08-20'),
('inv-03', 'Hạ Sốt Anagin-C Bio', 'Thuốc & Vắc xin', 6.00, 'Chai 100ml', 10.00, 68000, 'Bio-Pharmachemie', '2027-06-10'); -- Cảnh báo sắp hết hàng

-- 8. Bảng Lịch Trình Chăm Sóc & Tiêm Phòng (Có Hỗ Trợ Quá Hạn)
DROP TABLE IF EXISTS `care_tasks`;
CREATE TABLE `care_tasks` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` ENUM('Cho ăn & Dinh dưỡng', 'Vắc xin', 'Kiểm tra sức khỏe', 'Vệ sinh chuồng', 'Khác') NOT NULL,
  `due_date` DATE NOT NULL,
  `priority` ENUM('Thấp', 'Trung bình', 'Cao', 'Khẩn cấp') NOT NULL,
  `status` ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',
  `assigned_to` VARCHAR(100) DEFAULT 'Kỹ thuật viên thú y',
  `notes` TEXT,
  `is_ai_generated` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `care_tasks` (`id`, `title`, `category`, `due_date`, `priority`, `status`, `assigned_to`, `notes`, `is_ai_generated`) VALUES
('tsk-01', 'Tiêm Vắc xin Lở Mồm Long Móng Đợt 2 cho Đàn Bò A2', 'Vắc xin', '2026-10-20', 'Khẩn cấp', 'pending', 'BS. Nguyễn Mai Lan', 'CẢNH BÁO: ĐÃ QUÁ HẠN TIÊM 7 NGÀY CẦN XỬ LÝ GẤP', FALSE),
('tsk-02', 'Phun sát trùng định kỳ toàn trại bằng Omnicide Extra', 'Vệ sinh chuồng', '2026-10-28', 'Cao', 'pending', 'KS. Trần Văn Hùng', 'Pha tỷ lệ 1:200 theo quy chuẩn', FALSE),
('tsk-03', 'Đo thân nhiệt và tiêm nhắc mũi 2 cho Heo HEO-419', 'Kiểm tra sức khỏe', '2026-10-27', 'Cao', 'pending', 'BS. Nguyễn Mai Lan', 'Kiểm tra xem đã cắt sốt chưa', TRUE);

-- 9. Bảng Quản Lý Xuất Bán Đàn (Sales / Export)
DROP TABLE IF EXISTS `sales_records`;
CREATE TABLE `sales_records` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `animal_id` VARCHAR(50) NOT NULL,
  `tag_id` VARCHAR(50) NOT NULL,
  `sale_date` DATE NOT NULL,
  `weight_at_sale_kg` DECIMAL(6,2) NOT NULL,
  `price_per_kg_vnd` INT UNSIGNED NOT NULL,
  `total_revenue_vnd` BIGINT UNSIGNED NOT NULL,
  `buyer_name` VARCHAR(150) NOT NULL,
  `biosecurity_cleared` BOOLEAN NOT NULL DEFAULT TRUE, -- Xác nhận đã hết thời gian ngưng thuốc
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sales_records` (`id`, `animal_id`, `tag_id`, `sale_date`, `weight_at_sale_kg`, `price_per_kg_vnd`, `total_revenue_vnd`, `buyer_name`, `biosecurity_cleared`) VALUES
('sl-01', 'an-prev-01', 'HEO-399', '2026-10-15', 112.50, 68000, 7650000, 'Hợp tác xã Chăn nuôi Thái Nguyên', TRUE),
('sl-02', 'an-prev-02', 'BO-0098', '2026-10-18', 620.00, 95000, 58900000, 'Công ty Cổ phần Thực phẩm Sạch', TRUE);

-- 10. Bảng Quản Lý Cảnh Báo Hệ Thống (Alerts)
DROP TABLE IF EXISTS `alerts`;
CREATE TABLE `alerts` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `alert_type` ENUM('QUÁ HẠN TIÊM', 'SỐT DỊCH TỄ', 'CẢNH BÁO KHO CẠN', 'NHIỆT ĐỘ BẤT THƯỜNG') NOT NULL,
  `severity` ENUM('INFO', 'WARNING', 'CRITICAL') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `is_resolved` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `alerts` (`id`, `alert_type`, `severity`, `title`, `message`, `is_resolved`) VALUES
('alt-01', 'QUÁ HẠN TIÊM', 'CRITICAL', 'Lịch tiêm Vắc xin LMLM quá hạn 7 ngày', 'Mũi tiêm cho Đàn Bò A2 quá hạn từ ngày 20/10/2026 chưa thực hiện.', FALSE),
('alt-02', 'SỐT DỊCH TỄ', 'CRITICAL', 'Phát hiện ca bệnh nghi ngờ APP/Tai xanh', 'Cá thể HEO-420 có biểu hiện sốt thở dốc giật bụng, đã chuyển chuồng cách ly C1.', FALSE),
('alt-03', 'CẢNH BÁO KHO CẠN', 'WARNING', 'Thuốc hạ sốt Anagin-C chạm ngưỡng an toàn', 'Tồn kho chỉ còn 6 lọ (ngưỡng an toàn là 10 lọ), cần đặt hàng thêm.', FALSE);

SET FOREIGN_KEY_CHECKS = 1;
