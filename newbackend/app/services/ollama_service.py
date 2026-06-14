import os
import json
import requests


OLLAMA_BASE_URL = os.getenv(
    "OLLAMA_BASE_URL",
    "http://localhost:11434"
)

OLLAMA_MODEL = os.getenv(
    "OLLAMA_MODEL",
    "phi"
)

OLLAMA_API_URL = (
    f"{OLLAMA_BASE_URL}/api/generate"
)


def generate_recommendation(
    prediction_results,
    user_data
):
    try:

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
- Identify overall severity patterns.
- Provide supportive, non-clinical guidance.
- Be empathetic and actionable.
- Do not diagnose.
- Keep the response to 3-5 sentences.
"""

        response = requests.post(
            OLLAMA_API_URL,
            json={
                "model": OLLAMA_MODEL,
                "prompt": prompt,
                "stream": False,
                "temperature": 0.7
            },
            timeout=30
        )

        if response.status_code == 200:

            result = response.json()

            return result.get(
                "response",
                "Unable to generate recommendation"
            ).strip()

        return (
            f"Error: Unable to generate recommendation "
            f"(Status: {response.status_code})"
        )

    except requests.exceptions.ConnectionError:
        return (
            "⚠️ Ollama service not running. "
            "Please start Ollama first (ollama serve)"
        )

    except requests.exceptions.Timeout:
        return (
            "⚠️ Ollama request timed out. "
            "Try again with a smaller model."
        )

    except Exception as e:
        return (
            f"Error generating recommendation: {str(e)}"
        )