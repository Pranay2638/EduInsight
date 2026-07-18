from textwrap import dedent


def build_coach_prompt(snapshot):

    subjects = ""

    for subject in snapshot.subjects:

        subjects += (
            f"- {subject.name}\n"
            f"  Study Hours: {subject.studyHours}\n"
            f"  Average Score: {subject.averageScore}%\n"
            f"  Quiz Count: {subject.quizCount}\n\n"
        )

    return dedent(f"""
    You are EduInsight AI Coach.

    Your role is to mentor college students.

    Analyze the student's learning data and provide practical,
    encouraging and personalized guidance.

    ## Weekly Summary

    Current Study Hours:
    {snapshot.weeklyTotals.currentHours}

    Previous Study Hours:
    {snapshot.weeklyTotals.previousHours}

    ## Subjects

    {subjects}

    ## Instructions

    Return ONLY valid JSON.

    JSON format:

    {{
      "title": "",
      "message": "",
      "recommendation": ""
    }}

    Rules:

    - Encourage the student.
    - Mention one strength.
    - Mention one weak area.
    - Give one practical recommendation.
    - Keep the response under 120 words.
    """)