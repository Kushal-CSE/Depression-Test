from app.validators.range_validator import (
    validate_feature_ranges,
    validate_score_limits
)


def test_validate_feature_ranges_success():
    valid, error = validate_feature_ranges(
        {
            "Age": 25,
            "Gender": 1
        },
        {
            "Age": {
                "min": 18,
                "max": 30
            },
            "Gender": [0, 1]
        }
    )

    assert valid is True
    assert error is None


def test_validate_feature_ranges_enum_failure():
    valid, error = validate_feature_ranges(
        {
            "Gender": 5
        },
        {
            "Gender": [0, 1]
        }
    )

    assert valid is False
    assert error == (
        "Field 'Gender' must be one of [0, 1]"
    )


def test_validate_feature_ranges_min_failure():
    valid, error = validate_feature_ranges(
        {
            "Age": 10
        },
        {
            "Age": {
                "min": 18,
                "max": 30
            }
        }
    )

    assert valid is False
    assert error == (
        "Field 'Age' must be >= 18"
    )


def test_validate_feature_ranges_max_failure():
    valid, error = validate_feature_ranges(
        {
            "Age": 50
        },
        {
            "Age": {
                "min": 18,
                "max": 30
            }
        }
    )

    assert valid is False
    assert error == (
        "Field 'Age' must be <= 30"
    )


def test_validate_feature_ranges_invalid_rules():
    valid, error = validate_feature_ranges(
        {
            "Age": 25
        },
        {
            "Age": "invalid"
        }
    )

    assert valid is False
    assert error == (
        "Invalid validation rule configuration "
        "for field 'Age'"
    )


def test_validate_score_limits_success():
    valid, error = validate_score_limits(
        0.85
    )

    assert valid is True
    assert error is None


def test_validate_score_limits_failure():
    valid, error = validate_score_limits(
        5.0
    )

    assert valid is False
    assert error == (
        "Score must be between 0.0 and 1.0"
    )