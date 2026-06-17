from typing import Optional

from app.repositories.prediction_repository import (
    get_prediction_by_id,
    delete_prediction
)


def get_prediction_details(
    *,
    prediction_id: str,
    user_id: str
) -> Optional[dict]:
    """
    Return prediction details if the
    prediction belongs to the user.
    """

    prediction = get_prediction_by_id(
        prediction_id
    )

    if prediction is None:
        return None

    if prediction.get("user_id") != user_id:
        return None

    return {
        "prediction_id": prediction.get(
            "prediction_id"
        ),
        "date": prediction.get(
            "created_at"
        ),
        "prediction_results": prediction.get(
            "prediction_results"
        ),
        "recommendation": prediction.get(
            "recommendation"
        )
    }


def delete_prediction_by_id(
    *,
    prediction_id: str,
    user_id: str
) -> bool:
    """
    Delete prediction only if it belongs
    to the authenticated user.
    """

    prediction = get_prediction_by_id(
        prediction_id
    )

    if prediction is None:
        return False

    if prediction.get("user_id") != user_id:
        return False

    return delete_prediction(
        prediction_id
    )