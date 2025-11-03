# Email Service

Email service là một microservice độc lập xử lý việc gửi email.

## Cài đặt

```bash
npm install
```

## Cấu hình

Tạo file `.env` với các biến sau:

```env
PORT=5001
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Chạy service

```bash
# Development
npm run dev

# Production
npm start
```

Service sẽ chạy tại: `http://localhost:5001`

## API Endpoints

- `POST /api/email/send-otp` - Gửi email OTP
- `POST /api/email/resend-otp` - Gửi lại email OTP
- `POST /api/email/send` - Gửi email generic
- `POST /api/test-email` - Test endpoint
- `GET /health` - Health check
- `GET /api-docs` - Swagger documentation

## Tích hợp với User Service

User service gọi email service thông qua HTTP API. Cấu hình URL trong user service:

```env
EMAIL_SERVICE_URL=http://localhost:5001
```

