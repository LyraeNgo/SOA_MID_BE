# Email Service

Email service là một microservice độc lập xử lý việc gửi email OTP cho xác thực giao dịch.

## Chức năng

- Gửi email chứa mã OTP đến địa chỉ email của người nộp tiền khi xác nhận giao dịch
- Quản lý mã OTP đã cấp phát, đảm bảo không trùng nhau giữa các giao dịch
- Thời hạn hiệu lực của mã OTP: 5 phút

## Cài đặt

```bash
npm install
```

## Cấu hình

Tạo file `.env` với các biến sau:

```env
PORT=5002
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Lưu ý**: `EMAIL_PASS` là App Password từ Gmail (không phải mật khẩu thường)

## Chạy service

```bash
# Development
npm run dev

# Production
npm start
```

Service sẽ chạy tại: `http://localhost:5002`

## API Endpoints

- `POST /api/email/send-otp` - Gửi email OTP
- `POST /api/email/resend-otp` - Gửi lại email OTP
- `POST /api/email/send` - Gửi email generic
- `POST /api/test-email` - Test endpoint
- `GET /health` - Health check
- `GET /api-docs` - Swagger documentation
- `GET /api/email/docs-json` - Swagger JSON cho gateway

## Tích hợp với các Services khác

Các service khác gọi email service thông qua HTTP API. Cấu hình URL:

```env
EMAIL_SERVICE_URL=http://localhost:5002
```

## Kiến trúc

Email service được tích hợp vào `user_service/src/email` và chạy độc lập trên port 5002. Gateway sẽ proxy các request đến `/api/email` tới service này.

OTP được quản lý bởi OTP Service (lưu trong Redis với TTL 5 phút), Email Service chỉ có nhiệm vụ gửi email chứa mã OTP.
