from typing import Any


from ml.inference.model_loader import (
    get_model,
    get_feature_order
)

from ml.inference.svm_predictor import (
    predict_svm,
    predict_svm_probability
)

from ml.inference.logistic_predictor import (
    predict_logistic,
    predict_logistic_probability
)

from ml.inference.randomforest_predictor import (
    predict_randomforest,
    predict_randomforest_probability
)

from ml.inference.confidence_analyzer import (
    calculate_confidence,
    calculate_agreement_strength
)


SUPPORTED_MODELS = {
    "svm": {
        "predict": predict_svm,
        "probability": predict_svm_probability
    },

    "logistic_regression": {
        "predict": predict_logistic,
        "probability": predict_logistic_probability
    },

    "random_forest": {
        "predict": predict_randomforest,
        "probability": predict_randomforest_probability
    }
}


def run_all_models(
    input_data: dict[str, Any],
    feature_set: str,
    test_type: str,
    model_types: list[str]
) -> list[dict[str, Any]]:
    """
    Run multiple models on the same input.
    """

    results = []

    feature_order = get_feature_order(
        feature_set=feature_set,
        test_type=test_type
    )

    if not feature_order:
        return results

    for model_type in model_types:

        if model_type not in SUPPORTED_MODELS:
            continue

        model = get_model(
            model_type=model_type,
            feature_set=feature_set,
            test_type=test_type
        )

        if not model:
            continue

        predictor = SUPPORTED_MODELS[model_type]

        try:
            prediction = predictor["predict"](
                model=model,
                feature_order=feature_order,
                input_data=input_data
            )

            probability = predictor["probability"](
                model=model,
                feature_order=feature_order,
                input_data=input_data
            )

            confidence = calculate_confidence(
                probability
            )

            results.append({
                "model_type": model_type,
                "prediction": prediction,
                "confidence": confidence
            })

        except Exception:
            continue

    return results


def aggregate_predictions(
    model_results: list[dict[str, Any]]
) -> dict[str, Any]:
    """
    Aggregate ensemble predictions.
    """

    if not model_results:
        return {
            "final_prediction": None,
            "agreement_strength": "none",
            "agreement_ratio": 0.0,
            "prediction_distribution": {},
            "average_confidence": 0.0
        }

    predictions = [
        result["prediction"]
        for result in model_results
    ]

    confidence_scores = [
        result["confidence"]["score"]
        for result in model_results
    ]

    agreement = calculate_agreement_strength(
        predictions
    )

    average_confidence = (
        sum(confidence_scores)
        / len(confidence_scores)
    )

    return {
        "final_prediction": agreement[
            "final_prediction"
        ],

        "agreement_strength": agreement[
            "agreement_strength"
        ],

        "agreement_ratio": agreement[
            "agreement_ratio"
        ],

        "prediction_distribution": agreement[
            "prediction_distribution"
        ],

        "average_confidence": round(
            average_confidence,
            4
        )
    }


def generate_ensemble_output(
    input_data: dict[str, Any],
    feature_set: str,
    test_type: str,
    model_types: list[str]
) -> dict[str, Any]:
    """
    Complete ensemble prediction flow.
    """

    model_results = run_all_models(
        input_data=input_data,
        feature_set=feature_set,
        test_type=test_type,
        model_types=model_types
    )

    aggregated_result = aggregate_predictions(
        model_results
    )

    return {
        "individual_models": model_results,
        "ensemble_result": aggregated_result
    }