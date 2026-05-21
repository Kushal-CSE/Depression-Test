from flask import request

from app.services.auth_service import (
    signup_user,
    login_user,
    get_current_user,
    logout_user,
    forgot_password,
    reset_password,
    verify_email
)

from app.services.google_auth_service import (
    generate_google_auth_url,
    process_google_login
)

from app.services.jwt_service import extract_token

from app.utils.response import (
    success_response,
    error_response
)


def _get_request_data() -> dict:
    """
    Retrieve sanitized request JSON payload safely.
    """

    if not request.is_json:
        raise ValueError("Request content-type must be application/json")

    sanitized_data = getattr(
        request,
        "sanitized_json",
        None
    )

    if sanitized_data is not None:
        return sanitized_data

    return request.get_json(silent=True) or {}


def signup_controller():
    """
    Handle user signup requests.
    """

    try:
        request_data = _get_request_data()

        result = signup_user(request_data)

        return success_response(
            message="Signup successful",
            data=result,
            status_code=201
        )

    except ValueError as error:
        return error_response(
            message=str(error),
            status_code=400
        )

    except Exception:
        return error_response(
            message="Signup failed",
            status_code=500
        )


def login_controller():
    """
    Handle user login requests.
    """

    try:
        request_data = _get_request_data()

        result = login_user(request_data)

        return success_response(
            message="Login successful",
            data=result
        )

    except ValueError as error:
        return error_response(
            message=str(error),
            status_code=400
        )

    except PermissionError as error:
        return error_response(
            message=str(error),
            status_code=401
        )

    except Exception:
        return error_response(
            message="Login failed",
            status_code=500
        )


def google_login_controller():
    """
    Generate Google OAuth login URL.
    """

    try:
        auth_url = generate_google_auth_url()

        return success_response(
            message="Google auth URL generated",
            data={
                "auth_url": auth_url
            }
        )

    except Exception:
        return error_response(
            message="Failed to generate Google auth URL",
            status_code=500
        )


def google_callback_controller():
    """
    Handle Google OAuth callback flow.
    """

    try:
        request_data = _get_request_data()

        auth_code = (
            request_data.get("code")
            or request_data.get("auth_code")
        )

        if not auth_code:
            raise ValueError(
                "Authorization code is required"
            )

        result = process_google_login(auth_code)

        return success_response(
            message="Google login successful",
            data=result
        )

    except ValueError as error:
        return error_response(
            message=str(error),
            status_code=400
        )

    except PermissionError as error:
        return error_response(
            message=str(error),
            status_code=401
        )

    except Exception:
        return error_response(
            message="Google authentication failed",
            status_code=500
        )


def forgot_password_controller():
    """
    Handle forgot password requests.
    """

    try:
        request_data = _get_request_data()

        result = forgot_password(request_data)

        return success_response(
            message="Password reset initiated",
            data=result
        )

    except ValueError as error:
        return error_response(
            message=str(error),
            status_code=400
        )

    except Exception:
        return error_response(
            message="Failed to initiate password reset",
            status_code=500
        )


def reset_password_controller():
    """
    Handle password reset requests.
    """

    try:
        request_data = _get_request_data()

        token = request_data.get("token")
        new_password = request_data.get("new_password")

        if not token:
            raise ValueError(
                "Reset token is required"
            )

        if not new_password:
            raise ValueError(
                "New password is required"
            )

        result = reset_password(
            token=token,
            new_password=new_password
        )

        return success_response(
            message="Password reset successful",
            data=result
        )

    except ValueError as error:
        return error_response(
            message=str(error),
            status_code=400
        )

    except PermissionError as error:
        return error_response(
            message=str(error),
            status_code=401
        )

    except Exception:
        return error_response(
            message="Password reset failed",
            status_code=500
        )


def verify_email_controller():
    """
    Handle email verification requests.
    """

    try:
        request_data = _get_request_data()

        token = request_data.get("token")

        if not token:
            raise ValueError(
                "Verification token is required"
            )

        result = verify_email(token)

        return success_response(
            message="Email verified successfully",
            data=result
        )

    except ValueError as error:
        return error_response(
            message=str(error),
            status_code=400
        )

    except PermissionError as error:
        return error_response(
            message=str(error),
            status_code=401
        )

    except Exception:
        return error_response(
            message="Email verification failed",
            status_code=500
        )


def get_current_user_controller():
    """
    Return authenticated user profile.
    """

    try:
        token = extract_token(request)

        if not token:
            raise PermissionError(
                "Authentication token is required"
            )

        result = get_current_user(token)

        return success_response(
            message="Current user fetched successfully",
            data=result
        )

    except PermissionError as error:
        return error_response(
            message=str(error),
            status_code=401
        )

    except Exception:
        return error_response(
            message="Failed to fetch current user",
            status_code=500
        )


def logout_controller():
    """
    Handle logout requests.
    """

    try:
        result = logout_user()

        return success_response(
            message="Logout successful",
            data=result
        )

    except Exception:
        return error_response(
            message="Logout failed",
            status_code=500
        )