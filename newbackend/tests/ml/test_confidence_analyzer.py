import pytest

from ml.inference.confidence_analyzer import (
    calculate_agreement_strength,
    calculate_confidence
)


# -------------------------
# Confidence Tests
# -------------------------

def test_calculate_confidence_average():

    confidence = calculate_confidence(
        [0.90, 0.80, 1.00]
    )

    assert confidence == 0.90


def test_calculate_confidence_single_value():

    confidence = calculate_confidence(
        [0.97]
    )

    assert confidence == 0.97


def test_calculate_confidence_zero_values():

    confidence = calculate_confidence(
        [0.0, 0.0, 0.0]
    )

    assert confidence == 0.0


def test_calculate_confidence_returns_float():

    confidence = calculate_confidence(
        [0.91, 0.88, 0.95]
    )

    assert isinstance(confidence, float)


def test_calculate_confidence_empty_input():

    with pytest.raises(ValueError):
        calculate_confidence([])


# -------------------------
# Agreement Strength Tests
# -------------------------

def test_agreement_strength_strong():

    agreement = calculate_agreement_strength(
        [1, 1, 1]
    )

    assert agreement.lower() in [
        "strong",
        "strong agreement",
        "high",
        "high agreement"
    ]


def test_agreement_strength_partial():

    agreement = calculate_agreement_strength(
        [1, 1, 0]
    )

    assert agreement.lower() in [
        "moderate",
        "moderate agreement",
        "partial",
        "partial agreement"
    ]


def test_agreement_strength_low():

    agreement = calculate_agreement_strength(
        [1, 0, 1, 0]
    )

    assert agreement.lower() in [
        "low",
        "low agreement",
        "weak",
        "weak agreement"
    ]


def test_agreement_strength_single_prediction():

    agreement = calculate_agreement_strength(
        [1]
    )

    assert isinstance(agreement, str)


def test_agreement_strength_empty_input():

    with pytest.raises(ValueError):
        calculate_agreement_strength([])