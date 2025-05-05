import pytest
from unittest.mock import AsyncMock, patch
from services.firestore_service import FirestoreService
from models.message import MessageModel
from datetime import datetime

@pytest.mark.asyncio
async def test_get_messages_by_email():
    service = FirestoreService()
    service.collection = AsyncMock()
    service.collection.where.return_value.order_by.return_value.stream.return_value = []
    messages = await service.get_messages_by_email("test@example.com")
    assert messages == []

@pytest.mark.asyncio
async def test_save_message():
    service = FirestoreService()
    service.collection = AsyncMock()
    service.collection.add.return_value = AsyncMock()
    service.collection.add.return_value.get.return_value.to_dict.return_value = {
        "email": "test@example.com",
        "content": "Hello!",
        "sender": "user",
        "phone_number": "1234567890",
        "timestamp": datetime.utcnow()
    }
    message = await service.save_message(
        email="test@example.com",
        content="Hello!",
        sender="user",
        phone_number="1234567890"
    )
    assert message.email == "test@example.com"
    assert message.sender == "user" 