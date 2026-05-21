from flask import jsonify


def success_response(
    message: str,
    data=None,
    status_code: int = 200,
    meta: dict | None = None
) -> tuple:
    """
    Build standardized success response.
    """

    response = {
        "success": True,
        "message": message
    }

    if data is not None:
        response["data"] = data

    if meta is not None:
        response["meta"] = meta

    return jsonify(response), status_code


def error_response(
    message: str,
    status_code: int = 400,
    errors=None,
    error_code: str | None = None
) -> tuple:
    """
    Build standardized error response.
    """

    response = {
        "success": False,
        "message": message
    }

    if errors is not None:
        response["errors"] = errors

    if error_code is not None:
        response["error_code"] = error_code

    return jsonify(response), status_code