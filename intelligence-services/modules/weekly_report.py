def build_weekly_summary(snapshot):

    current = snapshot.weeklyTotals.currentHours
    previous = snapshot.weeklyTotals.previousHours

    if previous == 0:
        improvement = 100
    else:
        improvement = round(
            ((current - previous) / previous) * 100,
            2,
        )

    return {
        "studyHours": current,
        "previousHours": previous,
        "improvement": improvement,
    }