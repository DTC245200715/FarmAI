# 🌾 FarmPro AI & SDLC Agent Factory
> **Hệ Thống Quản Trị Trang Trại Thông Minh Kết Hợp Nhà Máy Phát Triển Phần Mềm Đa Tác Tử**  
> Học phần: **Ứng Dụng Trí Tuệ Nhân Tạo** – Trường ĐH Công Nghệ Thông Tin & Truyền Thông (ICTU) – Đại Học Thái Nguyên  
> Giảng viên hướng dẫn: **ThS. Nguyễn Tuấn Anh** | Lớp: **K23.K1.CNTT K23K**

---

## 📌 Tổng Quan Hệ Thống

**FarmPro AI** là giải pháp chuyển đổi số toàn diện cho trang trại chăn nuôi thông minh (Bò thịt, Bò sữa, Heo nái, Heo thịt, Gia cầm) tuân thủ tiêu chuẩn an toàn sinh học VietGAHP, kết hợp hệ thống **SDLC AI Agent Factory** – nhà máy phát triển phần mềm tự động hóa bằng AI đa tác tử.

### ✨ Các Tính Năng Cốt Lõi:
1. **Quản trị chăn nuôi toàn diện:** Quản lý hàng nghìn cá thể vật nuôi theo thẻ tai RFID, theo dõi chuồng trại & tiểu khí hậu IoT, quản lý tồn kho dược phẩm & thức ăn, lịch trình chăm sóc, hồ sơ bệnh án điện tử.
2. **Phòng khám Bác sĩ Thú y AI:** Chẩn đoán phân biệt đa tiêu chí kèm xác suất %, tự động tính toán liều lượng thuốc chính xác đến từng ml theo trọng lượng cá thể, chỉ dẫn cách ly an toàn sinh học và quy định thời gian ngừng thuốc.
3. **SDLC AI Agent Factory (Tiêu chí 2 - 4.0 Điểm):** Dây chuyền 5 Trạm Agent tự động hóa chu trình phát triển phần mềm theo nguyên lý **Context Engineering** (Domain Ontology, Architecture Rules, Safety Guardrails, Tech Bounds), bóc tách điểm mập mờ, sinh mã nguồn Clean Code, tự động tạo kiểm thử Unit/Integration và kiểm toán an ninh.
4. **Hệ thống Đa Tác Tử (Multi-Agent System - 7 Agents):** Giao tiếp qua Pydantic message bus với Orchestrator, Analyst, Database (MySQL SQL Tool), RAG (Vector Store ChromaDB), Reasoning, Critic (Tác tử phản biện) và Response Agent.
5. **Nghiên cứu thực nghiệm Prompt (Tiêu chí 3.2):** Bảng đối sánh A/B Testing định lượng giữa 3 thế hệ Prompt v1 (Naive), v2 (Few-Shot) và v3 (Chain-of-Thought + Guardrails + JSON Schema).
6. **Bộ 10 Kịch Bản Kiểm Thử (TC01 - TC10):** Bao phủ đầy đủ Ca Đúng, Ca Sai, Ca Biên cực hạn, Rào chắn bảo mật và khả năng chịu lỗi (Fallback Engine).

---

## 🏗️ Kiến Trúc Hệ Thống (System Architecture)

```
                       ┌────────────────────────────────────────┐
                       │     React 19 + TypeScript Frontend     │
                       │ (Dashboard, AiAdvisor, SDLC, A/B Test) │
                       └───────────────────┬────────────────────┘
                                           │ HTTP / JSON
                                           ▼
                       ┌────────────────────────────────────────┐
                       │    Master Server (Node.js/Express)     │
                       │     - Port: 3000                       │
                       │     - SDLC AI Agent Factory            │
                       │     - Prompt Benchmark & Guardrails    │
                       │     - Health Monitoring & Observability│
                       └───────────┬───────────────┬────────────┘
                                   │               │
        ┌──────────────────────────┘               └──────────────────────────┐
        ▼                                                                     ▼
┌─────────────────────────────────┐                       ┌─────────────────────────────────┐
│ Python Flask MAS Server (5050) │                       │        MySQL 8.0 Database       │
│  - 7 Specialized Agents         │◄─────────────────────►│  - animals, barns, health_logs │
│  - ChromaDB Vector Store RAG    │                       │  - inventory_items, care_tasks  │
│  - Critic Agent & RetryManager  │                       └─────────────────────────────────┘
└─────────────────────────────────┘
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Hệ Thống

### Cách 1: Khởi động 1-Click bằng Docker Compose (Khuyên dùng)
Yêu cầu: Đã cài đặt [Docker Desktop](https://www.docker.com/products/docker-desktop/).
```bash
# 1. Khởi động toàn bộ cụm dịch vụ (MySQL + Python MAS + Node Web App)
docker compose up -d --build

# 2. Truy cập ứng dụng tại:
# Web App & AI SDLC Factory: http://localhost:3000
# Multi-Agent Python API:     http://localhost:5050
# Health Check Endpoint:      http://localhost:3000/api/health
```

---

### Cách 2: Khởi động trực tiếp trên Windows (Local Dev)
Yêu cầu: Node.js 20+ và Python 3.10+ đã cài đặt.

#### Bước 1: Khởi động Master Web & SDLC Server (Port 3000)
```bash
# Cài đặt thư viện Node.js
npm install

# Khởi động máy chủ phát triển
npm run dev
```
👉 Ứng dụng sẽ mở tại: **`http://localhost:3000`**

#### Bước 2: Khởi động Python Multi-Agent Backend (Port 5050 - Tùy chọn)
```bash
cd multi_agent_product_system
pip install -r requirements.txt
python app.py
```
*(Nếu không chạy Python backend, Master Server sẽ tự động kích hoạt bộ đệm mô phỏng In-Memory Fallback mà không làm gián đoạn bất kỳ trải nghiệm nào).*

Hoặc đơn giản nhấp đúp chuột vào file **`run_all.bat`** để hệ thống tự động khởi chạy toàn bộ!

---

## 🧪 Tài Liệu Báo Cáo & Thực Nghiệm Kèm Theo

1. 📘 **[Quyển Báo Cáo Kỹ Thuật Đồ Án Môn Học](./BAO_CAO_DO_AN_MON_HOC.md)**  
   *Đáp ứng 100% các tiêu chí chuẩn đầu ra CLO1, CLO2, CLO3, CLO4, CLO5 và PLO7 (Thang điểm 10/10).*
2. 🔬 **[Báo Cáo So Sánh Các Phiên Bản Prompt (A/B Testing)](./SO_SANH_PHIEN_BAN_PROMPT.md)**  
   *Đối sánh định lượng và định tính giữa Prompt v1, Prompt v2 và Prompt v3 (Tiêu chí 3.2).*
3. 🛡️ **[Báo Cáo Kiểm Thử Thực Nghiệm TC01 - TC10](./HUONG_DAN_KIEM_THU_TC01_TC10.md)**  
   *Chi tiết 10 kịch bản kiểm thử đúng, sai, biên, rào chắn an ninh và chống Hallucination.*
4. 🗄️ **[Hướng Dẫn Cài Đặt MySQL Trong VSCode](./HUONG_DAN_CAI_DAT_MYSQL_VSCODE.md)**  
   *Hướng dẫn cấu hình kết nối cơ sở dữ liệu quan hệ.*

---

## 👥 Phân Quyền Vai Trò Người Dùng (RBAC)

Hệ thống hỗ trợ chuyển đổi linh hoạt giữa 3 vai trò người dùng trong modal **"Đăng Nhập"**:
- **Chủ trang trại (Admin):** Toàn quyền kiểm soát tài chính, vật tư, nhân sự và báo cáo.
- **Bác sĩ thú y (Veterinarian):** Quyền phê duyệt đơn thuốc, chẩn đoán AI và cách ly dịch tễ.
- **Kỹ sư chăn nuôi (Technician):** Quyền giám sát tiểu khí hậu chuồng và tick hoàn thành công việc.

---
© 2026 FarmPro AI - Đồ án môn học Ứng Dụng Trí Tuệ Nhân Tạo - Khoa CNTT, ICTU.
