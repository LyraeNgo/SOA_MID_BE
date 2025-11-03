import Redis from "ioredis";
import crypto from "crypto";

// Cấu hình Redis với retry và error handling
const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  retryStrategy: (times) => {
    // Retry với delay tăng dần, tối đa 10 lần
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
  enableOfflineQueue: false, // Không queue commands nếu disconnected
});

// Xử lý lỗi kết nối Redis (chỉ log một lần)
let redisErrorLogged = false;
redis.on("error", (err) => {
  // Chỉ log lỗi một lần để tránh spam console
  if (err.code === "ECONNREFUSED" && !redisErrorLogged) {
    redisErrorLogged = true;
    console.warn("⚠️  Redis server chưa chạy. OTP sẽ không được lưu cache.");
    console.warn("   Để khởi động Redis: redis-server hoặc docker run -d -p 6379:6379 redis");
  }
});

redis.on("connect", () => {
  console.log("✅ Redis Connected...");
});

export const generateOTP = async (data) => {
  const { email, transactionId } = data;
  const otp = crypto.randomInt(100000, 999999).toString(); // 6 số
  const key = `otp:${email}:${transactionId}`;

  // lưu OTP vào Redis với TTL 5 phút
  try {
    await redis.set(key, otp, "EX", 60 * 5);
  } catch (error) {
    // Nếu Redis không available, vẫn trả về OTP nhưng không lưu cache
    console.warn("⚠️  Không thể lưu OTP vào Redis, OTP vẫn được trả về:", error.message);
  }

  return otp;
};

export const verifyOTP = async (data, otpInput) => {
  const { email, transactionId } = data;
  const key = `otp:${email}:${transactionId}`;
  const attemptsKey = `${key}:attempts`; // key riêng để lưu số lần sai

  try {
    const otpStored = await redis.get(key);

    // OTP hết hạn hoặc không tồn tại
    if (!otpStored) {
      return { success: false, message: "OTP hết hạn hoặc không tồn tại" };
    }

    if (otpStored !== otpInput) {
      // tăng số nhập sai
      const attempts = await redis.incr(attemptsKey);

      // đảm bảo attemptsKey hết hạn cùng lúc với OTP
      const ttl = await redis.ttl(key);
      if (ttl > 0) {
        await redis.expire(attemptsKey, ttl);
      }

      if (attempts >= 3) {
        // xóa OTP luôn để ngăn nhập tiếp
        await redis.del(key);
        await redis.del(attemptsKey);
        return {
          success: false,
          message: "OTP bị khóa do nhập sai quá nhiều lần",
        };
      }

      return {
        success: false,
        message: `OTP không chính xác (sai ${attempts}/3 lần)`,
      };
    }

    // Nếu đúng OTP thì xóa OTP + attempts
    await redis.del(key);
    await redis.del(attemptsKey);

    return { success: true, message: "Xác thực thành công" };
  } catch (error) {
    // Nếu Redis không available, không thể verify OTP
    console.error("❌ Lỗi khi verify OTP với Redis:", error.message);
    return {
      success: false,
      message: "Hệ thống đang bảo trì, vui lòng thử lại sau",
    };
  }
};
