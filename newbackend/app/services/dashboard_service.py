from app.services.history_service import (
    get_user_prediction_history
)


def get_dashboard_data(
    user: dict
) -> dict:

    # print("Dashboard User:", user)

    history = get_user_prediction_history(
        user_id=user["id"],
        limit=200
    )

    return {
        "success": True,
        "data": {
            "user": {
                "id": user.get("id"),
                "name": user.get("name"),
                "email": user.get("email")
            },
            "history": history
        }
    }