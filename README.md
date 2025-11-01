# SOA Midterm Backend

Microservices architecture với User Service và Email Service.

## Cấu trúc Project

```
SOA_MID_BE/
├── user_service/          # User Service (Port 5000)
│   ├── src/
│   │   ├── controllers/   # User, Auth, OTP, Transaction controllers
│   │   ├── services/      # Business logic + Email API Client
│   │   ├── routes/        # API routes
│   │   ├── models/        # MongoDB models
│   │   └── ...
│   └── package.json
└── email_service/          # Email Service (Port 5001)
    ├── src/
    │   ├── controllers/   # Email controllers
    │   ├── services/      # Email service logic
    │   ├── routes/        # Email API routes
    │   └── ...
    └── package.json
```

## Cài đặt và Chạy

### 1. Khởi động Infrastructure
```bash
docker-compose up -d
```

### 2. Chạy Email Service
```bash
cd email_service
npm install
npm run dev
```

### 3. Chạy User Service (terminal mới)
```bash
cd user_service
npm install
npm run dev
```

## Environment Variables

### Email Service

Tạo `email_service/.env`:
```env
PORT=5001
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### User Service

Tạo `user_service/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/user_service_db
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
JWT_SECRET=your-secret-key
EMAIL_SERVICE_URL=http://localhost:5001
```

## API Endpoints

### User Service (Port 5000)
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/otp/generate` - Tạo OTP (tự động gửi email)
- `POST /api/otp/verify` - Xác thực OTP
- `GET /api/users` - Lấy danh sách users
- `GET /health` - Health check
- `GET /api-docs` - Swagger docs

### Email Service (Port 5001)
- `POST /api/email/send-otp` - Gửi OTP email
- `POST /api/email/resend-otp` - Gửi lại OTP
- `POST /api/email/send` - Gửi email generic
- `GET /health` - Health check
- `GET /api-docs` - Swagger docs

## Services Architecture

```
Frontend (Port 5173)
    ↓
User Service (Port 5000)
    ↓ (HTTP API)
Email Service (Port 5001)
    ↓
SMTP (Gmail)
```

## Notes

- User Service gọi Email Service qua HTTP API (không phụ thuộc trực tiếp)
- OTP được lưu trong Redis với TTL 5 phút
- Mỗi service có thể scale độc lập
