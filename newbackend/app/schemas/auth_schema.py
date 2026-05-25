# app/schemas/auth_schema.py

from typing import Any, Mapping, Optional
from datetime import datetime


def _serialize_datetime(
    value: Optional[Any]
) -> Optional[str]:
    """
    Safely serialize datetime values to ISO format.
    """

    if value is None:
        return None

    if isinstance(value, datetime):
        return value.isoformat()

    return str(value)


def serialize_user(
    user: Mapping[str, Any]
) -> dict:
    """
    Serialize user object into API-safe response payload.
    """

    user_id = user.get("id") or user.get("_id")

    return {
        "id": str(user_id) if user_id is not None else None,
        "name": user.get("name"),
        "email": user.get("email"),
        "role": user.get("role", "user"),
        "is_verified": user.get("is_verified", False),
        "created_at": _serialize_datetime(
            user.get("created_at")
        ),
        "updated_at": _serialize_datetime(
            user.get("updated_at")
        )
    }


def serialize_auth_response(
    message: str,
    token: str,
    user: Mapping[str, Any]
) -> dict:
    """
    Serialize authentication response payload.
    """

    return {
        "message": message,
        "token": token,
        "user": serialize_user(user)
    }