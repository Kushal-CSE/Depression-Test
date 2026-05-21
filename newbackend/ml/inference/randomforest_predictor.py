from typing import Any

import pandas as pd


def _build_dataframe(
    feature_order: list[str],
    input_data: dict[str, Any]
) -> pd.DataFrame:
    """
    Build ordered dataframe for inference.
    """

    ordered_features = [
        input_data[feature]
        for feature in feature_order
    ]

    return pd.DataFrame(
        [ordered_features],
        columns=feature_order
    )


def predict_randomforest(
    model,
    feature_order: list[str],
    input_data: dict[str, Any]
) -> int:
    """
    Generate Random Forest prediction.
    """

    dataframe = _build_dataframe(
        feature_order=feature_order,
        input_data=input_data
    )

    prediction = model.predict(
        dataframe
    )[0]

    return int(prediction)


def predict_randomforest_probability(
    model,
    feature_order: list[str],
    input_data: dict[str, Any]
) -> float:
    """
    Generate Random Forest confidence.
    """

    dataframe = _build_dataframe(
        feature_order=feature_order,
        input_data=input_data
    )

    probability = model.predict_proba(
        dataframe
    ).max()

    return float(probability)