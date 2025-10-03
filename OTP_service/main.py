# main.py
from fastapi import FastAPI
import otp_routes

app = FastAPI(title="OTP Service")

# include router
app.include_router(otp_routes.router, prefix="/otp", tags=["OTP"])
