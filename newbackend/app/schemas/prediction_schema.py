# app/schemas/prediction_schema.py

from typing import Any, Mapping, Sequence


def serialize_model_output(
    prediction: int,
    confidence: float,
    model_name: str
) -> dict:
    """
    Serialize individual model prediction output.
    """

    return {
        "model": model_name,
        "prediction": int(prediction),
        "confidence": round(
            float(confidence),
            4
        )
    }


def serialize_prediction_response(
    prediction: int,
    confidence_score: float,
    severity: str,
    recommendation: str | None = None,
    agreement_strength: str | None = None,
    model_results: (
        Sequence[Mapping[str, Any]]
        | Mapping[str, Any]
        | None
    ) = None,
    **extra_fields: Any
) -> dict:
    """
    Serialize final prediction API response.
    """

    response = {
        "prediction": int(prediction),
        "confidence_score": round(
            float(confidence_score),
            4
        ),
        "severity": severity
    }

    if recommendation is not None:
        response["recommendation"] = recommendation

    # Ensemble metadata support.
    if agreement_strength is not None:
        response[
            "agreement_strength"
        ] = agreement_strength

    if model_results is not None:
        response["model_results"] = model_results

    # Preserve forward compatibility for
    # additional ensemble/inference metadata.
    if extra_fields:
        response.update(extra_fields)

    return response