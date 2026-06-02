<<<<<<< HEAD
from typing import Dict, Any, List, Optional
=======
from typing import Any, Dict, List, Optional
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a

from bson import ObjectId
from bson.errors import InvalidId
from pymongo.collection import Collection
from pymongo.errors import PyMongoError

from app.database.collections import (
    predictions_collection
)
<<<<<<< HEAD
=======

>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
from app.utils.helpers import (
    get_current_timestamp
)


def _get_predictions_collection() -> Collection:
    """
<<<<<<< HEAD
    Resolve MongoDB predictions collection.
=======
    Return predictions collection.
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
    """

    if callable(predictions_collection):
        return predictions_collection()

    return predictions_collection


def save_prediction(
<<<<<<< HEAD
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
=======
    *,
    user_id: str,
    input_data: Dict[str, Any],
    prediction_results: Dict[str, Any],
    recommendation: Optional[str] = None
) -> Dict[str, Any]:
    """
    Save prediction history record.
    """

    document = {
        "user_id": user_id,
        "created_at": get_current_timestamp(),
        "input_data": input_data,
        "prediction_results": prediction_results,
        "recommendation": recommendation
    }

    try:

        result = (
            _get_predictions_collection()
            .insert_one(document)
        )

    except PyMongoError as error:

>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
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
<<<<<<< HEAD
    Retrieve prediction history for user.
    """

    collection = _get_predictions_collection()

    try:
        predictions_cursor = (
            collection.find(
                {"user_id": user_id}
            )
=======
    Get prediction history for a user.
    """

    try:

        return list(
            _get_predictions_collection()
            .find({"user_id": user_id})
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
            .sort("created_at", -1)
            .limit(limit)
        )

<<<<<<< HEAD
        predictions = list(
            predictions_cursor
        )

    except PyMongoError as error:
=======
    except PyMongoError as error:

>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
        raise RuntimeError(
            "Failed to retrieve prediction history"
        ) from error

<<<<<<< HEAD
    return predictions

=======
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a

def get_prediction_by_id(
    prediction_id: str
) -> Optional[Dict[str, Any]]:
    """
<<<<<<< HEAD
    Retrieve prediction document by ID.
    """

    try:
=======
    Get prediction by ID.
    """

    try:

>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
        object_id = ObjectId(
            prediction_id
        )

    except InvalidId:
<<<<<<< HEAD
        return None

    collection = _get_predictions_collection()

    try:
        prediction = collection.find_one({
            "_id": object_id
        })

    except PyMongoError as error:
=======

        return None

    try:

        return (
            _get_predictions_collection()
            .find_one(
                {"_id": object_id}
            )
        )

    except PyMongoError as error:

>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
        raise RuntimeError(
            "Failed to retrieve prediction"
        ) from error

<<<<<<< HEAD
    return prediction
=======

def delete_prediction(
    prediction_id: str
) -> bool:
    """
    Delete prediction by ID.
    """

    try:

        object_id = ObjectId(
            prediction_id
        )

    except InvalidId:

        return False

    try:

        result = (
            _get_predictions_collection()
            .delete_one(
                {"_id": object_id}
            )
        )

    except PyMongoError as error:

        raise RuntimeError(
            "Failed to delete prediction"
        ) from error

    return result.deleted_count > 0
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a
