import json
import os
import traceback
from dotenv import load_dotenv
from google import genai
from google.genai import types

from prompts.coach_prompt import build_coach_prompt
from schemas.coach_response import CoachResponse
from prompts.chat_prompt import build_chat_prompt
from schemas.chat_response import ChatResponse

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)
print("Gemini key exists:", bool(os.getenv("GEMINI_API_KEY")))
print("Model:", os.getenv("GEMINI_MODEL"))


def generate_ai_coach(snapshot):

    try:

        prompt = build_coach_prompt(snapshot)

        response = client.models.generate_content(

            model="gemini-3.1-flash-lite",

            contents=prompt,

            config=types.GenerateContentConfig(

                response_mime_type="application/json",

                response_schema=CoachResponse,

                temperature=0.4,

            ),

        )

        return response.parsed

    except Exception as e:

        print(e)

        return CoachResponse(

            title="AI Coach",

            message="Unable to generate insights right now.",

            recommendation="Please try again later."

        )
    
def ask_eduinsight(snapshot, question):

    try:

        prompt = build_chat_prompt(
            snapshot,
            question
        )

        response = client.models.generate_content(

            model=os.getenv(
                "gemini-3.1-flash-lite"
            ),

            contents=prompt,

            config=types.GenerateContentConfig(

                response_mime_type="application/json",

                response_schema=ChatResponse,

                temperature=0.5,

            ),

        )

        return response.parsed

    except Exception as e:

        traceback.print_exc()

        return ChatResponse(

        answer="I'm sorry, I couldn't answer your question right now.",
        reasoning="An internal error occurred while generating the response.",
        recommendation="Please try again in a moment."

        )