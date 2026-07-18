from pydantic import BaseModel
from typing import List


class SubjectData(BaseModel):
    name: str
    studyHours: float
    averageScore: float
    quizCount: int


class WeeklyTotals(BaseModel):
    currentHours: float
    previousHours: float


class WeeklyReportRequest(BaseModel):
    subjects: List[SubjectData]
    weeklyTotals: WeeklyTotals