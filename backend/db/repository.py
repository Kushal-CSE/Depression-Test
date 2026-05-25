from .database import get_db
from bson import ObjectId


def save_prediction(input_data, date_time, prediction, confidence, tip):
    db = get_db()
    collection = db["predictions"]

    document = {
        "input_data": input_data,
        "date_time": date_time,
        "prediction": prediction,
        "confidence": confidence,
        "recommendation": tip
    }

    result = collection.insert_one(document)

    return str(result.inserted_id)


def find_user_by_email(email):
    db = get_db()
    collection = db["users"]

    user = collection.find_one({
        "email": email
    })

    if not user:
        return None

    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "password": user["password"]
    }


def create_user(name, email, password):
    db = get_db()
    collection = db["users"]

    document = {
        "name": name,
        "email": email,
        "password": password
    }

    result = collection.insert_one(document)

    return {
        "id": str(result.inserted_id),
        "name": name,
        "email": email
    }