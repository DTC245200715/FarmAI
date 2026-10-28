#!/usr/bin/env bash
echo "========================================================================="
echo "   FARMPRO AI - HE THONG QUAN LY TRANG TRAI & SDLC AI AGENT FACTORY"
echo "========================================================================="
echo "Đang khởi động Master Server (Port 3000)..."

npm run dev &
NODE_PID=$!

if command -v python3 &> /dev/null; then
    echo "Đang khởi động Python MAS (Port 5050)..."
    (cd ai-service && python3 app.py) &
    PYTHON_PID=$!
fi

echo "Hệ thống đang chạy tại http://localhost:3000"
wait $NODE_PID

