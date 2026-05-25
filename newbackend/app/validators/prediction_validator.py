# app/validators/prediction_validator.py

from typing import Any

from app.validators.type_validator import (
    validate_numeric_fields
)

from app.validators.range_validator import (
    validate_feature_ranges
)

from ml.inference.model_loader import (
    get_feature_order
)


# Minimum API-required features.
BASE_REQUIRED_FEATURES = [
    "Age",
    "Sleep_Duration",
    "Social_Media_Hours",
    "Financial_Pressure"
]


FEATURE_RANGES = {
    "Age": (10, 100),
    "Sleep_Duration": (0, 24),
    "Social_Media_Hours": (0, 24),
    "Financial_Pressure": (0, 10)
}


NUMERIC_FIELDS = [
    "Age",
    "Sleep_Duration",
    "Social_Media_Hours",
    "Financial_Pressure"
]


def _resolve_required_features(
    feature_set: str | None = None,
    test_type: str | None = None
) -> list[str]:
    """
    Resolve required ML features dynamically from
    loaded feature-order artifacts.

    Falls back to BASE_REQUIRED_FEATURES when
    model metadata is unavailable.
    """

    if not feature_set or not test_type:
        return BASE_REQUIRED_FEATURES

    try:

        feature_order = get_feature_order(
            feature_set=feature_set,
            test_type=test_type
        )

        if (
            isinstance(feature_order, list)
            and feature_order
        ):
            return feature_order

    except Exception:
        # Defensive fallback:
        # validation must not crash because
        # ML artifacts failed to load.
        pass

    return BASE_REQUIRED_FEATURES


def validate_prediction_input(
    data: dict[str, Any],
    feature_set: str | None = None,
    test_type: str | None = None
) -> list[str]:
    """
    Main prediction validation pipeline.
    """

    if not isinstance(data, dict):
        return [
            "Prediction payload must be a JSON object."
        ]

    errors = []

    required_features = _resolve_required_features(
        feature_set=feature_set,
        test_type=test_type
    )

    required_errors = validate_required_features(
        data=data,
        required_features=required_features
    )

    if required_errors:
        errors.extend(required_errors)

    numeric_errors = validate_numeric_fields(
        data=data,
        numeric_fields=NUMERIC_FIELDS
    )

    if numeric_errors:
        errors.extend(numeric_errors)

    range_errors = validate_feature_ranges(
        data=data,
        feature_ranges=FEATURE_RANGES
    )

    if range_errors:
        errors.extend(range_errors)

    return errors


def validate_required_features(
    data: dict[str, Any],
    required_features: list[str] | None = None
) -> list[str]:
    """
    Ensure required ML features exist.
    """

    if not isinstance(data, dict):
        return [
            "Prediction payload must be a JSON object."
        ]

    required_features = (
        required_features
        or BASE_REQUIRED_FEATURES
    )

    errors = []

    for feature in required_features:

        if feature not in data:

            errors.append(
                f"Missing required feature: {feature}"
            )

    return errors