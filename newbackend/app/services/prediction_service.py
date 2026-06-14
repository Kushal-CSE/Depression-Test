import pandas as pd

from app.constants.model_features import (
    PHQ9_X4_FEATURES,
    BDI_X1_FEATURES,
    CESD_X3_FEATURES,
)

from app.validators.prediction_validator import (
    validate_prediction_input
)

from ml.inference.model_loader import (
    get_phq9_model,
    get_bdi_model,
    get_cesd_model,
)

from app.repositories.prediction_repository import (
    save_prediction
)

from app.services.recommendation_service import (
    generate_recommendation
)

def generate_prediction(
    input_data: dict,
    user_id=None,
    persist_history: bool = False,
    validate_input: bool = True
) -> dict:
    """
    Generate predictions using all models.

    Parameters reserved for future use:
    - user_id
    - persist_history
    """

    if validate_input:

        validation_errors = (
            validate_prediction_input(
                input_data
            )
        )

        if validation_errors:

            return {
                "success": False,
                "message": "Validation failed",
                "errors": validation_errors,
                "status_code": 400
            }

    phq9_df = pd.DataFrame([
        {
            feature: input_data[feature]
            for feature in PHQ9_X4_FEATURES
        }
    ])

    bdi_df = pd.DataFrame([
        {
            feature: input_data[feature]
            for feature in BDI_X1_FEATURES
        }
    ])

    cesd_df = pd.DataFrame([
        {
            feature: input_data[feature]
            for feature in CESD_X3_FEATURES
        }
    ])

    phq9_model = get_phq9_model()
    bdi_model = get_bdi_model()
    cesd_model = get_cesd_model()

    phq9_score = int(
        phq9_model.predict(phq9_df)[0]
    )

    bdi_score = int(
        bdi_model.predict(bdi_df)[0]
    )

    cesd_score = int(
        cesd_model.predict(cesd_df)[0]
    )

    phq9_confidence = round(
        max(
            phq9_model.predict_proba(
                phq9_df
            )[0]
        ) * 100,
        2
    )

    bdi_confidence = round(
        max(
            bdi_model.predict_proba(
                bdi_df
            )[0]
        ) * 100,
        2
    )

    cesd_confidence = round(
        max(
            cesd_model.predict_proba(
                cesd_df
            )[0]
        ) * 100,
        2
    )

    prediction_results = {
        "phq9": {
            "score": phq9_score,
            "confidence": phq9_confidence
        },
        "bdi": {
            "score": bdi_score,
            "confidence": bdi_confidence
        },
        "cesd": {
            "score": cesd_score,
            "confidence": cesd_confidence
        }
    }

    recommendation = generate_recommendation(
        prediction_results=prediction_results,
        user_data=input_data
    )

    # recommendation = "Based on the predictions, we recommend consulting a mental health professional for a comprehensive evaluation and personalized treatment plan."

    #
    # Future persistence hook
    #

    # print("user_id =", user_id)
    # print("persist_history =", persist_history)

    if persist_history and user_id:

        # print("ABOUT TO SAVE PREDICTION")

        save_prediction(
            user_id=user_id,
            input_data=input_data,
            prediction_results=prediction_results,
            recommendation=recommendation
        )

    return prediction_results


def save_manual_test(
    request_data: dict,
    user_id: str
) -> dict:
    """
    Save manually completed assessment results.
    """

    if not user_id:

        return {
            "success": False,
            "message": "User not authenticated",
            "status_code": 401
        }

    input_data = request_data.get(
        "input_data",
        {}
    )

    phq9 = request_data.get("phq9")
    bdi = request_data.get("bdi")
    cesd = request_data.get("cesd")

    provided_tests = [
        test
        for test in [phq9, bdi, cesd]
        if test is not None
    ]

    if len(provided_tests) != 1:

        return {
            "success": False,
            "message": (
                "Exactly one of phq9, bdi, or cesd "
                "must be provided"
            ),
            "status_code": 400
        }

    prediction_results = {
        "phq9": phq9,
        "bdi": bdi,
        "cesd": cesd
    }

    saved_document = save_prediction(
        user_id=user_id,
        input_data=input_data,
        prediction_results=prediction_results,
        recommendation=None
    )

    return {
        "success": True,
        "prediction_id": str(
            saved_document["_id"]
        )
    }