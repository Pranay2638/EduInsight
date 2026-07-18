from fastapi import APIRouter

from schemas.learning_snapshot import (
    WeeklyReportRequest,
)

from services.intelligence_engine import analyze
from schemas.chat_request import ChatRequest
from modules.llm import ask_eduinsight

router = APIRouter()


@router.post("/analyze")
def analyze_learning(
    snapshot: WeeklyReportRequest,
):

    result = analyze(snapshot)

    return {

        "success": True,

        "data": result,

    }

@router.post("/chat")
def chat_with_ai(request: ChatRequest):

    response = ask_eduinsight(
        request.snapshot,
        request.question
    )

    return response