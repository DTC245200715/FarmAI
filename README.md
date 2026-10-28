# 🌾 DỰ ÁN: HỆ THỐNG QUẢN LÝ CHĂN NUÔI CÓ TÍCH HỢP AI (FARMPRO AI)
> **Tên đề tài/Dự án:** Hệ thống quản lý chăn nuôi có tích hợp AI (FarmPro AI)  
> **Kiến trúc hệ thống:** React 19 + Node.js 20 Express + Python Flask Multi-Agent (ChromaDB RAG) + MySQL 8.0  
> **Học phần:** Ứng Dụng Trí Tuệ Nhân Tạo – Trường ĐH Công Nghệ Thông Tin & Truyền Thông (ICTU) – Đại Học Thái Nguyên  
> **Giảng viên hướng dẫn:** ThS. Nguyễn Đình Dũng | **Lớp:** K23.K1.CNTT K23B  

---

## 🗂️ CẤU TRÚC THƯ MỤC CHUẨN HÓA KIẾN TRÚC MODULAR

```
FarmAI-main/
├── src/                                  # Frontend React 19 + TypeScript (Vite + HeroUI)
│   ├── components/                       # UI Components dùng chung
│   │   └── ui/                           # Atomic Design System (HeroUIComponents, HealthBadge, EmptyState, ConfirmModal)
│   ├── pages/                            # 11 Phân hệ SPA Views (Lazy Loaded qua React.lazy + Suspense)
│   │   ├── DashboardView.tsx             # Tổng quan điều hành trang trại & Chỉ số IoT
│   │   ├── AnimalsView.tsx               # Quản lý đàn gia súc/gia cầm (CRUD, Cân đo, Xuất bán)
│   │   ├── AiAdvisorView.tsx             # Phòng khám lâm sàng & Chat AI Bác sĩ thú y
│   │   ├── MultiAgentView.tsx            # Cố vấn dược phẩm Đa Tác Tử (MAS 4 Agents)
│   │   ├── PromptComparisonView.tsx      # Thực nghiệm nghiên cứu A/B Testing Prompts v1/v2/v3
│   │   ├── SdlcFactoryView.tsx           # Trạm điều khiển AI SDLC Factory (5 trạm tự động)
│   │   ├── ScheduleView.tsx              # Lịch tiêm phòng, cho ăn & chăm sóc
│   │   ├── BarnsView.tsx                 # Quản lý chuồng trại & Giám sát tiểu khí hậu
│   │   ├── InventoryView.tsx             # Kho thức ăn, vắc xin & vật tư thú y
│   │   ├── HealthLogsView.tsx            # Bệnh án số & Nhật ký can thiệp y tế
│   │   └── ReportsView.tsx               # Báo cáo tăng trưởng ADG, hiệu quả chuyển hóa FCR
│   ├── context/                          # State management tập trung (FarmContext, ToastContext)
│   ├── services/                         # Tầng mạng thống nhất (apiClient.ts, farmService.ts)
│   ├── types/                            # Data models & Strict TypeScript definitions
│   └── App.tsx                           # Master Router với framer-motion page transitions
├── backend/                              # Backend Node.js 20 Express
│   └── src/
│       ├── config/                       # Cấu hình hằng số & kết nối CSDL (constants.ts, db.ts)
│       ├── middlewares/                  # JWT Auth (RBAC), Rate Limiter, Centralized Error Handler
│       ├── services/                     # Nghiệp vụ: Multi-Agent Runner, SDLC Factory, Rào chắn
│       ├── utils/                        # Tiện ích chuẩn hóa phản hồi (responseHelper.ts)
│       └── server.ts                     # API Gateway chính (Port 3000)
├── ai-service/                           # Python Flask Microservice Đa Tác Tử (Port 5050)
│   ├── agents/                           # 7 Agents: Orchestrator, Analyst, DB, RAG, Reasoning, Critic, Response
│   ├── models/                           # AgentMessage Bus (Pydantic models)
│   ├── services/                         # ChromaDB Vector Store & MySQL Service
│   ├── tests/                            # Test cases kiểm thử tự động (test_all.py)
│   ├── app.py                            # Flask application entry point
│   └── requirements.txt                  # Python dependencies
├── database/                             # Cơ sở dữ liệu quan hệ
│   ├── schema.sql                        # Lược đồ DDL 10 bảng chuẩn hóa 3NF
│   └── seed.sql                          # Dữ liệu hạt giống khởi tạo trang trại mẫu
├── tests/                                # Bộ kiểm thử tự động tích hợp
│   ├── unit/                             # Kiểm thử tính liều lượng lâm sàng theo cân nặng
│   ├── scenarios/                        # 13 Ca kịch bản nghiệp vụ, ca biên và rào chắn (TC01-TC13)
│   ├── integration/                      # Kiểm thử tích hợp toàn bộ HTTP API Endpoints
│   └── runAllTests.ts                    # Test runner tổng hợp
├── docs/                                 # Tài liệu kỹ thuật, minh chứng & prompts
│   ├── bao-cao/                          # Báo cáo kỹ thuật đồ án 6 chương chuẩn ICTU
│   ├── prompts/                          # Nhật ký và bộ Prompts hệ thống (v1, v2, v3, SDLC)
│   ├── prompt-ab-testing/                # Báo cáo thực nghiệm so sánh Prompt A/B Test
│   └── kiem-thu/                         # Tài liệu hướng dẫn & Báo cáo kết quả kiểm thử
├── deploy/                               # Đóng gói & Triển khai
│   └── docker/                           # Dockerfile (Web Gateway) & Dockerfile.flask
├── docker-compose.yml                    # Cụm 3 container: MySQL + Python MAS + Node Web App
├── .env.example                          # Mẫu cấu hình môi trường an toàn (Zero Secret Leak)
├── .dockerignore                         # Tối ưu hóa dung lượng đóng gói Docker
└── README.md                             # Tài liệu tổng quan dự án
```

---

## 🛠️ CÔNG NGHỆ VÀ DỊCH VỤ SỬ DỤNG (TECH STACK)

| Phân hệ / Tầng | Công nghệ / Ngôn ngữ | Phiên bản | Vai trò & Trách nhiệm trong hệ thống |
| :--- | :--- | :---: | :--- |
| **Frontend (Giao diện)** | React, TypeScript, Vite, HeroUI, Tailwind CSS, Framer Motion | React 19, TS 5.x, HeroUI v3, Tailwind v4 | Giao diện SPA chuẩn HeroUI: Responsive mobile/desktop, Code splitting (React.lazy), chuyển view mượt mà, Dark/Light mode, Forms validation trực quan. |
| **Backend API Gateway** | Node.js, Express, TSX | Node.js 20 LTS, Express 4.x | Cổng điều phối API RESTful, phân quyền vai trò (RBAC 3 vai trò), AI Rate Limiting (60 req/min), Centralized Error Handler, chuẩn phản hồi JSON `{success, message, data}`. |
| **Multi-Agent Service** | Python, Flask, Pydantic, ChromaDB | Python 3.11+, Flask 3.x | Hệ thống Đa tác tử gồm 7 Agents chuyên môn hóa: Điều phối tuần tự, tự thẩm định & cơ chế thử lại (Retry Loop), tìm kiếm ngữ nghĩa Vector Search. |
| **Trí tuệ nhân tạo (AI)** | Google Gemini API, ChromaDB | `@google/genai ^2.4`, ChromaDB | Suy luận lâm sàng thú y, tóm tắt dịch tễ đàn, tính chỉ số ADG/FCR, phác đồ điều trị an toàn theo tiêu chuẩn VietGAHP, rào chắn chống Jailbreak/SQL Injection. |
| **Cơ sở dữ liệu** | MySQL 8.0, In-Memory Simulation Fallback | MySQL 8.0 (InnoDB, 3NF) | CSDL quan hệ 10 bảng; Cơ chế Fallback tự phục hồi trong bộ nhớ (In-Memory Simulation) khi ngắt kết nối CSDL giúp hệ thống hoạt động liên tục 24/7. |
| **Đóng gói & Vận hành** | Docker, Docker Compose | Docker Compose v2 | Containerization toàn diện cụm 3 dịch vụ: `farmpro_mysql` (port 3306), `farmpro_multi_agent` (port 5050), `farmpro_web_app` (port 3000). |
| **Kiểm thử tự động** | TSX Test Runner, Pytest | Unit & Integration | Kiểm thử tự động tính liều thuốc, 13 ca kịch bản nghiệp vụ (TC01–TC13), kiểm thử rào chắn an ninh, 9 ca HTTP API integration tests. |

---

## 🔌 DANH SÁCH HTTP API CHÍNH & MAPPING DỊCH VỤ

| Phương thức | Đường dẫn API | Xác thực & Vai trò | Mô tả nghiệp vụ |
| :---: | :--- | :---: | :--- |
| `GET` | `/api/health` | Public | Giám sát trạng thái hoạt động của hệ thống (Health Check) |
| `GET` | `/api/db/status` | Public | Kiểm tra kết nối MySQL / In-Memory Simulation Fallback |
| `GET` | `/api/animals` | Public / Token | Lấy danh sách toàn bộ vật nuôi theo dõi |
| `POST` | `/api/animals` | RBAC (`Vet`, `Tech`, `Owner`) | Đăng ký cá thể mới vào đàn (Validation: Cân nặng > 0, TagId duy nhất) |
| `PUT` | `/api/animals/:id` | RBAC (`Vet`, `Tech`, `Owner`) | Cập nhật hồ sơ cá thể, cân nặng, trạng thái sức khỏe |
| `PUT` | `/api/animals/:id/sell` | RBAC (`Owner`) | Xuất bán thương phẩm (Rào chắn: Chặn bán khi đang điều trị bệnh) |
| `DELETE` | `/api/animals/:id` | RBAC (`Owner` duy nhất) | Xóa cá thể khỏi hệ thống (Chặn nhân viên, kỹ sư xóa trái phép) |
| `POST` | `/api/ai/chat` | Rate Limit (60 req/min) | Trợ lý tư vấn thú y chuyên sâu (Kèm disclaimer y khoa & retry button) |
| `POST` | `/api/ai/herd-summary` | Rate Limit | Tóm tắt tình trạng sức khỏe đàn và khuyến nghị an toàn sinh học |
| `POST` | `/api/ai/growth-report` | Public / Token | Tính toán chỉ số tăng trọng bình quân ADG và chuyển hóa thức ăn FCR |
| `POST` | `/api/ai/multi-agent/run`| Rate Limit / 30s | Thực thi chuỗi 4 Tác tử MAS (Trích xuất -> Tra cứu -> Thẩm định -> Phác đồ) |
| `POST` | `/api/ai/requirements-agent/analyze` | Rate Limit | Trích xuất yêu cầu phần mềm và sinh cây phân rã công việc (SDLC BA) |

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

### Cách 1: Khởi động bằng Docker Compose (Khuyên dùng)
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

### Cách 2: Khởi động cục bộ trên máy phát triển (Local Dev)
Yêu cầu: Node.js 20+ và Python 3.10+ đã cài đặt.

#### Bước 1: Khởi động Web App & API Gateway (Port 3000)
```bash
npm install
npm run dev
```
👉 Truy cập giao diện ứng dụng tại: **`http://localhost:3000`**

#### Bước 2: Khởi động Python Multi-Agent Backend (Port 5050 - Tùy chọn)
```bash
cd ai-service
pip install -r requirements.txt
python app.py
```
*(Lưu ý: Nếu không chạy dịch vụ Python, hệ thống tự động kích hoạt bộ đệm In-Memory Simulation Fallback mà không làm gián đoạn bất kỳ trải nghiệm nào trên giao diện).*

---

## 🧪 CHẠY BỘ KIỂM THỬ TỰ ĐỘNG (AUTOMATED TEST SUITE)

Hệ thống tích hợp đầy đủ 3 cấp độ kiểm thử tự động đạt độ bao phủ toàn diện:

### 1. Kiểm thử Nghiệp vụ Lâm sàng & Rào chắn (TC01 - TC13)
```bash
npm test
```
*Kết quả:* **13/13 Ca kiểm thử ĐẠT (100% Pass rate)**:
- 3 bài Unit Tests tính liều lượng thuốc thú y theo thể trọng thực tế (mg/kg).
- 10 kịch bản ca đúng, ca biên (150g - 850kg), ca sai và rào chắn an ninh (SQL Injection, Jailbreak Prompt Injection, cảnh báo thuốc mang thai, phát hiện lịch tiêm vắc xin quá hạn, phát hiện sụt cân đột ngột).

### 2. Kiểm thử Tích hợp HTTP API Endpoints (Integration Tests)
```bash
npm run test:integration
```
*Kết quả:* **9/9 Test cases ĐẠT (100% Pass rate)**:
- Kiểm thử phản hồi mã lỗi HTTP chuẩn mực: `200 OK`, `400 Bad Request` (input validation), `403 Forbidden` (RBAC authorization), và rào chắn an toàn sinh học VietGAHP chặn xuất bán cá thể đang ốm.

### 3. Kiểm thử Dịch vụ Python Multi-Agent (MAS Suite)
```bash
python ai-service/tests/test_all.py
```
*Kết quả:* **10/10 Test cases ĐẠT (100% Pass rate)** bao gồm kiểm thử tự động cơ chế thử lại (Retry Loop) khi phát hiện vi phạm ràng buộc ngân sách.

### 4. Kiểm tra Kiểu Dữ Liệu TypeScript (Strict Mode)
```bash
npm run lint
```
*Kết quả:* **0 lỗi, 0 cảnh báo.**

### 5. Biên Dịch Sản Phẩm (Production Build)
```bash
npm run build
```
*Kết quả:* Hoàn tất trong **701ms**, tạo các chunks được code-split tối ưu qua Vite.

---

## 👥 TÀI KHOẢN MẪU & PHÂN QUYỀN VAI TRÒ (RBAC)

Ứng dụng hỗ trợ chuyển đổi nhanh 1 chạm (Quick Demo Select) trong Modal Đăng nhập:
1. **Chủ trang trại (Admin):**
   - Email: `owner@farmpro.vn` | Quyền: Toàn quyền quản trị tài chính, nhân sự, chuồng trại, xuất bán thương phẩm, xóa dữ liệu.
2. **Bác sĩ thú y (Veterinarian):**
   - Email: `vet@farmpro.vn` | Quyền: Khám chữa bệnh, kê đơn thuốc, ký y lệnh vào bệnh án điện tử, chỉ dẫn cách ly dịch tễ.
3. **Kỹ sư chăn nuôi (Technician):**
   - Email: `technician@farmpro.vn` | Quyền: Cập nhật chỉ số sinh trưởng cá thể, giám sát tiểu khí hậu chuồng, xác nhận hoàn thành công việc chăm sóc.

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
