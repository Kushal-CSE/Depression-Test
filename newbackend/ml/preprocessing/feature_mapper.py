# ml/preprocessing/feature_mapper.py

from typing import Any

import pandas as pd


def map_features(
    input_data: dict[str, Any]
) -> pd.DataFrame:
    """
    Convert raw request payload into a
    single-row pandas DataFrame.
    """

    if not isinstance(input_data, dict):
        raise TypeError(
            "Input data must be a dictionary."
        )

    if not input_data:
        raise ValueError(
            "Input payload cannot be empty."
        )

    normalized_data = {}

    for key, value in input_data.items():

        # Normalize whitespace in feature names.
        normalized_key = str(key).strip()

        normalized_data[normalized_key] = value

    dataframe = pd.DataFrame([normalized_data])

    if dataframe.empty:
        raise ValueError(
            "Failed to construct feature dataframe."
        )

    return dataframe


def align_feature_order(
    dataframe: pd.DataFrame,
    feature_order: list[str]
) -> pd.DataFrame:
    """
    Align dataframe columns to the exact
    feature order expected during training.
    """

    if not isinstance(dataframe, pd.DataFrame):
        raise TypeError(
            "dataframe must be a pandas DataFrame."
        )

    if dataframe.empty:
        raise ValueError(
            "Input dataframe cannot be empty."
        )

    if not isinstance(feature_order, list):
        raise TypeError(
            "feature_order must be a list."
        )

    if not feature_order:
        raise ValueError(
            "feature_order cannot be empty."
        )

    missing_features = [
        feature
        for feature in feature_order
        if feature not in dataframe.columns
    ]

    if missing_features:
        raise ValueError(
            "Missing required features: "
            f"{missing_features}"
        )

    duplicate_columns = (
        dataframe.columns[
            dataframe.columns.duplicated()
        ]
        .tolist()
    )

    if duplicate_columns:
        raise ValueError(
            "Duplicate dataframe columns detected: "
            f"{duplicate_columns}"
        )

    # Remove unexpected extra columns to enforce
    # strict training/inference consistency.
    aligned_dataframe = dataframe[
        feature_order
    ].copy()

    return aligned_dataframe