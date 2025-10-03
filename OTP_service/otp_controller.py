# controller/otp_controller.py
from otp_service import OTPService
from otp_model import OTPVerifyRequest, OTPGenerate

otp_service = OTPService()

async def generate_otp_controller(req: OTPGenerate):
    code = await otp_service.generate_otp(req.phone, req.transaction_id)
    return {"message": "OTP generated", "code": code}

async def verify_otp_controller(req: OTPVerifyRequest):
    result = await otp_service.verify_otp(req.phone, req.transaction_id, req.code)
    return {"verified": result}
