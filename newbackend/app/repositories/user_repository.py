from typing import Optional, Dict, Any

from bson import ObjectId
from bson.errors import InvalidId
from pymongo.collection import Collection
from pymongo.errors import PyMongoError

from app.database.collections import users_collection
from app.utils.helpers import get_current_timestamp


def _get_users_collection() -> Collection:
    """
    Resolve MongoDB users collection.
    """

    if callable(users_collection):
        return users_collection()

    return users_collection


def create_user(
    user_data: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Create and persist a new user document.
    """

    required_fields = [
        "name",
        "email",
        "password"
    ]

    missing_fields = [
        field
        for field in required_fields
        if field not in user_data
    ]

    if missing_fields:
        raise ValueError(
            f"Missing required fields: {', '.join(missing_fields)}"
        )

    timestamp = get_current_timestamp()

    document = {
        "name": user_data["name"],
        "email": user_data["email"],
        "password": user_data["password"],
        "role": user_data.get("role", "user"),
        "is_verified": user_data.get(
            "is_verified",
            False
        ),
        "created_at": timestamp,
        "updated_at": timestamp
    }

    collection = _get_users_collection()

    try:
        result = collection.insert_one(document)

    except PyMongoError as error:
        raise RuntimeError(
            "Failed to create user document"
        ) from error

    document["_id"] = result.inserted_id

    return document


def find_user_by_email(
    email: str
) -> Optional[Dict[str, Any]]:
    """
    Retrieve user document by email.
    """

    collection = _get_users_collection()

    try:
        user = collection.find_one(
            {"email": email}
        )

    except PyMongoError as error:
        raise RuntimeError(
            "Failed to retrieve user by email"
        ) from error

    return user


def find_user_by_id(
    user_id: str
) -> Optional[Dict[str, Any]]:
    """
    Retrieve user document by MongoDB ObjectId.
    """

    try:
        object_id = ObjectId(user_id)

    except InvalidId:
        return None

    collection = _get_users_collection()

    try:
        user = collection.find_one({
            "_id": object_id
        })

    except PyMongoError as error:
        raise RuntimeError(
            "Failed to retrieve user by ID"
        ) from error

    return user


def update_user(
    user_id: str,
    update_data: Dict[str, Any]
) -> bool:
    """
    Update user document fields.
    """

    try:
        object_id = ObjectId(user_id)

    except InvalidId:
        return False

    update_payload = dict(update_data)

    update_payload["updated_at"] = (
        get_current_timestamp()
    )

    collection = _get_users_collection()

    try:
        result = collection.update_one(
            {"_id": object_id},
            {"$set": update_payload}
        )

    except PyMongoError as error:
        raise RuntimeError(
            "Failed to update user"
        ) from error

    return result.matched_count > 0


def verify_user_email(
    user_id: str
) -> bool:
    """
    Mark user email as verified.
    """

    try:
        object_id = ObjectId(user_id)

    except InvalidId:
        return False

    collection = _get_users_collection()

    try:
        result = collection.update_one(
            {"_id": object_id},
            {
                "$set": {
                    "is_verified": True,
                    "updated_at": (
                        get_current_timestamp()
                    )
                }
            }
        )

    except PyMongoError as error:
        raise RuntimeError(
            "Failed to verify user email"
        ) from error

    return result.matched_count > 0