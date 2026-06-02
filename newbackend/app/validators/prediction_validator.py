# app/validators/prediction_validator.py

from typing import Any

<<<<<<< HEAD
=======
from app.constants.model_features import (
    ALL_FEATURES
)

from app.constants.model_ranges import (
    ALL_FEATURE_RANGES
)

>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
from app.validators.type_validator import (
    validate_numeric_fields
)

from app.validators.range_validator import (
    validate_feature_ranges
)

<<<<<<< HEAD
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
=======

NUMERIC_FIELDS = ALL_FEATURES


def validate_prediction_input(
    data: dict[str, Any]
) -> list[str]:
    """
    Main prediction validation pipeline.

    Validates:
    1. JSON object
    2. Required features
    3. Unknown features
    4. Numeric values
    5. Feature ranges
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
    """

    if not isinstance(data, dict):
        return [
            "Prediction payload must be a JSON object."
        ]

    errors = []

<<<<<<< HEAD
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

=======
    errors.extend(
        validate_required_features(
            data=data,
            required_features=ALL_FEATURES
        )
    )

    errors.extend(
        validate_unknown_features(
            data=data,
            allowed_features=ALL_FEATURES
        )
    )

    errors.extend(
        validate_numeric_fields(
            data=data,
            numeric_fields=NUMERIC_FIELDS
        )
    )

    errors.extend(
        validate_feature_ranges(
            data=data,
            feature_ranges=ALL_FEATURE_RANGES
        )
    )

>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
    return errors


def validate_required_features(
    data: dict[str, Any],
<<<<<<< HEAD
    required_features: list[str] | None = None
) -> list[str]:
    """
    Ensure required ML features exist.
=======
    required_features: list[str]
) -> list[str]:
    """
    Ensure all required features exist.
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
    """

    if not isinstance(data, dict):
        return [
            "Prediction payload must be a JSON object."
        ]

<<<<<<< HEAD
    required_features = (
        required_features
        or BASE_REQUIRED_FEATURES
    )

=======
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
    errors = []

    for feature in required_features:

        if feature not in data:

            errors.append(
                f"Missing required feature: {feature}"
            )

<<<<<<< HEAD
=======
    return errors


def validate_unknown_features(
    data: dict[str, Any],
    allowed_features: list[str]
) -> list[str]:
    """
    Reject unexpected fields.
    """

    allowed = set(allowed_features)

    errors = []

    for feature in data.keys():

        if feature not in allowed:

            errors.append(
                f"Unknown feature: {feature}"
            )

>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
    return errors