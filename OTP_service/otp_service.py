import json
import redis.asyncio as redis
from otp_model import OTPData
from dotenv import load_dotenv
import os

load_dotenv()


class OTPService:
    def __init__(self, redis_url=os.getenv("REDIS_PORT")):
        self.redis = redis.from_url(redis_url, decode_responses=True)

    def _make_key(self, phone_number: str, transaction_id: str) -> str:
        return f"otp:{phone_number}:{transaction_id}"

    async def generate_otp(self, phone_number: str, transaction_id: str, ttl: int = 300) -> str:
        import random
        code = str(random.randint(100000, 999999))
        otp_data = OTPData(code=code, attempt=0, expires_in=ttl)
        key = self._make_key(phone_number, transaction_id)
        await self.redis.setex(key, ttl, otp_data.model_dump())
        return code

    async def verify_otp(self, phone_number: str, transaction_id: str, code: str, max_attempts: int = 3) -> bool:
        key = self._make_key(phone_number, transaction_id)
        data = await self.redis.get(key)
        if not data:
            return False  # hết hạn hoặc không tồn tại

        otp_data = OTPData.parse_raw(data)

        if otp_data.attempt >= max_attempts:
            return False

        if otp_data.code == code:
            await self.redis.delete(key)
            return True

        # sai code → tăng attempt
        otp_data.attempt += 1
        await self.redis.setex(key, otp_data.expires_in, otp_data.json())
        return False
