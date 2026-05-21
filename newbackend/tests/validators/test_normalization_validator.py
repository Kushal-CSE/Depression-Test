import math

from app.validators.normalization_validator import (
    validate_normalized_input,
    validate_feature_scaling
)


def test_validate_normalized_input_success():
    valid, error = validate_normalized_input({
        "Age": 0.5,
        "Sleep": -0.2
    })

    assert valid is True
    assert error is None


def test_validate_normalized_input_nan():
    valid, error = validate_normalized_input({
        "Age": math.nan
    })

    assert valid is False
    assert error == (
        "Field 'Age' contains NaN"
    )


def test_validate_normalized_input_infinite():
    valid, error = validate_normalized_input({
        "Age": math.inf
    })

    assert valid is False
    assert error == (
        "Field 'Age' contains infinite value"
    )


def test_validate_feature_scaling_success():
    valid, error = validate_feature_scaling({
        "Age": 1.5,
        "Sleep": -2.0
    })

    assert valid is True
    assert error is None


def test_validate_feature_scaling_out_of_range():
    valid, error = validate_feature_scaling({
        "Age": 100.0
    })

    assert valid is False
    assert error == (
        "Scaled feature 'Age' out of range"
    )


def test_validate_feature_scaling_ignores_strings():
    valid, error = validate_feature_scaling({
        "Name": "Kushal"
    })

    assert valid is True
    assert error is None