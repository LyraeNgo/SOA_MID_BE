from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI(title="user service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[""],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.get("/api/users")
async def getusers():
     return None

