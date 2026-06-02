from flask import g

from app.services.logging_service import (
    log_error
)

<<<<<<< HEAD
from app.services.prediction_service import (
=======
from app.services.history_service import (
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
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

<<<<<<< HEAD
        if not isinstance(current_user, dict):
=======
        if not isinstance(
            current_user,
            dict
        ):
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a

            return error_response(
                message="Authentication required",
                status_code=401
            )

<<<<<<< HEAD
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
=======
        user_id = current_user.get(
            "id"
        )

        if not user_id:

            return error_response(
                message=(
                    "Invalid authentication context"
                ),
                status_code=401
            )

        history = (
            get_user_prediction_history(
                user_id=user_id,
                limit=20
            )
        )

        return success_response(
            message=(
                "Prediction history fetched "
                "successfully"
            ),
            data=history,
            status_code=200
        )

    except RuntimeError as error:

        log_error(
            "Prediction history error",
            {
                "error": str(error),
                "user_id": user_id
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
            }
        )

        return error_response(
<<<<<<< HEAD
            message="Failed to retrieve prediction history",
=======
            message=(
                "Failed to retrieve "
                "prediction history"
            ),
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
            status_code=500
        )

    except Exception as error:

        log_error(
<<<<<<< HEAD
            "Unhandled prediction history controller error",
=======
            "Unhandled prediction history error",
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
            {
                "error": str(error)
            }
        )

        return error_response(
            message="Internal server error",
            status_code=500
        )