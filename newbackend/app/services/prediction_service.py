from typing import Any

from app.repositories.prediction_repository import (
    save_prediction,
    get_prediction_history
)

from app.schemas.history_schema import (
    serialize_prediction_history
)

from app.schemas.prediction_schema import (
    serialize_prediction_response
)

from app.services.logging_service import (
    log_prediction
)

from app.validators.prediction_validator import (
    validate_prediction_input
)

from ml.inference.ensemble_predictor import (
    generate_ensemble_output
)

from ml.preprocessing.feature_mapper import (
    map_features
)

from ml.preprocessing.normalizer import (
    normalize_features
)


DEFAULT_FEATURE_SET = "x3"
DEFAULT_TEST_TYPE = "phq9"

ALLOWED_MODEL_TYPES = {
    "svm",
    "logistic_regression",
    "random_forest"
}

DEFAULT_MODEL_TYPES = [
    "svm",
    "logistic_regression",
    "random_forest"
]


def generate_prediction(
    input_data: dict,
    user_id: str | None = None,
    persist_history: bool = False
) -> dict[str, Any]:
    """
    Main prediction pipeline.
    """

    input_data = input_data or {}

    validation_errors = validate_prediction_input(
        input_data
    )

    if validation_errors:
        return {
            "success": False,
            "message": "Prediction validation failed",
            "errors": validation_errors
        }

    feature_set = input_data.get(
        "feature_set",
        DEFAULT_FEATURE_SET
    )

    test_type = input_data.get(
        "test_type",
        DEFAULT_TEST_TYPE
    )

    model_types = input_data.get(
        "model_types",
        DEFAULT_MODEL_TYPES
    )

    if not isinstance(model_types, list):
        return {
            "success": False,
            "message": "model_types must be a list"
        }

    invalid_models = [
        model
        for model in model_types
        if model not in ALLOWED_MODEL_TYPES
    ]

    if invalid_models:
        return {
            "success": False,
            "message": "Invalid model types",
            "errors": invalid_models
        }

    feature_input = {
        key: value
        for key, value in input_data.items()
        if key not in {
            "feature_set",
            "test_type",
            "model_types"
        }
    }

    try:
        mapped_features = map_features(
            feature_input
        )

        normalized_features = normalize_features(
            mapped_features
        )

        if isinstance(normalized_features, tuple):
            normalized_features = normalized_features[0]

        inference_input = (
            normalized_features.iloc[0].to_dict()
        )

        ensemble_output = generate_ensemble_output(
            input_data=inference_input,
            feature_set=feature_set,
            test_type=test_type,
            model_types=model_types
        )

    except Exception as error:
        return {
            "success": False,
            "message": "Prediction failed",
            "errors": [str(error)]
        }

    model_results = ensemble_output.get(
        "individual_models",
        []
    )

    ensemble_result = ensemble_output.get(
        "ensemble_result",
        {}
    )

    prediction_response = build_prediction_response(
        prediction=ensemble_result.get(
            "prediction",
            0
        ),
        severity=ensemble_result.get(
            "severity",
            "unknown"
        ),
        confidence_score=ensemble_result.get(
            "average_confidence",
            0.0
        ),
        agreement_strength=ensemble_result.get(
            "agreement_strength",
            "unknown"
        ),
        model_results=model_results
    )

    if persist_history and user_id:
        try:
            save_prediction_history(
                user_id=user_id,
                input_data=input_data,
                prediction_response=prediction_response
            )
        except Exception:
            pass

    return {
        "success": True,
        "message": "Prediction generated successfully",
        "data": prediction_response
    }


def build_prediction_response(
    prediction: int,
    severity: str,
    confidence_score: float,
    agreement_strength: str,
    model_results: list
) -> dict[str, Any]:
    """
    Standardized prediction response.
    """

    return serialize_prediction_response(
        prediction=prediction,
        severity=severity,
        confidence_score=confidence_score,
        agreement_strength=agreement_strength,
        model_results=model_results
    )


def save_prediction_history(
    user_id: str,
    input_data: dict,
    prediction_response: dict
) -> str:
    """
    Save prediction history.
    """

    saved_prediction = save_prediction({
        "user_id": user_id,
        "input_data": input_data,
        "prediction_data": prediction_response
    })

    prediction_id = saved_prediction.get("id")

    log_prediction(
        user_id=user_id,
        prediction_data=prediction_response,
        prediction_id=prediction_id
    )

    return prediction_id


def get_user_prediction_history(
    user_id: str
) -> list[dict[str, Any]]:
    """
    Get user prediction history.
    """

    history_records = get_prediction_history(
        user_id
    )

    return serialize_prediction_history(
        history_records
    )