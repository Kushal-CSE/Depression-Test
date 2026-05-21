import pandas as pd
import pytest

from ml.preprocessing.feature_selector import (
    select_x1_features,
    select_x3_features
)

from fixtures.prediction_payloads import (
    VALID_PREDICTION_PAYLOAD
)


X1_FEATURES = [
    "Melancholic",
    "Future_Hopelessness",
    "Interest_Loss",
    "Feeling_Down",
    "Fatigue_Frequency"
]


X3_FEATURES = [
    "Gender",
    "Age",
    "Financial_Pressure",
    "Sleep_Duration",
    "Social_Media_Hours",
    "Melancholic",
    "Feeling_Down"
]


# ---------------------------------
# Helpers
# ---------------------------------

def build_dataframe():

    return pd.DataFrame(
        [VALID_PREDICTION_PAYLOAD]
    )


# ---------------------------------
# select_x1_features
# ---------------------------------

def test_select_x1_features_returns_dataframe():

    dataframe = build_dataframe()

    selected = select_x1_features(
        dataframe
    )

    assert isinstance(
        selected,
        pd.DataFrame
    )


def test_select_x1_features_contains_expected_columns():

    dataframe = build_dataframe()

    selected = select_x1_features(
        dataframe
    )

    for feature in X1_FEATURES:

        assert feature in selected.columns


def test_select_x1_features_excludes_unrelated_columns():

    dataframe = build_dataframe()

    selected = select_x1_features(
        dataframe
    )

    assert "Gender" not in selected.columns


def test_select_x1_features_returns_subset():

    dataframe = build_dataframe()

    selected = select_x1_features(
        dataframe
    )

    assert (
        len(selected.columns)
        < len(dataframe.columns)
    )


def test_select_x1_features_missing_column():

    dataframe = build_dataframe().drop(
        columns=["Melancholic"]
    )

    with pytest.raises(KeyError):

        select_x1_features(
            dataframe
        )


# ---------------------------------
# select_x3_features
# ---------------------------------

def test_select_x3_features_returns_dataframe():

    dataframe = build_dataframe()

    selected = select_x3_features(
        dataframe
    )

    assert isinstance(
        selected,
        pd.DataFrame
    )


def test_select_x3_features_contains_expected_columns():

    dataframe = build_dataframe()

    selected = select_x3_features(
        dataframe
    )

    for feature in X3_FEATURES:

        assert feature in selected.columns


def test_select_x3_features_preserves_values():

    dataframe = build_dataframe()

    selected = select_x3_features(
        dataframe
    )

    assert selected.iloc[0]["Age"] == 22
    assert selected.iloc[0]["Gender"] == 1


def test_select_x3_features_returns_subset():

    dataframe = build_dataframe()

    selected = select_x3_features(
        dataframe
    )

    assert (
        len(selected.columns)
        < len(dataframe.columns)
    )


def test_select_x3_features_missing_column():

    dataframe = build_dataframe().drop(
        columns=["Age"]
    )

    with pytest.raises(KeyError):

        select_x3_features(
            dataframe
        )