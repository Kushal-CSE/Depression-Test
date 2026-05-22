from datetime import datetime
from typing import Any

from bson import ObjectId
from flask import jsonify


def _serialize_data(data: Any):
    """
    Recursively serialize MongoDB and Python objects
    into JSON-safe structures.
    """

    if isinstance(data, ObjectId):
        return str(data)

    if isinstance(data, datetime):
        return data.isoformat()

    if isinstance(data, dict):

        serialized = {}

        for key, value in data.items():

            # Convert Mongo _id -> id
            if key == "_id":

                serialized["id"] = (
                    _serialize_data(value)
                )

            # Never expose password hashes
            elif key == "password":
                continue

            else:
                serialized[key] = (
                    _serialize_data(value)
                )

        return serialized

    if isinstance(data, list):

        return [
            _serialize_data(item)
            for item in data
        ]

    return data


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
        response["data"] = _serialize_data(
            data
        )

    if meta is not None:
        response["meta"] = _serialize_data(
            meta
        )

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

        response["errors"] = (
            _serialize_data(errors)
        )

    if error_code is not None:
        response["error_code"] = error_code

    return jsonify(response), status_code