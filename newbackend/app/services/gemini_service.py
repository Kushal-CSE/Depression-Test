import os
import json

from google import genai


GEMINI_MODEL = os.getenv(
    "GEMINI_MODEL",
    "gemini-2.0-flash"
)

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_recommendation(
    prediction_results,
    user_data
):
    prompt = f"""
You are a mental health support assistant.

Assessment Results:

PHQ9:
- Score: {prediction_results['phq9']['score']}
- Confidence: {prediction_results['phq9']['confidence']}%

BDI:
- Score: {prediction_results['bdi']['score']}
- Confidence: {prediction_results['bdi']['confidence']}%

CESD:
- Score: {prediction_results['cesd']['score']}
- Confidence: {prediction_results['cesd']['confidence']}%

User Responses:
{json.dumps(user_data, indent=2)}

Instructions:
- Analyze all assessment results together.
- Identify overall patterns and severity.
- Provide supportive, practical, non-clinical advice.
- Do not diagnose.
- Be empathetic and actionable.
- Keep the response concise (3-5 sentences).
"""

    print("Gemini is generating recommendation...")

    try:

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt
        )

        print("Gemini recommendation generated.")

        return response.text.strip()

    except Exception as e:

        print("\nGemini Error:", e)

        return (
            "Unable to generate recommendation "
            "at the moment."
        )