# Jaza Kiti Chat Backend

A robust FastAPI backend for the Jaza Kiti Chat system, featuring modular architecture, SOLID principles, and integration with Supabase for message storage and Gemini API for AI-powered admin responses.

## Features
- **Supabase Storage:** Stores and retrieves chat messages using Supabase.
- **Gemini AI Integration:** Generates admin responses using Google Gemini API.
- **Input Validation:** Pydantic models for request/response validation.
- **Error Handling:** Robust error management for all endpoints.
- **CORS Support:** Configured for frontend integration.

## Project Structure
```
backend/
  main.py                  # FastAPI app entry point
  routers/
    messages.py            # Message-related API endpoints
  services/
    supabase_service.py    # Supabase message storage logic
    gemini_service.py      # Gemini AI response logic
  models/
    message.py             # Pydantic models for chat
  config/
    settings.py            # Environment/config management
  dependencies.py          # Dependency injection
  requirements.txt         # Python dependencies
  tests/
    test_firestore_service.py
    test_gemini_service.py
  README.md
```

## How to Run
1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
2. **Set up environment variables:**
   - Create a `.env` file in `backend/` with:
     ```
     GEMINI_API_KEY=your_gemini_api_key
     SUPABASE_URL=your_supabase_url
     SUPABASE_KEY=your_supabase_key
     ```
   - Obtain a Gemini API key from Google AI Studio.
   - Get your Supabase project URL and service key from the Supabase dashboard.

3. **Run the development server:**
   ```bash
   uvicorn main:app --reload
   ```
4. **API available at:** [http://127.0.0.1:8000](http://127.0.0.1:8000)

## API Endpoints

### POST `/messages/check`
**Request:**
```json
{
  "email": "user@example.com"
}
```
**Response:**
```json
{
  "messages": [
    {
      "email": "user@example.com",
      "content": "Hi!",
      "sender": "user",
      "phone_number": "1234567890",
      "timestamp": "2024-06-01T12:00:00Z"
    },
    ...
  ]
}
```

### POST `/messages/send`
**Request:**
```json
{
  "email": "user@example.com",
  "phone_number": "1234567890",
  "content": "How does AI work?"
}
```
**Response:**
```json
{
  "user_message": { ... },
  "admin_response": { ... }
}
```

## Usage
- The backend expects requests from the frontend at `http://127.0.0.1:3000` by default.
- Handles user and admin messages, storing all chat history in Supabase.
- Admin responses are generated in real-time using Gemini AI.

## Testing
Run all tests with:
```bash
pytest
```

## Configuration
- All sensitive data is managed via environment variables in `.env`.
- See `config/settings.py` for details on configuration loading.

## Dependencies
- fastapi
- uvicorn
- google-genai
- pydantic
- pydantic-settings
- python-dotenv
- pytest
- httpx
- email-validator
- supabase

## Example Gemini API Integration
```python
from google import genai
client = genai.Client(api_key="GEMINI_API_KEY")
response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=["How does AI work?"]
)
print(response.text)
``` 