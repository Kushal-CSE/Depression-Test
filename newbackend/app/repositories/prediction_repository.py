from typing import Dict, Any, List, Optional

from bson import ObjectId
from bson.errors import InvalidId
from pymongo.collection import Collection
from pymongo.errors import PyMongoError

from app.database.collections import (
    predictions_collection
)
from app.utils.helpers import (
    get_current_timestamp
)


def _get_predictions_collection() -> Collection:
    """
    Resolve MongoDB predictions collection.
    """

    if callable(predictions_collection):
        return predictions_collection()

    return predictions_collection


def save_prediction(
    prediction_data: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Persist prediction document.
    """

    timestamp = get_current_timestamp()

    response_data = prediction_data.get(
        "prediction_data",
        {}
    )

    document = {
        "user_id": prediction_data.get(
            "user_id"
        ),
        "input_data": prediction_data.get(
            "input_data"
        ),
        "model_results": prediction_data.get(
            "model_results",
            response_data.get("model_results")
        ),
        "final_prediction": prediction_data.get(
            "final_prediction",
            response_data.get(
                "final_prediction",
                response_data.get("prediction")
            )
        ),
        "confidence_score": prediction_data.get(
            "confidence_score",
            response_data.get(
                "confidence_score",
                response_data.get("confidence")
            )
        ),
        "severity": prediction_data.get(
            "severity",
            response_data.get("severity")
        ),
        "recommendation": prediction_data.get(
            "recommendation",
            response_data.get(
                "recommendation"
            )
        ),
        "created_at": timestamp
    }

    collection = _get_predictions_collection()

    try:
        result = collection.insert_one(
            document
        )

    except PyMongoError as error:
        raise RuntimeError(
            "Failed to save prediction"
        ) from error

    document["_id"] = result.inserted_id

    return document


def get_prediction_history(
    user_id: str,
    limit: int = 20
) -> List[Dict[str, Any]]:
    """
    Retrieve prediction history for user.
    """

    collection = _get_predictions_collection()

    try:
        predictions_cursor = (
            collection.find(
                {"user_id": user_id}
            )
            .sort("created_at", -1)
            .limit(limit)
        )

        predictions = list(
            predictions_cursor
        )

    except PyMongoError as error:
        raise RuntimeError(
            "Failed to retrieve prediction history"
        ) from error

    return predictions


def get_prediction_by_id(
    prediction_id: str
) -> Optional[Dict[str, Any]]:
    """
    Retrieve prediction document by ID.
    """

    try:
        object_id = ObjectId(
            prediction_id
        )

    except InvalidId:
        return None

    collection = _get_predictions_collection()

    try:
        prediction = collection.find_one({
            "_id": object_id
        })

    except PyMongoError as error:
        raise RuntimeError(
            "Failed to retrieve prediction"
        ) from error

    return prediction