@echo off
chcp 65001 >nul
echo =========================================================================
echo    FARMPRO AI - HE THONG QUAN LY TRANG TRAI & SDLC AI AGENT FACTORY
echo =========================================================================
echo Đang kiểm tra môi trường và khởi động các dịch vụ...
echo.

:: 1. Khởi động Master Web & SDLC Server trên cổng 3000
echo [1/2] Đang khởi động Node Server & React Frontend (Port 3000)...
start "FarmPro AI - Web Server" cmd /k "npm run dev"

:: 2. Khởi động Multi-Agent System (nếu có Python)
echo [2/2] Đang kiểm tra Multi-Agent Backend (Python Flask Port 5050)...
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    start "FarmPro AI - Multi-Agent Backend" cmd /k "cd multi_agent_product_system && python app.py"
) else (
    echo [Lưu ý] Python chưa cài đặt hoặc không nằm trong PATH. Master Server sẽ chạy chế độ In-Memory Simulation an toàn.
)

echo.
echo =========================================================================
echo    HE THONG DA KHOI DONG THANH CONG!
echo    - Ung dung Web & AI SDLC Factory: http://localhost:3000
echo    - Python Multi-Agent API:         http://localhost:5050
echo    - Monitoring & Health Check:      http://localhost:3000/api/health
echo =========================================================================
echo.
pause

