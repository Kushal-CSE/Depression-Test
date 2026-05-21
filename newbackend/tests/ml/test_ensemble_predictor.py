from unittest.mock import MagicMock, patch

import pytest

from ml.inference.ensemble_predictor import (
    aggregate_predictions,
    generate_ensemble_output,
    run_all_models
)

from fixtures.model_fixtures import (
    MOCK_FEATURE_ORDER
)

from fixtures.prediction_payloads import (
    VALID_PREDICTION_PAYLOAD
)


# ---------------------------------
# run_all_models
# ---------------------------------

@patch(
    "ml.inference.ensemble_predictor.predict_svm"
)
@patch(
    "ml.inference.ensemble_predictor.predict_logistic"
)
@patch(
    "ml.inference.ensemble_predictor.predict_randomforest"
)
def test_run_all_models_calls_predictors(
    mock_rf,
    mock_logistic,
    mock_svm
):

    mock_svm.return_value = 1
    mock_logistic.return_value = 1
    mock_rf.return_value = 0

    models = {
        "svm_model": MagicMock(),
        "logistic_model": MagicMock(),
        "randomforest_model": MagicMock()
    }

    feature_orders = {
        "svm_features": MOCK_FEATURE_ORDER,
        "logistic_features": MOCK_FEATURE_ORDER,
        "randomforest_features": MOCK_FEATURE_ORDER
    }

    result = run_all_models(
        input_data=VALID_PREDICTION_PAYLOAD,
        models=models,
        feature_orders=feature_orders
    )

    assert isinstance(result, dict)

    mock_svm.assert_called_once()
    mock_logistic.assert_called_once()
    mock_rf.assert_called_once()


# ---------------------------------
# aggregate_predictions
# ---------------------------------

def test_aggregate_predictions_positive():

    result = aggregate_predictions(
        predictions={
            "svm": 1,
            "logistic": 1,
            "randomforest": 0
        },
        probabilities={
            "svm": 0.91,
            "logistic": 0.88,
            "randomforest": 0.79
        }
    )

    assert result["final_prediction"] == 1
    assert "confidence_score" in result
    assert "agreement_strength" in result


def test_aggregate_predictions_negative():

    result = aggregate_predictions(
        predictions={
            "svm": 0,
            "logistic": 0,
            "randomforest": 1
        },
        probabilities={
            "svm": 0.91,
            "logistic": 0.89,
            "randomforest": 0.52
        }
    )

    assert result["final_prediction"] == 0


def test_aggregate_predictions_empty():

    with pytest.raises(ValueError):

        aggregate_predictions(
            predictions={},
            probabilities={}
        )


# ---------------------------------
# generate_ensemble_output
# ---------------------------------

def test_generate_ensemble_output():

    result = generate_ensemble_output(
        prediction=1,
        confidence=0.95,
        agreement="strong"
    )

    assert isinstance(result, dict)

    assert result["prediction"] == 1
    assert result["confidence_score"] == 0.95
    assert result["agreement_strength"] == "strong"