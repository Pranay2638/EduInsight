from pydantic import BaseModel


class CoachResponse(BaseModel):
    title: str
    message: str
    recommendation: str