import pandas as pd
import pytest

from ml.preprocessing.normalizer import (
    normalize_features,
    scale_features
)

from fixtures.prediction_payloads import (
    HIGH_RISK_PREDICTION_PAYLOAD,
    LOW_RISK_PREDICTION_PAYLOAD,
    VALID_PREDICTION_PAYLOAD
)


# ---------------------------------
# Helpers
# ---------------------------------

def build_dataframe(payload):

    return pd.DataFrame([payload])


# ---------------------------------
# normalize_features
# ---------------------------------

def test_normalize_features_returns_dataframe():

    dataframe = build_dataframe(
        VALID_PREDICTION_PAYLOAD
    )

    normalized, scaler = normalize_features(
        dataframe
    )

    assert isinstance(
        normalized,
        pd.DataFrame
    )


def test_normalize_features_preserves_columns():

    dataframe = build_dataframe(
        VALID_PREDICTION_PAYLOAD
    )

    normalized, scaler = normalize_features(
        dataframe
    )

    assert set(normalized.columns) == set(
        dataframe.columns
    )


def test_normalize_features_returns_numeric_values():

    dataframe = build_dataframe(
        VALID_PREDICTION_PAYLOAD
    )

    normalized, scaler = normalize_features(
        dataframe
    )

    for value in normalized.iloc[0]:

        assert isinstance(
            value,
            (int, float)
        )


def test_normalize_features_low_risk_payload():

    dataframe = build_dataframe(
        LOW_RISK_PREDICTION_PAYLOAD
    )

    normalized, scaler = normalize_features(
        dataframe
    )

    assert (
        normalized.iloc[0]["Melancholic"]
        >= 0
    )


def test_normalize_features_high_risk_payload():

    dataframe = build_dataframe(
        HIGH_RISK_PREDICTION_PAYLOAD
    )

    normalized, scaler = normalize_features(
        dataframe
    )

    assert (
        normalized.iloc[0][
            "Future_Hopelessness"
        ] >= 0
    )


def test_normalize_features_invalid_input():

    with pytest.raises(
        (TypeError, AttributeError)
    ):

        normalize_features(None)


# ---------------------------------
# scale_features
# ---------------------------------

def test_scale_features_returns_dataframe():

    dataframe = build_dataframe(
        VALID_PREDICTION_PAYLOAD
    )

    normalized, scaler = normalize_features(
        dataframe
    )

    scaled = scale_features(
        dataframe,
        scaler
    )

    assert isinstance(
        scaled,
        pd.DataFrame
    )


def test_scale_features_preserves_columns():

    dataframe = build_dataframe(
        VALID_PREDICTION_PAYLOAD
    )

    normalized, scaler = normalize_features(
        dataframe
    )

    scaled = scale_features(
        dataframe,
        scaler
    )

    assert set(scaled.columns) == set(
        dataframe.columns
    )


def test_scale_features_returns_numeric_values():

    dataframe = build_dataframe(
        VALID_PREDICTION_PAYLOAD
    )

    normalized, scaler = normalize_features(
        dataframe
    )

    scaled = scale_features(
        dataframe,
        scaler
    )

    for value in scaled.iloc[0]:

        assert isinstance(
            value,
            (int, float)
        )


def test_scale_features_empty_dataframe():

    dataframe = pd.DataFrame()

    with pytest.raises(
        (ValueError, TypeError)
    ):

        scale_features(
            dataframe,
            None
        )