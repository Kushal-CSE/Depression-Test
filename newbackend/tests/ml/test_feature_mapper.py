import pandas as pd
import pytest

from ml.preprocessing.feature_mapper import (
    align_feature_order,
    map_features
)

from fixtures.prediction_payloads import (
    INVALID_PREDICTION_PAYLOADS,
    VALID_PREDICTION_PAYLOAD
)


# ---------------------------------
# map_features
# ---------------------------------

def test_map_features_returns_dataframe():

    dataframe = map_features(
        VALID_PREDICTION_PAYLOAD
    )

    assert isinstance(
        dataframe,
        pd.DataFrame
    )


def test_map_features_preserves_values():

    dataframe = map_features(
        VALID_PREDICTION_PAYLOAD
    )

    assert dataframe.iloc[0]["Age"] == 22
    assert dataframe.iloc[0]["Gender"] == 1


@pytest.mark.parametrize(
    "payload_key",
    [
        "missing_gender",
        "missing_age"
    ]
)
def test_map_features_missing_fields(
    payload_key
):

    payload = INVALID_PREDICTION_PAYLOADS[
        payload_key
    ]

    dataframe = map_features(
        payload
    )

    assert isinstance(
        dataframe,
        pd.DataFrame
    )


# ---------------------------------
# align_feature_order
# ---------------------------------

def test_align_feature_order_returns_dataframe():

    dataframe = map_features(
        VALID_PREDICTION_PAYLOAD
    )

    ordered_dataframe = align_feature_order(
        dataframe,
        list(VALID_PREDICTION_PAYLOAD.keys())
    )

    assert isinstance(
        ordered_dataframe,
        pd.DataFrame
    )


def test_align_feature_order_matches_feature_order():

    feature_order = [
        "Gender",
        "Age",
        "Sleep_Duration"
    ]

    dataframe = map_features(
        VALID_PREDICTION_PAYLOAD
    )

    ordered_dataframe = align_feature_order(
        dataframe,
        feature_order
    )

    assert list(
        ordered_dataframe.columns
    ) == feature_order


def test_align_feature_order_raises_key_error():

    dataframe = map_features(
        VALID_PREDICTION_PAYLOAD
    )

    with pytest.raises(KeyError):

        align_feature_order(
            dataframe,
            [
                "Gender",
                "Unknown_Field"
            ]
        )


def test_align_feature_order_full_payload():

    feature_order = list(
        VALID_PREDICTION_PAYLOAD.keys()
    )

    dataframe = map_features(
        VALID_PREDICTION_PAYLOAD
    )

    ordered_dataframe = align_feature_order(
        dataframe,
        feature_order
    )

    assert len(
        ordered_dataframe.columns
    ) == len(feature_order)