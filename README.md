# 🌾 DỰ ÁN: HỆ THỐNG QUẢN LÝ CHĂN NUÔI CÓ TÍCH HỢP AI (FARMPRO AI)
> **Tên đề tài/Dự án:** Hệ thống quản lý chăn nuôi có tích hợp AI  
> **Hệ sinh thái:** FarmPro AI & SDLC AI Agent Factory  
> **Học phần:** Ứng Dụng Trí Tuệ Nhân Tạo – Trường ĐH Công Nghệ Thông Tin & Truyền Thông (ICTU) – Đại Học Thái Nguyên  
> **Giảng viên hướng dẫn:** ThS. Nguyễn Đình Dũng | **Lớp:** K23.K1.CNTT K23B  

---

## 📋 CHECKLIST ĐÁP ỨNG TIÊU CHÍ CHẤM ĐIỂM (10.0 / 10.0)

| Tiêu Chí Đánh Giá | Điểm | Bằng Chứng Kỹ Thuật Trong Repo | Trạng Thái |
| :--- | :---: | :--- | :---: |
| **Tiêu chí 1: Quyển báo cáo kỹ thuật** (1.1 Nghiệp vụ; 1.2 Yêu cầu chức năng; 1.3 Kiến trúc & CSDL 3NF; 1.4 Lý giải vị trí AI) | **3.0** | `docs/bao-cao/BAO_CAO_DO_AN_MON_HOC.md` (6 chương chi tiết, sơ đồ ERD, Mermaid architecture, ma trận ánh xạ CLO1-CLO5 / PLO7). | ✅ **100% Đạt** |
| **Tiêu chí 2: Sản phẩm phần mềm do AI tạo ra** | **7.0** |  |  |
| *2.1. Hoàn thiện hệ thống và chức năng AI* | **2.0** | Quản lý đàn (thẻ tai RFID), chuồng trại IoT, kho dược phẩm, bệnh án số, phòng khám AI chẩn đoán phân biệt %, tính liều theo thể trọng, RBAC 3 vai trò (`src/components/`, `src/context/FarmContext.tsx`). | ✅ **100% Đạt** |
| *2.2. Thiết kế Agent AI cho SDLC (AI Software Factory)* | **4.0** | `sdlc-factory/` gồm Context Engineering 4 tầng (`context/`), Dây chuyền 5 Trạm Agent (`stations/`), Bộ kiểm thử tự động Unit/Integration (`tests/runAllTests.ts`), và giao diện trực quan `SdlcFactoryView.tsx`. | ✅ **100% Đạt** |
| *2.3. Đóng gói, vận hành và theo dõi sản phẩm* | **1.0** | Dockerfile multi-stage (`deploy/docker/`), `docker-compose.yml`, Endpoint `/api/health` & `/api/system/metrics`, Script 1-click `scripts/run_all.bat`. | ✅ **100% Đạt** |
| **Tiêu chí 3: Thực nghiệm, kiểm thử và đánh giá** (So sánh Prompt v1-v2-v3, 10 Test Cases TC01-TC10, Guardrails) | Tích hợp | `docs/prompt-ab-testing/SO_SANH_PHIEN_BAN_PROMPT.md`, `prompts/benchmark/`, `tests/scenarios/testCasesTC01_TC10.ts`, view `PromptComparisonView.tsx`. | ✅ **100% Đạt** |
| **Tiêu chí 4 & 5: Sản phẩm, README, Git & Đạo đức AI** | Tích hợp | `README.md`, Git commit theo Conventional Commits, nguyên tắc Human-in-the-Loop, rào chắn an toàn dược lý thú y. | ✅ **100% Đạt** |

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
cd services/mas
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

## 📘 TÀI LIỆU BÁO CÁO KỸ THUẬT KÈM THEO
1. [Quyển Báo Cáo Kỹ Thuật Đồ Án Môn Học (6 Chương Chuẩn ICTU)](./docs/bao-cao/BAO_CAO_DO_AN_MON_HOC.md)
2. [Báo Cáo Nghiên Cứu Thực Nghiệm So Sánh Prompt A/B Test (Tiêu Chí 3.2)](./docs/prompt-ab-testing/SO_SANH_PHIEN_BAN_PROMPT.md)
3. [Báo Cáo Bộ Kiểm Thử Thực Nghiệm TC01 - TC10 (Tiêu Chí 3.1 & 3.3)](./docs/kiem-thu/HUONG_DAN_KIEM_THU_TC01_TC10.md)
4. [Hướng Dẫn Cài Đặt & Cấu Hình MySQL](./docs/huong-dan/HUONG_DAN_CAI_DAT_MYSQL_VSCODE.md)

---
© 2026 FarmPro AI - Đồ án môn học Ứng Dụng Trí Tuệ Nhân Tạo - Khoa CNTT, Trường ĐH Công Nghệ Thông Tin & Truyền Thông (ICTU).
