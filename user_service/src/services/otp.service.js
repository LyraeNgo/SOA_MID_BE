import Redis from "ioredis";
import crypto from "crypto";

const redis = new Redis(); // mặc định localhost:6379

export const generateOTP = async (data) => {
  const { email, transactionId } = data;
  const otp = crypto.randomInt(100000, 999999).toString(); // 6 số
  const key = `otp:${email && transactionId}`;

  // lưu OTP vào Redis với TTL 5 phút
  await redis.set(key, otp, "EX", 60 * 5);

  return otp;
};

export const verifyOTP = async (data, otpInput) => {
  const { email, transactionId } = data;
  const key = `otp:${email}:${transactionId}`;
  const attemptsKey = `${key}:attempts`; // key riêng để lưu số lần sai

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
};
