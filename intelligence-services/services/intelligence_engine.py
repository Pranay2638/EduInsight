from modules.weekly_report import build_weekly_summary
from modules.performance import analyze_performance
from modules.consistency import analyze_consistency
from modules.llm import generate_ai_coach



def analyze(snapshot):

    weekly = build_weekly_summary(snapshot)

    performance = analyze_performance(
        snapshot.subjects
    )

    consistency = analyze_consistency(
        weekly["improvement"]
    )

    coach = generate_ai_coach(snapshot)


    return {

        "weeklyReport": weekly,

        "performance": performance,

        "consistency": consistency,

        "coach" : coach.model_dump()

    }