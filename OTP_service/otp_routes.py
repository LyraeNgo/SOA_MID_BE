# routes/otp_routes.py
from fastapi import APIRouter, Depends
from otp_controller import generate_otp_controller, verify_otp_controller
from otp_model import OTPGenerate,OTPVerifyRequest

router = APIRouter()

@router.post("/generate")
async def generate_otp(req: OTPGenerate):
    return await generate_otp_controller(req)

@router.post("/verify")
async def verify_otp(req: OTPVerifyRequest):
    return await verify_otp_controller(req)
