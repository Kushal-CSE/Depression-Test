from unittest.mock import MagicMock

import numpy as np
import pytest

from ml.inference.svm_predictor import (
    predict_svm,
    predict_svm_probability
)

from fixtures.model_fixtures import (
    MOCK_FEATURE_ORDER,
    MOCK_HIGH_RISK_PROBABILITIES,
    MOCK_LOW_RISK_PROBABILITIES,
    MOCK_MODEL_PROBABILITIES
)

from fixtures.prediction_payloads import (
    HIGH_RISK_PREDICTION_PAYLOAD,
    LOW_RISK_PREDICTION_PAYLOAD,
    VALID_PREDICTION_PAYLOAD
)


# ---------------------------------
# predict_svm
# ---------------------------------

def test_predict_svm_positive_prediction():

    model = MagicMock()

    model.predict.return_value = np.array([1])

    prediction = predict_svm(
        model=model,
        input_data=VALID_PREDICTION_PAYLOAD,
        feature_order=MOCK_FEATURE_ORDER
    )

    assert prediction == 1


def test_predict_svm_negative_prediction():

    model = MagicMock()

    model.predict.return_value = np.array([0])

    prediction = predict_svm(
        model=model,
        input_data=LOW_RISK_PREDICTION_PAYLOAD,
        feature_order=MOCK_FEATURE_ORDER
    )

    assert prediction == 0


def test_predict_svm_high_risk_prediction():

    model = MagicMock()

    model.predict.return_value = np.array([1])

    prediction = predict_svm(
        model=model,
        input_data=HIGH_RISK_PREDICTION_PAYLOAD,
        feature_order=MOCK_FEATURE_ORDER
    )

    assert prediction == 1


def test_predict_svm_calls_model():

    model = MagicMock()

    model.predict.return_value = np.array([1])

    predict_svm(
        model=model,
        input_data=VALID_PREDICTION_PAYLOAD,
        feature_order=MOCK_FEATURE_ORDER
    )

    model.predict.assert_called_once()


def test_predict_svm_missing_feature():

    model = MagicMock()

    invalid_payload = {
        "Age": 22
    }

    with pytest.raises(KeyError):

        predict_svm(
            model=model,
            input_data=invalid_payload,
            feature_order=MOCK_FEATURE_ORDER
        )


# ---------------------------------
# predict_svm_probability
# ---------------------------------

def test_predict_svm_probability_returns_float():

    model = MagicMock()

    model.predict_proba.return_value = (
        MOCK_MODEL_PROBABILITIES
    )

    probability = predict_svm_probability(
        model=model,
        input_data=VALID_PREDICTION_PAYLOAD,
        feature_order=MOCK_FEATURE_ORDER
    )

    assert isinstance(
        probability,
        float
    )


def test_predict_svm_probability_expected_value():

    model = MagicMock()

    model.predict_proba.return_value = (
        MOCK_MODEL_PROBABILITIES
    )

    probability = predict_svm_probability(
        model=model,
        input_data=VALID_PREDICTION_PAYLOAD,
        feature_order=MOCK_FEATURE_ORDER
    )

    assert probability == 0.88


def test_predict_svm_probability_low_risk():

    model = MagicMock()

    model.predict_proba.return_value = (
        MOCK_LOW_RISK_PROBABILITIES
    )

    probability = predict_svm_probability(
        model=model,
        input_data=LOW_RISK_PREDICTION_PAYLOAD,
        feature_order=MOCK_FEATURE_ORDER
    )

    assert probability == 0.91


def test_predict_svm_probability_high_risk():

    model = MagicMock()

    model.predict_proba.return_value = (
        MOCK_HIGH_RISK_PROBABILITIES
    )

    probability = predict_svm_probability(
        model=model,
        input_data=HIGH_RISK_PREDICTION_PAYLOAD,
        feature_order=MOCK_FEATURE_ORDER
    )

    assert probability == 0.97


def test_predict_svm_probability_calls_model():

    model = MagicMock()

    model.predict_proba.return_value = (
        MOCK_MODEL_PROBABILITIES
    )

    predict_svm_probability(
        model=model,
        input_data=VALID_PREDICTION_PAYLOAD,
        feature_order=MOCK_FEATURE_ORDER
    )

    model.predict_proba.assert_called_once()