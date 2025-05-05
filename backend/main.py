from fastapi import FastAPI
from routers import messages
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Jaza Kiti Chat API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins; change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(messages.router, prefix="/messages", tags=["messages"]) 