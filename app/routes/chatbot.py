from fastapi import APIRouter, HTTPException
from ..models.schemas import ChatbotRequest, ChatbotResponse
from ..services.gemini_service import get_chatbot_service

router = APIRouter(tags=["Chatbot API"])


@router.post("/api/chatbot", response_model=ChatbotResponse)
@router.post("/api/chat", response_model=ChatbotResponse)
@router.post("/api/manakbot/chat", response_model=ChatbotResponse)
async def ask_chatbot(req: ChatbotRequest):
    try:
        service = get_chatbot_service()
        query_text = req.get_query()
        result = await service.answer_question(query_text, req.history)
        return ChatbotResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ManakBot query error: {str(e)}")
