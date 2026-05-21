from unittest.mock import MagicMock, patch

import pytest

from ml.inference.model_loader import (
    get_loaded_models,
    load_feature_orders,
    load_models
)


# ---------------------------------
# load_models
# ---------------------------------

@patch(
    "ml.inference.model_loader.joblib.load"
)
def test_load_models_returns_dictionary(
    mock_joblib_load
):

    mock_joblib_load.side_effect = [
        MagicMock(),
        MagicMock(),
        MagicMock()
    ]

    models = load_models()

    assert isinstance(
        models,
        dict
    )


@patch(
    "ml.inference.model_loader.joblib.load"
)
def test_load_models_contains_models(
    mock_joblib_load
):

    mock_joblib_load.side_effect = [
        MagicMock(),
        MagicMock(),
        MagicMock()
    ]

    models = load_models()

    assert "svm_model" in models
    assert "logistic_model" in models
    assert "randomforest_model" in models


@patch(
    "ml.inference.model_loader.joblib.load"
)
def test_load_models_calls_joblib(
    mock_joblib_load
):

    mock_joblib_load.side_effect = [
        MagicMock(),
        MagicMock(),
        MagicMock()
    ]

    load_models()

    assert mock_joblib_load.call_count == 3


@patch(
    "ml.inference.model_loader.joblib.load"
)
def test_load_models_file_not_found(
    mock_joblib_load
):

    mock_joblib_load.side_effect = (
        FileNotFoundError
    )

    with pytest.raises(
        FileNotFoundError
    ):

        load_models()


# ---------------------------------
# load_feature_orders
# ---------------------------------

@patch(
    "ml.inference.model_loader.joblib.load"
)
def test_load_feature_orders_returns_dictionary(
    mock_joblib_load
):

    mock_joblib_load.side_effect = [
        ["feature_1"],
        ["feature_1"],
        ["feature_1"]
    ]

    feature_orders = load_feature_orders()

    assert isinstance(
        feature_orders,
        dict
    )


@patch(
    "ml.inference.model_loader.joblib.load"
)
def test_load_feature_orders_contains_keys(
    mock_joblib_load
):

    mock_joblib_load.side_effect = [
        ["feature_1"],
        ["feature_1"],
        ["feature_1"]
    ]

    feature_orders = load_feature_orders()

    assert "svm_features" in feature_orders
    assert "logistic_features" in feature_orders
    assert "randomforest_features" in feature_orders


@patch(
    "ml.inference.model_loader.joblib.load"
)
def test_load_feature_orders_calls_joblib(
    mock_joblib_load
):

    mock_joblib_load.side_effect = [
        ["feature_1"],
        ["feature_1"],
        ["feature_1"]
    ]

    load_feature_orders()

    assert mock_joblib_load.call_count == 3


@patch(
    "ml.inference.model_loader.joblib.load"
)
def test_load_feature_orders_file_not_found(
    mock_joblib_load
):

    mock_joblib_load.side_effect = (
        FileNotFoundError
    )

    with pytest.raises(
        FileNotFoundError
    ):

        load_feature_orders()


# ---------------------------------
# get_loaded_models
# ---------------------------------

@patch(
    "ml.inference.model_loader.load_models"
)
@patch(
    "ml.inference.model_loader.load_feature_orders"
)
def test_get_loaded_models_returns_data(
    mock_load_feature_orders,
    mock_load_models
):

    mock_load_models.return_value = {
        "svm_model": MagicMock()
    }

    mock_load_feature_orders.return_value = {
        "svm_features": ["feature_1"]
    }

    loaded = get_loaded_models()

    assert isinstance(
        loaded,
        dict
    )

    assert "models" in loaded
    assert "feature_orders" in loaded