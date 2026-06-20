from functools import wraps
import os
from typing import Callable

from flask import Flask, request, jsonify, g
from flask_cors import CORS

from app.services.jwt_service import (
    extract_token,
    decode_token,
    verify_token
)

app = Flask(__name__)

# CORS setup FIRST, before blueprints
CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                os.getenv("FRONTEND_URL", "http://localhost:3000"),
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://localhost:3001"
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "expose_headers": ["Content-Type"],
            "supports_credentials": True,
            "max_age": 3600
        }
    }
)
def jwt_required():
    """
    Require valid access token.
    """

    def decorator(function: Callable):

        @wraps(function)
        def wrapper(*args, **kwargs):
            print("=" * 50)
            print("METHOD:", request.method)
            print("PATH:", request.path)
            print("AUTH HEADER:", request.headers.get("Authorization"))
            print("=" * 50)

            # Allow CORS preflight requests
            if request.method == "OPTIONS":
                return "", 204
            
            
            token = extract_token(request)
            print("Extracted token:", token)
            if not token:
                return jsonify({
                    "success": False,
                    "message": "Authorization token missing"
                }), 401

            is_valid = verify_token(
                token,
                expected_type="access"
            )

            if not is_valid:
                return jsonify({
                    "success": False,
                    "message": "Invalid or expired token"
                }), 401

            payload = decode_token(token)

            g.current_user = {
                "id": payload.get("user_id"),
                "email": payload.get("email")
            }

            return function(*args, **kwargs)

        return wrapper

    return decorator


def optional_jwt():
    """
    Attach JWT payload if token exists,
    but do not block request.
    """

    def decorator(function: Callable):

        @wraps(function)
        def wrapper(*args, **kwargs):
            if request.method == "OPTIONS":
                return "", 204

            token = extract_token(request)

            if not token:
                g.current_user = None
                return function(*args, **kwargs)

            is_valid = verify_token(
                token,
                expected_type="access"
            )

            if not is_valid:
                g.current_user = None
                return function(*args, **kwargs)

            g.current_user = decode_token(token)

            return function(*args, **kwargs)

        return wrapper

    return decorator