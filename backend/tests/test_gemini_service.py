import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from services.gemini_service import GeminiService

@pytest.mark.asyncio
async def test_generate_response():
    mock_client = MagicMock()
    mock_client.models.generate_content.return_value.text = "AI is intelligence demonstrated by machines."
    service = GeminiService(api_key="fake-key")
    service.client = mock_client
    response = await service.generate_response("How does AI work?")
    assert response == "AI is intelligence demonstrated by machines." 