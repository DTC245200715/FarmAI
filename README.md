# 🌾 DỰ ÁN: HỆ THỐNG QUẢN LÝ CHĂN NUÔI CÓ TÍCH HỢP AI (FARMPRO AI)
> **Tên đề tài/Dự án:** Hệ thống quản lý chăn nuôi có tích hợp AI  
> **Hệ sinh thái:** FarmPro AI & SDLC AI Agent Factory  
> **Học phần:** Ứng Dụng Trí Tuệ Nhân Tạo – Trường ĐH Công Nghệ Thông Tin & Truyền Thông (ICTU) – Đại Học Thái Nguyên  
> **Giảng viên hướng dẫn:** ThS. Nguyễn Đình Dũng | **Lớp:** K23.K1.CNTT K23B  

---

## 🗂️ CẤU TRÚC THƯ MỤC CHUẨN MONOREPO

```
FarmAI-main/
├── apps/
│   ├── web/                      # React 19 + TypeScript + Tailwind (Frontend)
│   └── api/                      # Node.js 20 Express Clean Architecture (Backend Gateway)
│       └── src/ (config/, controllers/, routes/, repositories/, server.ts)
├── services/
│   └── mas/                      # Python Flask Multi-Agent System (Bài 6 & 7)
│       ├── agents/               # 7 Tác tử chuyên môn hóa (Orchestrator, Critic...)
│       ├── models/               # AgentMessage Bus (Pydantic)
│       ├── services/             # MySQL Service & ChromaDB RAG Vector Store
│       ├── tests/                # Test cases Python
│       └── app.py                # Flask entry point (Port 5050)
├── sdlc-factory/                 # SDLC AI Agent Factory (Tiêu chí 2 - 4.0 điểm)
│   ├── context/                  # 4 Tầng Context Engineering (Domain, Architecture, Safety, Tech)
│   ├── stations/                 # 5 Trạm Agent tự động hóa chu trình phần mềm
│   ├── guardrails/               # Rào chắn bảo mật & đạo đức AI
│   └── index.ts                  # Entry point xuất hàm executeSdlcFactoryPipeline
├── database/                     # CSDL quan hệ
│   ├── schema.mysql.sql          # Lược đồ DDL bảng chuẩn 3NF
│   ├── migrations/               # Lịch sử cập nhật CSDL
│   └── seeds/                    # Dữ liệu hạt giống khởi tạo
├── prompts/                      # Quản lý & Thực nghiệm Prompt
│   ├── v1-naive/                 # Prompt thế hệ sơ khởi
│   ├── v2-few-shot/              # Prompt Few-shot gán vai trò
│   ├── v3-cot-guardrails/        # Prompt Chain-of-Thought + JSON Schema
│   ├── benchmark/                # Engine so sánh định lượng A/B Testing
│   └── sdlc/                     # Prompts chuyên dụng cho Requirements Agent
├── tests/                        # Hệ thống kiểm thử tự động
│   ├── unit/                     # Kiểm thử đơn vị tính liều lượng theo cân nặng
│   ├── scenarios/                # Bộ 10 kịch bản kiểm thử toàn diện (TC01 - TC10)
│   └── runAllTests.ts            # Test runner tự động (Pass rate 100%)
├── docs/                         # Tài liệu đồ án hoàn chỉnh
│   ├── bao-cao/                  # Báo cáo kỹ thuật đồ án 6 chương chuẩn ICTU
│   ├── prompt-ab-testing/        # Báo cáo thực nghiệm so sánh Prompt A/B Test
│   ├── kiem-thu/                 # Báo cáo kiểm thử 10 kịch bản TC01-TC10
│   └── huong-dan/                # Hướng dẫn cài đặt MySQL, VSCode, Flask
├── deploy/                       # Cấu hình đóng gói & triển khai
│   ├── docker/                   # Dockerfile cho Web Gateway & Python MAS
│   ├── monitoring/               # Cấu hình giám sát sức khỏe hệ thống
│   └── nginx/                    # Cấu hình cân bằng tải Reverse Proxy
├── scripts/                      # Kịch bản tự động hóa vận hành
│   ├── run_all.bat               # Khởi động 1-click cho Windows
│   └── run_all.sh                # Khởi động cho Linux/macOS
├── docker-compose.yml            # Điều phối 3 container: MySQL + Python MAS + Web App
├── package.json                  # Cấu hình scripts & dependencies
├── tsconfig.json                 # Cấu hình TypeScript strict mode
├── .editorconfig                 # Chuẩn hóa format code đa IDE
├── .env.example                  # Mẫu biến môi trường an toàn (Zero Secret Leak)
└── README.md                     # Tài liệu hướng dẫn chính của dự án
```

---

## 🛠️ CÔNG NGHỆ VÀ DỊCH VỤ SỬ DỤNG (TECH STACK)

| Phân hệ / Tầng | Công nghệ / Ngôn ngữ | Phiên bản | Vai trò & Trách nhiệm trong hệ thống |
| :--- | :--- | :---: | :--- |
| **Frontend (Giao diện)** | React, TypeScript, Vite, TailwindCSS | React 19, TS 5.x, Tailwind v4 | Giao diện SPA trực quan: Quản lý đàn gia súc/gia cầm, Dashboard IoT chuồng trại, Phòng khám thú y AI, Báo cáo tăng trưởng FCR, Trạm điều khiển SDLC Factory. |
| **Backend API Gateway** | Node.js, Express, TSX | Node.js 20 LTS, Express 4.x | Cổng điều phối API RESTful, phân quyền vai trò (RBAC), kiểm duyệt đầu vào (Input Sanitizer), kết nối CSDL và bảo vệ rào chắn an toàn (Guardrails). |
| **Multi-Agent Service** | Python, Flask, Pydantic | Python 3.11+, Flask 3.x | Hệ thống Đa tác tử gồm 7 Agents chuyên môn hóa: Orchestrator, Analyst, Database, RAG, Reasoning, Critic (phản biện), Response (định dạng). |
| **Trí tuệ nhân tạo (AI)** | Google Gemini API, ChromaDB | `@google/genai ^2.4`, ChromaDB | Suy luận lâm sàng thú y, tóm tắt dịch tễ toàn đàn, tính liều lượng theo cân nặng cá thể, Vector Database RAG truy xuất dược điển thú y. |
| **Cơ sở dữ liệu** | MySQL 8.0, In-Memory Fallback | MySQL 8.0 (InnoDB, 3NF) | CSDL quan hệ 10 bảng (users, animals, barns, care_tasks, inventory, health_logs, sales_records...); Có cơ chế Fallback tự phục hồi khi mất kết nối. |
| **Đóng gói & Vận hành** | Docker, Docker Compose | Docker Compose v2 | Containerization toàn diện cụm 3 dịch vụ: `farmpro_mysql` (port 3306), `farmpro_multi_agent` (port 5050), `farmpro_web_app` (port 3000). |
| **Kiểm thử tự động** | TSX Test Runner, Pytest | Unit & Integration | Kiểm thử tự động tính liều thuốc, 13 ca kịch bản nghiệp vụ (TC01–TC13), kiểm thử rào chắn an ninh, bắt lỗi lịch tiêm quá hạn và sụt cân bất thường. |

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

### Cách 1: Khởi động 1-Click bằng Docker Compose (Khuyên dùng)
Yêu cầu: Đã cài đặt [Docker Desktop](https://www.docker.com/products/docker-desktop/).
```bash
# 1. Khởi động toàn bộ cụm dịch vụ (MySQL 8.0 + Python MAS + Node Web App)
docker compose up -d --build

# 2. Truy cập ứng dụng:
# Ứng dụng Web & AI SDLC Factory: http://localhost:3000
# Dịch vụ Python Multi-Agent API:  http://localhost:5050
# Endpoint giám sát sức khỏe:      http://localhost:3000/api/health
```

---

### Cách 2: Khởi động cục bộ trên Windows (Local Dev)
Yêu cầu: Node.js 20+ và Python 3.10+ đã cài đặt.

#### Bước 1: Khởi động Master Server & Web Client (Port 3000)
```bash
npm install
npm run dev
```
👉 Truy cập giao diện tại: **`http://localhost:3000`**

#### Bước 2: Khởi động Python Multi-Agent Backend (Port 5050 - Tùy chọn)
```bash
cd ai-service
pip install -r requirements.txt
python app.py
```
*(Nếu không chạy Python backend, Master Server tự động kích hoạt bộ đệm In-Memory Simulation Fallback mà không làm gián đoạn bất kỳ tính năng nào).*

**Hoặc nhấp đúp chuột vào file `run_all.bat` (hoặc `scripts/run_all.bat`) để khởi động tự động toàn bộ!**

---

## 🧪 CHẠY BỘ KIỂM THỬ TỰ ĐỘNG (AUTOMATED TEST SUITE)

Để chạy toàn bộ Unit Tests và 10 ca kiểm thử thực nghiệm TC01 - TC10:
```bash
npm test
```
*Kết quả:* Đạt **100% Pass** (3/3 Unit Tests tính liều lượng lâm sàng + 10/10 Kịch bản nghiệp vụ, ca biên và rào chắn an ninh).

Kiểm tra cú pháp và kiểu dữ liệu TypeScript (Strict Type Check):
```bash
npm run lint
```
*Kết quả:* **0 lỗi, 0 cảnh báo.**

Biên dịch đóng gói sản phẩm (Production Build):
```bash
npm run build
```
*Kết quả:* Build thành công thư mục `dist/` sẵn sàng triển khai.

---

## 👥 TÀI KHOẢN MẪU & PHÂN QUYỀN VAI TRÒ (RBAC)

Trong ứng dụng, bấm nút **"Đăng Nhập"** ở góc trên bên phải để chuyển đổi giữa 3 vai trò:
1. **Chủ trang trại (Admin):**
   - Email: `owner@farmpro.vn` | Quyền: Toàn quyền quản trị tài chính, chuồng trại, nhân sự, báo cáo tổng thể.
2. **Bác sĩ thú y (Veterinarian):**
   - Email: `vet@farmpro.vn` | Quyền: Khám chữa bệnh, kê đơn thuốc, ký y lệnh vào bệnh án điện tử, chỉ dẫn cách ly dịch tễ.
3. **Kỹ sư chăn nuôi (Technician):**
   - Email: `technician@farmpro.vn` | Quyền: Cập nhật chỉ số sinh trưởng cá thể, giám sát tiểu khí hậu chuồng, xác nhận hoàn thành công việc.

---

## 📘 TÀI LIỆU BÁO CÁO KỸ THUẬT & MINH CHỨNG KÈM THEO
1. [Quyển Báo Cáo Kỹ Thuật Đồ Án Môn Học (6 Chương Chuẩn ICTU)](./docs/bao-cao/BAO_CAO_DO_AN_MON_HOC.md)
2. [Kịch Bản Demo Theo Dõi Một Đàn Xuyên Suốt 7 Bước (Nhiệm vụ 5)](./docs/huong-dan/KICH_BAN_DEMO_THEO_DOI_MOT_DAN.md)
3. [Nhật Ký Prompt AI Trong Quy Trình SDLC & Tự Kiểm Chứng](./docs/sdlc-factory/NHAT_KY_PROMPT_SDLC.md)
4. [Báo Cáo Nghiên Cứu Thực Nghiệm So Sánh Prompt A/B Test (Tiêu Chí 3.2)](./docs/prompt-ab-testing/SO_SANH_PHIEN_BAN_PROMPT.md)
5. [Báo Cáo Bộ Kiểm Thử Thực Nghiệm TC01 - TC13 (Tiêu Chí 3.1 & 3.3)](./docs/kiem-thu/HUONG_DAN_KIEM_THU_TC01_TC10.md)
6. [Hướng Dẫn Cài Đặt & Cấu Hình MySQL](./docs/huong-dan/HUONG_DAN_CAI_DAT_MYSQL_VSCODE.md)

---
© 2026 FarmPro AI - Đồ án môn học Ứng Dụng Trí Tuệ Nhân Tạo - Khoa CNTT, Trường ĐH Công Nghệ Thông Tin & Truyền Thông (ICTU).

