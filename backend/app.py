from services import auth_service
from dotenv import load_dotenv
from services.ollama_service import generate_recommendation
import db.repository as repository
from pathlib import Path

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(env_path)

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, UTC
import joblib
import pandas as pd
import os
import json
import re
import bcrypt
import jwt
from datetime import datetime, timedelta, UTC


app = Flask(__name__)
CORS(app)

# --- Load model + feature order once ---
model = joblib.load("models/depression_svm_x3_model.pkl")
feature_order = joblib.load("data/svm_feature_order.pkl")

JWT_SECRET = os.getenv("JWT_SECRET", "super-secret-key")

LOG_PATH = "data/log.txt"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    date_time = datetime.now(UTC).isoformat()

    try:
        input_features = [data[f] for f in feature_order]
    except KeyError as e:
        return jsonify({"error": f"Missing feature: {str(e)}"}), 400

    df = pd.DataFrame([input_features], columns=feature_order)

    prediction = model.predict(df)[0]
    confidence = model.predict_proba(df).max()

    print(f"Prediction: {prediction}, Confidence: {confidence:.4f}")

    tip = "Model confidence is low. Consider retaking the assessment."
    # if confidence < 0.6:
    #     tip = "Model confidence is low. Consider retaking the assessment."
    # else:
    #     tip = generate_recommendation(prediction, confidence, data)


    # --- Save to DB ---
    #save_prediction(data, date_time, int(prediction), float(confidence), tip)


    # # Append log entry
    # with open(LOG_PATH, "a", encoding="utf-8") as f:
    #     f.write(json.dumps({
    #         "timestamp": datetime.now().isoformat(),
    #         "request": data,
    #         "prediction": int(prediction),
    #         "confidence_score": float(confidence),
    #         "mental_health_tip": tip
    #     }) + "\n")


    return jsonify({
        "prediction": int(prediction),
        "confidence_score": float(confidence),
        "mental_health_tip": tip
    })



@app.route("/auth/signup", methods=["POST"])
def signup():

    data = request.json
    print(f"Signup request data: {data}")
    result = auth_service.signup_user(data)

    return jsonify(result["body"]), result["status"]


@app.route("/auth/login", methods=["POST"])
def login():

    data = request.json

    result = auth_service.login_user(data)

    return jsonify(result["body"]), result["status"]


@app.route("/auth/me", methods=["GET"])
def get_current_user():

    token = request.headers.get("Authorization")

    result = auth_service.get_current_user(token)

    return jsonify(result["body"]), result["status"]


@app.route("/auth/forgot-password", methods=["POST"])
def forgot_password():

    data = request.json

    result = auth_service.forgot_password(data)

    return jsonify(result["body"]), result["status"]


@app.route("/auth/google", methods=["POST"])
def google_auth():

    data = request.json

    result = auth_service.google_auth(data)

    return jsonify(result["body"]), result["status"]



# Todo: Implement real authentication logic, database integration, and secure password handling

# @app.route("/auth/signup", methods=["POST"])
# def signup():
#     return auth_service.signup(request)


# @app.route("/auth/login", methods=["POST"])
# def login():
#     data = request.json

#     email = data.get("email", "").strip().lower()
#     password = data.get("password", "")

#     if not email or not password:
#         return jsonify({
#             "error": "Email and password are required"
#         }), 400

#     result = login_user(email, password)

#     if not result["success"]:
#         return jsonify({
#             "error": result["message"]
#         }), 401

#     return jsonify({
#         "message": "Login successful",
#         "token": result["token"],
#         "user": result["user"]
#     }), 200


# @app.route("/auth/me", methods=["GET"])
# def get_current_user():
#     return jsonify({
#         "user": {
#             "id": 1,
#             "name": "Test User",
#             "email": "test@example.com"
#         }
#     }), 200


# @app.route("/auth/forgot-password", methods=["POST"])
# def forgot_password():
#     data = request.json

#     return jsonify({
#         "message": f"Password reset link sent to {data.get('email')}"
#     }), 200


# @app.route("/auth/google", methods=["POST"])
# def google_auth():
#     return jsonify({
#         "message": "Google authentication successful",
#         "user": {
#             "id": 1,
#             "name": "Google User",
#             "email": "googleuser@example.com"
#         },
#         "token": "dummy-google-token"
#     }), 200


if __name__ == "__main__":
    app.run(debug=True)