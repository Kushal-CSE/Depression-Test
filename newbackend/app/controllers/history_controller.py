from flask import g

from app.services.logging_service import (
    log_error
)

from app.services.prediction_service import (
    get_user_prediction_history
)

from app.utils.response import (
    success_response,
    error_response
)


def get_prediction_history_controller():
    """
    Return authenticated user's
    prediction history.
    """

    try:

        current_user = getattr(
            g,
            "current_user",
            None
        )

        if not isinstance(current_user, dict):

            return error_response(
                message="Authentication required",
                status_code=401
            )

        user_id = current_user.get("id")

        if not user_id:

            log_error(
                "Authenticated user missing id",
                {
                    "current_user": current_user
                }
            )

            return error_response(
                message="Invalid authentication context",
                status_code=401
            )

        serialized_history = get_user_prediction_history(
            user_id=user_id
        )

        if not isinstance(serialized_history, list):

            log_error(
                "Prediction history service returned invalid response type",
                {
                    "response_type": str(type(serialized_history))
                }
            )

            return error_response(
                message="Failed to fetch prediction history",
                status_code=500
            )

        return success_response(
            message="Prediction history fetched successfully",
            data=serialized_history,
            status_code=200
        )

    except ValueError as error:

        log_error(
            "Prediction history validation error",
            {
                "error": str(error)
            }
        )

        return error_response(
            message="Invalid history request",
            status_code=400
        )

    except RuntimeError as error:

        log_error(
            "Prediction history runtime error",
            {
                "error": str(error)
            }
        )

        return error_response(
            message="Failed to retrieve prediction history",
            status_code=500
        )

    except Exception as error:

        log_error(
            "Unhandled prediction history controller error",
            {
                "error": str(error)
            }
        )

        return error_response(
            message="Internal server error",
            status_code=500
        )