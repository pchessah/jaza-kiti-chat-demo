from typing import Protocol
from google import genai
import os
from config.settings import get_settings

class IGeminiService(Protocol):
    async def generate_response(self, user_message: str) -> str: ...

def get_gemini_service() -> IGeminiService:
    settings = get_settings()
    return GeminiService(api_key=settings.gemini_api_key)

class GeminiService:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)
        self.model = "gemini-2.0-flash"

    async def generate_response(self, user_message: str) -> str:
        response = self.client.models.generate_content(
            model=self.model,
            contents=[user_message]
        )
        return response.text 