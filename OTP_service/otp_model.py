from pydantic import BaseModel
from datetime import datetime

# tạo otp 
class OTPGenerate(BaseModel):
    phone_number: str
    transaction_id:str


# xác thực otp
class OTPVerifyRequest(BaseModel):
    phone_number: str
    otp: str
    transaction_id:str


# lưu otp 
class OTPData(BaseModel):
     code:str
     attempt:int=0
     expire_at:datetime


