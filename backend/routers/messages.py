from fastapi import APIRouter, Depends, HTTPException
from pydantic import EmailStr
from typing import Any
from models.message import (
    MessageCheckRequest, MessageCheckResponse, MessageSendRequest, MessageSendResponse, MessageModel
)
from services.supabase_service import ISupabaseService, get_supabase_service
from services.gemini_service import IGeminiService, get_gemini_service

router = APIRouter()

@router.post("/check", response_model=MessageCheckResponse)
def check_messages(
    request: MessageCheckRequest,
    supabase_service: ISupabaseService = Depends(get_supabase_service)
):
    try:
        messages = supabase_service.get_messages_by_email(request.email)
        return MessageCheckResponse(messages=messages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/send", response_model=MessageSendResponse)
def send_message(
    request: MessageSendRequest,
    supabase_service: ISupabaseService = Depends(get_supabase_service),
    gemini_service: IGeminiService = Depends(get_gemini_service)
):
    try:
        user_message = supabase_service.save_message(
            email=request.email,
            content=request.content,
            sender="user",
            phone_number=request.phone_number
        )
        # Gemini service is still async, so we need to run it in an event loop
        import asyncio
        admin_content = asyncio.run(gemini_service.generate_response(request.content))
        admin_message = supabase_service.save_message(
            email=request.email,
            content=admin_content,
            sender="admin"
        )
        return MessageSendResponse(user_message=user_message, admin_response=admin_message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 