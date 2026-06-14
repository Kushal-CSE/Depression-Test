from flask import current_app

from app.services.gemini_service import (
    generate_recommendation as generate_gemini_recommendation
)

from app.services.ollama_service import (
    generate_recommendation as generate_ollama_recommendation
)

PROVIDERS = {
    "gemini": generate_gemini_recommendation,
    "ollama": generate_ollama_recommendation,
}


def generate_recommendation(
    prediction_results,
    user_data
):
    provider = current_app.config.get(
        "RECOMMENDATION_PROVIDER",
        "ollama"
    ).lower()

    generator = PROVIDERS.get(provider)

    if generator is None:
        raise ValueError(
            f"Unsupported recommendation provider: {provider}"
        )

    return generator(
        prediction_results=prediction_results,
        user_data=user_data
    )