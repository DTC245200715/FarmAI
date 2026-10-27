/**
 * SDLC Context Engineering: 4 Tầng Ngữ Cảnh Chuẩn Hóa
 * Dùng làm Blueprint để nạp vào toàn bộ 5 Trạm của SDLC AI Factory
 */

export interface SdlcContextDefinition {
  domainLayer: string;
  architectureLayer: string;
  safetyLayer: string;
  techStackLayer: string;
}

export const SDLC_CONTEXT_ENGINEERING: SdlcContextDefinition = {
  domainLayer: `[DOMAIN ONTOLOGY - NÔNG NGHIỆP & THÚ Y LÂM SÀNG SỐ]:
- Chuẩn chăn nuôi: VietGAHP (Thực hành chăn nuôi tốt tại Việt Nam) và An toàn sinh học cấp độ 3.
- Đối tượng quản lý: Gia súc (Bò thịt, Bò sữa giống HF, Heo nái Yorkshire, Heo thịt Duroc), Gia cầm (Gà đẻ Ai Cập), Dê Boer.
- Quy chuẩn dược lý thú y: Phân loại kháng sinh phổ rộng (Florfenicol, Doxycycline, Amoxicillin), thuốc tiêu viêm hạ sốt (Analgin-C, Dexamethasone), vitamin bổ trợ (Gluco-K-C).
- Công thức tính liều: [Thể trọng thực tế (kg)] x [Liều chỉ định (ml/kg)] = [Thể tích tiêm chính xác (ml)].
- Quy định thời gian ngừng thuốc bắt buộc (Withdrawal Period) trước khi giết mổ để loại trừ tồn dư kháng sinh.`,

  architectureLayer: `[ARCHITECTURE RULES - CLEAN ARCHITECTURE & 3NF]:
- Mô hình: Modular Monolith kết hợp Micro-Agent Services (Node.js 20 Master + Python Flask 5050 MAS + MySQL 8.0).
- Phân tầng: Presentation (React 19) -> API Gateway / Controller -> Domain Services -> Data Layer (MySQL / ChromaDB / Fallback).
- Chuẩn hóa CSDL: Mọi quan hệ đạt chuẩn 3NF, khóa ngoại ràng buộc toàn vẹn tham chiếu (ON DELETE CASCADE), index tối ưu trên cột tra cứu (tag_id, status, barn_id).
- API Design: Chuẩn RESTful, JSON Payload đồng nhất, phân quyền theo vai trò (RBAC).`,

  safetyLayer: `[SAFETY GUARDRAILS & AI ETHICS]:
- Input Sanitizer: Loại bỏ các ký tự nguy hiểm (<, >, script, SQL escape sequences).
- Phòng chống Prompt Injection & Jailbreak: Phân tách rõ ràng giữa User Query và System Instructions.
- Rào chắn dược lý: Tuyệt đối không kê đơn thuốc cấm theo danh mục Bộ Nông nghiệp & PTNT; Cảnh báo chống chỉ định với con nái mang thai.
- Bảo mật thông tin bí mật: API Keys lưu trữ độc quyền trong biến môi trường máy chủ (.env), zero-client secrets.
- Nguyên tắc Human-in-the-Loop: Mọi chỉ định AI chỉ mang tính tham vấn, cần bác sĩ thú y hoặc chủ trại phê duyệt trước khi thi hành.`,

  techStackLayer: `[TECH STACK BOUNDS]:
- Frontend: React 19, TypeScript 5.x, Vite, TailwindCSS, Lucide Icons.
- Backend API Gateway: Node.js 20 LTS, Express, TSX, @google/genai SDK.
- Multi-Agent Python Service: Python 3.11, Flask, Pydantic, ChromaDB Vector Store.
- Cơ sở dữ liệu: MySQL 8.0 Relational DB + In-Memory Fallback State Store.`
};
