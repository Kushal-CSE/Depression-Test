from app.validators.prediction_validator import (
    validate_prediction_input,
    validate_required_features
)

from tests.fixtures.feature_rules import (
    COMMON_FEATURE_RANGES
)


VALID_PAYLOAD = {
    "Gender": 1,
    "Age": 22,
    "Academic Status": 2,
    "Social Economic Status": 3,
    "Sleep_Duration": 7,
    "Social_Media_Hours": 4
}


def test_validate_required_features_success():
    valid, error = validate_required_features(
        data=VALID_PAYLOAD,
        required_features=[
            "Gender",
            "Age"
        ]
    )

    assert valid is True
    assert error is None


def test_validate_required_features_missing():
    valid, error = validate_required_features(
        data={},
        required_features=[
            "Gender",
            "Age"
        ]
    )

    assert valid is False
    assert error == (
        "Missing required features: "
        "Gender, Age"
    )


def test_validate_prediction_input_success():
    valid, error = validate_prediction_input(
        VALID_PAYLOAD
    )

    assert valid is True
    assert error is None


def test_validate_prediction_input_missing_feature():
    payload = VALID_PAYLOAD.copy()

    del payload["Gender"]

    valid, error = validate_prediction_input(
        payload
    )

    assert valid is False
    assert "Missing required features" in error


def test_validate_prediction_input_invalid_numeric_type():
    payload = VALID_PAYLOAD.copy()

    payload["Age"] = "twenty"

    valid, error = validate_prediction_input(
        payload
    )

    assert valid is False


def test_validate_prediction_input_invalid_range():
    payload = VALID_PAYLOAD.copy()

    payload["Age"] = 100

    valid, error = validate_prediction_input(
        payload
    )

    assert valid is False