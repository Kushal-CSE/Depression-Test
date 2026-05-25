import os
from google import genai

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_recommendation(prediction, confidence, data):

    risk_level = "high" if prediction != 0 else "low"

    prompt = f"""
You are a mental health support assistant.

User mental health prediction:
- Risk Level: {risk_level}
- Confidence Score: {confidence:.2f}

User data:
{data}

Provide practical, supportive, non-clinical advice.
Keep it concise (5–7 lines).
Avoid diagnosis.
Be actionable and empathetic.
"""
    print("Gemini is generating recommendation...")
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )
        print("Gemini recommendation generated.")
        return response.text.strip()
    except Exception as e:
        print("\n\nGemini Error:", e)
        return "Unable to generate recommendation at the moment."
    
    
