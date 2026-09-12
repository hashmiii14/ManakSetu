from fastapi import APIRouter, HTTPException
from ..models.schemas import ChatbotRequest, ChatbotResponse
from ..services.chatbot import get_chatbot_service

router = APIRouter(prefix="/api/chatbot", tags=["Chatbot"])


@router.post("", response_model=ChatbotResponse)
async def ask_chatbot(req: ChatbotRequest):
    try:
        service = get_chatbot_service()
        result = await service.answer_question(req.message, req.history)
        return ChatbotResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ManakBot error: {str(e)}")
