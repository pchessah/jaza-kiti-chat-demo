from typing import List, Optional, Protocol
from models.message import MessageModel
from datetime import datetime
from supabase import create_client, Client
from config.settings import get_settings

class ISupabaseService(Protocol):
    def get_messages_by_email(self, email: str) -> List[MessageModel]: ...
    def save_message(self, email: str, content: str, sender: str, phone_number: Optional[str] = None) -> MessageModel: ...

def get_supabase_service() -> ISupabaseService:
    return SupabaseService()

class SupabaseService:
    def __init__(self):
        settings = get_settings()
        self.client: Client = create_client(settings.supabase_url, settings.supabase_key)
        self.table = "messages"

    def get_messages_by_email(self, email: str) -> List[MessageModel]:
        response = self.client.table(self.table).select("*").eq("email", email).order("timestamp").execute()
        messages = []
        for data in response.data:
            messages.append(MessageModel(
                email=data["email"],
                content=data["content"],
                sender=data["sender"],
                phone_number=data.get("phone_number"),
                timestamp=datetime.fromisoformat(data["timestamp"]) if data.get("timestamp") else datetime.utcnow()
            ))
        return messages

    def save_message(self, email: str, content: str, sender: str, phone_number: Optional[str] = None) -> MessageModel:
        doc_data = {
            "email": email,
            "content": content,
            "sender": sender,
            "timestamp": datetime.utcnow().isoformat()
        }
        if phone_number:
            doc_data["phone_number"] = phone_number
        response = self.client.table(self.table).insert(doc_data).execute()
        data = response.data[0]
        return MessageModel(
            email=data["email"],
            content=data["content"],
            sender=data["sender"],
            phone_number=data.get("phone_number"),
            timestamp=datetime.fromisoformat(data["timestamp"]) if data.get("timestamp") else datetime.utcnow()
        ) 