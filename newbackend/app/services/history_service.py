from app.repositories.prediction_repository import (
    get_prediction_history
)


def get_user_prediction_history(
    user_id: str,
    limit: int = 20
) -> list[dict]:
    """
    Return prediction history summaries
    for a user.
    """

    predictions = get_prediction_history(
        user_id=user_id,
        limit=limit
    )

    history = []

    for prediction in predictions:

        history.append(
            {
                "prediction_id": prediction.get(
                    "prediction_id"
                ),
                "date": prediction.get(
                    "created_at"
                ),
                "prediction_value": prediction.get(
                    "prediction_results"
                ),
                "recommendation": prediction.get(
                    "recommendation"
                )
            }
        )

    return history