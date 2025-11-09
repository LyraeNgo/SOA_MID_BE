# SOA Midterm Backend

Microservices architecture với các services: Auth, OTP, Email, Transaction, User và API Gateway.

## Yêu cầu hệ thống

- Node.js (v16 trở lên)
- MongoDB (chạy local hoặc Docker)
- Redis (chạy local hoặc Docker)
- npm hoặc yarn

## Cấu trúc Project

```
SOA_MID_BE/
└── user_service/          # User Service và các microservices
    ├── src/
    │   ├── auth/          # Auth Service (Port 5001)
    │   ├── otp/           # OTP Service (Port 5003)
    │   ├── email/          # Email Service (Port 5002)
    │   ├── transaction/   # Transaction Service (Port 5004)
    │   ├── user/           # User Service (Port 5005)
    │   ├── gateway/        # API Gateway (Port 5000)
    │   └── ...
    └── package.json
```

## Hướng dẫn chạy dự án

### Bước 1: Khởi động Infrastructure (MongoDB & Redis)

#### Cách 1: Dùng Docker (Khuyến nghị)
```bash
# Tạo file docker-compose.yml trong thư mục SOA_MID_BE nếu chưa có
docker-compose up -d
```

#### Cách 2: Chạy thủ công
- **MongoDB**: Chạy MongoDB trên port 27017
- **Redis**: Chạy Redis trên port 6379

### Bước 2: Cấu hình Environment Variables

Tạo file `.env` cho từng service:

#### 1. Email Service (`user_service/src/email/.env`)
```env
PORT=5002
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```
**Lưu ý**: `EMAIL_PASS` là App Password từ Gmail (không phải mật khẩu thường)

#### 2. Auth Service (`user_service/src/auth/.env`)
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/auth_db
JWT_SECRET=your-secret-key-here
```

#### 3. OTP Service (`user_service/src/otp/.env`)
```env
PORT=5003
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

#### 4. Transaction Service (`user_service/src/transaction/.env`)
```env
PORT=5004
MONGO_URI=mongodb://localhost:27017/transaction_db
```

#### 5. User Service (`user_service/src/user/.env`)
```env
PORT=5005
MONGO_URI=mongodb://localhost:27017/user_db
```

#### 6. Gateway (`user_service/src/gateway/.env`)
```env
PORT=5000
```

### Bước 3: Cài đặt Dependencies

Cài đặt dependencies cho từng service:

```bash
# Email Service
cd user_service/src/email
npm install

# Auth Service
cd ../auth
npm install

# OTP Service
cd ../otp
npm install

# Transaction Service
cd ../transaction
npm install

# User Service
cd ../user
npm install

# Gateway
cd ../gateway
npm install
```

### Bước 4: Chạy các Services

**Mở 6 terminal riêng biệt** và chạy từng service:

#### Terminal 1: Email Service
```bash
cd user_service/src/email
npm run dev
```
Service sẽ chạy tại: `http://localhost:5002`

#### Terminal 2: Auth Service
```bash
cd user_service/src/auth
npm start
```
Service sẽ chạy tại: `http://localhost:5001`

#### Terminal 3: OTP Service
```bash
cd user_service/src/otp
npm start
```
Service sẽ chạy tại: `http://localhost:5003`

#### Terminal 4: Transaction Service
```bash
cd user_service/src/transaction
npm run dev
```
Service sẽ chạy tại: `http://localhost:5004`

#### Terminal 5: User Service
```bash
cd user_service/src/user
npm run dev
```
Service sẽ chạy tại: `http://localhost:5005`

#### Terminal 6: API Gateway (Chạy cuối cùng)
```bash
cd user_service/src/gateway
npm start
```
Gateway sẽ chạy tại: `http://localhost:5000`

### Bước 5: Kiểm tra Services đã chạy

Sau khi khởi động tất cả services, kiểm tra:

- **Gateway**: http://localhost:5000/api-docs (Swagger UI tổng hợp)
- **Email Service**: http://localhost:5002/api-docs
- **Auth Service**: http://localhost:5001/api-docs
- **OTP Service**: http://localhost:5003/api-docs
- **Transaction Service**: http://localhost:5004/api-docs
- **User Service**: http://localhost:5005/api-docs

Health checks:
- Gateway: http://localhost:5000/health
- Email: http://localhost:5002/health
- Auth: http://localhost:5001/health
- OTP: http://localhost:5003/health
- Transaction: http://localhost:5004/health
- User: http://localhost:5005/health

## API Endpoints (qua Gateway)

Tất cả requests nên đi qua Gateway tại `http://localhost:5000`:

- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/otp/generate` - Tạo OTP và gửi qua email
- `POST /api/otp/verify` - Xác thực OTP
- `POST /api/email/send-otp` - Gửi OTP email
- `GET /api/users` - Lấy danh sách users
- `GET /api/transaction` - Lấy danh sách transactions
- `GET /api-docs` - Swagger documentation tổng hợp

## Services Architecture

```
Frontend (Port 5173)
    ↓
API Gateway (Port 5000)
    ↓
    ├──→ Auth Service (Port 5001)
    ├──→ OTP Service (Port 5003)
    ├──→ Email Service (Port 5002)
    ├──→ Transaction Service (Port 5004)
    └──→ User Service (Port 5005)
```