from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class MessageModel(BaseModel):
    email: EmailStr
    content: str
    sender: str
    phone_number: Optional[str] = None
    timestamp: datetime

class MessageCheckRequest(BaseModel):
    email: EmailStr

class MessageCheckResponse(BaseModel):
    messages: List[MessageModel] = Field(default_factory=list)

class MessageSendRequest(BaseModel):
    email: EmailStr
    content: str
    phone_number: Optional[str] = None

class MessageSendResponse(BaseModel):
    user_message: MessageModel
    admin_response: MessageModel 