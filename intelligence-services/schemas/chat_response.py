from pydantic import BaseModel, Field


class ChatResponse(BaseModel):
    answer: str = Field(
        description="Direct answer to the student's question."
    )

    reasoning: str = Field(
        description="Evidence from the learning snapshot supporting the answer."
    )

    recommendation: str = Field(
        description="Practical study advice based on the analysis."
    )