from pydantic import BaseModel
from typing import Any


class ChatRequest(BaseModel):
    snapshot: dict[str, Any]
    question: str