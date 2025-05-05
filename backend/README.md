# Jaza Kiti Chat Backend

A FastAPI backend for a chat system that integrates with Google Firestore for message storage and the Gemini API for admin responses. The project is structured according to SOLID principles for maintainability and scalability.

## Features
- Store and retrieve chat messages in Firestore
- Generate admin responses using Gemini API
- Modular, testable, and SOLID-compliant architecture
- Input validation and robust error handling

## Project Structure
```
.
├── main.py
├── routers/
│   └── messages.py
├── services/
│   ├── firestore_service.py
│   └── gemini_service.py
├── models/
│   └── message.py
├── config/
│   └── settings.py
├── dependencies.py
├── requirements.txt
├── README.md
├── tests/
│   ├── test_firestore_service.py
│   └── test_gemini_service.py
```

## SOLID Principles Applied
- **Single Responsibility:** Each module/class has one responsibility (e.g., FirestoreService only handles Firestore logic).
- **Open/Closed:** Services and models are extensible via dependency injection and interfaces.
- **Liskov Substitution:** Service interfaces allow for interchangeable implementations.
- **Interface Segregation:** Specific interfaces for each service.
- **Dependency Inversion:** Dependencies are injected, not hardcoded.

## Setup Instructions

### 1. Clone the repository
```
git clone <repo-url>
cd jaza-kiti-chat-backend
```

### 2. Create and activate a virtual environment
```
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Unix/Mac:
source venv/bin/activate
```

### 3. Install dependencies
```
pip install -r requirements.txt
```

### 4. Environment Variables
Create a `.env` file in the root directory with the following:
```
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account.json
```
- Obtain a Gemini API key from Google AI Studio.
- Download your Firestore service account JSON and set the path above.

### 5. Firestore Setup
- Create a Firestore database in Google Cloud.
- Ensure your service account has read/write access to Firestore.
- Recommended: Create indexes on `email` and `timestamp` for the `messages` collection.

### 6. Running the App
```
uvicorn main:app --reload
```

## API Endpoints

### POST `/messages/check`
**Request:**
```
{
  "email": "user@example.com"
}
```
**Response:**
```
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
```
{
  "email": "user@example.com",
  "phone_number": "1234567890",
  "content": "How does AI work?"
}
```
**Response:**
```
{
  "user_message": { ... },
  "admin_response": { ... }
}
```

## Testing
Run all tests with:
```
pytest
```

## Security
- All sensitive data is managed via environment variables.
- Firestore security rules should restrict access to authorized users (see Google documentation).

## Example Gemini API Integration
```
from google import genai
client = genai.Client(api_key="GEMINI_API_KEY")
response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=["How does AI work?"]
)
print(response.text)
```

## License
MIT 