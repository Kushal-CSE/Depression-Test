from flask import g, request

from app.services.logging_service import log_error

from app.services.prediction_service import (
    generate_prediction
)

from app.utils.response import (
    success_response,
    error_response
)


def predict_controller():
    """
    Handle ML prediction requests.
    """

    try:

        if not request.is_json:

            return error_response(
                message="Request content type must be application/json",
                status_code=400
            )

        request_data = getattr(
            request,
            "sanitized_json",
            request.get_json(silent=True) or {}
        )

        current_user = getattr(g, "current_user", None)

        user_id = None

        if isinstance(current_user, dict):
            user_id = current_user.get("id")

        prediction_response = generate_prediction(
            input_data=request_data,
            user_id=user_id,
            persist_history=bool(user_id),
            validate_input=True
        )

        if not isinstance(prediction_response, dict):

            log_error(
                "Prediction service returned invalid response type",
                {
                    "response_type": str(type(prediction_response))
                }
            )

            return error_response(
                message="Prediction service failure",
                status_code=500
            )

        if prediction_response.get("success") is False:

            status_code = prediction_response.get(
                "status_code",
                400
            )

            return error_response(
                message=prediction_response.get(
                    "message",
                    "Prediction request failed"
                ),
                errors=prediction_response.get("errors"),
                status_code=status_code
            )

        return success_response(
            message="Prediction generated successfully",
            data=prediction_response,
            status_code=200
        )

    except ValueError as error:

        log_error(
            "Prediction validation error",
            {
                "error": str(error)
            }
        )

        return error_response(
            message="Invalid prediction input",
            status_code=400
        )

    except RuntimeError as error:

        log_error(
            "Prediction runtime error",
            {
                "error": str(error)
            }
        )

        return error_response(
            message="Prediction processing failed",
            status_code=500
        )

    except Exception as error:

        log_error(
            "Unhandled prediction controller error",
            {
                "error": str(error)
            }
        )

        return error_response(
            message="Internal server error",
            status_code=500
        )