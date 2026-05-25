from datetime import datetime, timedelta, UTC
import bcrypt
import jwt
import re
import os

import db.repository as repository

JWT_SECRET = os.getenv("JWT_SECRET", "super-secret-key")


def signup_user(data):

    # Receive request data
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    # Validate input
    if not name or not email or not password:
        return {
            "status": 400,
            "body": {
                "error": "Name, email and password are required"
            }
        }

    email_regex = r"^[\w\.-]+@[\w\.-]+\.\w+$"

    if not re.match(email_regex, email):
        return {
            "status": 400,
            "body": {
                "error": "Invalid email format"
            }
        }

    if len(password) < 6:
        return {
            "status": 400,
            "body": {
                "error": "Password must be at least 6 characters long"
            }
        }

    # Check existing user
    existing_user = repository.find_user_by_email(email)

    if existing_user:
        return {
            "status": 409,
            "body": {
                "error": "User already exists"
            }
        }

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    # Save user
    new_user = repository.create_user(
        name=name,
        email=email,
        password=hashed_password
    )

    # Generate token
    token_payload = {
        "user_id": new_user["id"],
        "email": new_user["email"],
        "exp": datetime.now(UTC) + timedelta(days=7)
    }

    token = jwt.encode(
        token_payload,
        JWT_SECRET,
        algorithm="HS256"
    )

    return {
        "status": 201,
        "body": {
            "message": "Signup successful",
            "token": token,
            "user": {
                "id": new_user["id"],
                "name": new_user["name"],
                "email": new_user["email"]
            }
        }
    }


def login_user(data):

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    # Validate input
    if not email or not password:
        return {
            "status": 400,
            "body": {
                "error": "Email and password are required"
            }
        }

    # Find user
    user = repository.find_user_by_email(email)

    if not user:
        return {
            "status": 401,
            "body": {
                "error": "Invalid credentials"
            }
        }

    # Compare password
    password_match = bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    )

    if not password_match:
        return {
            "status": 401,
            "body": {
                "error": "Invalid credentials"
            }
        }

    # Generate token
    token_payload = {
        "user_id": user["id"],
        "email": user["email"],
        "exp": datetime.now(UTC) + timedelta(days=7)
    }

    token = jwt.encode(
        token_payload,
        JWT_SECRET,
        algorithm="HS256"
    )

    return {
        "status": 200,
        "body": {
            "message": "Login successful",
            "token": token,
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            }
        }
    }


def get_current_user(token):

    if not token:
        return {
            "status": 401,
            "body": {
                "error": "Authorization token missing"
            }
        }

    try:
        token = token.replace("Bearer ", "")

        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=["HS256"]
        )

        user = repository.find_user_by_email(payload["email"])

        if not user:
            return {
                "status": 404,
                "body": {
                    "error": "User not found"
                }
            }

        return {
            "status": 200,
            "body": {
                "user": {
                    "id": user["id"],
                    "name": user["name"],
                    "email": user["email"]
                }
            }
        }

    except jwt.ExpiredSignatureError:
        return {
            "status": 401,
            "body": {
                "error": "Token expired"
            }
        }

    except jwt.InvalidTokenError:
        return {
            "status": 401,
            "body": {
                "error": "Invalid token"
            }
        }


def forgot_password(data):

    email = data.get("email", "").strip().lower()

    if not email:
        return {
            "status": 400,
            "body": {
                "error": "Email is required"
            }
        }

    return {
        "status": 200,
        "body": {
            "message": f"Password reset link sent to {email}"
        }
    }


def google_auth(data):

    google_token = data.get("token")

    if not google_token:
        return {
            "status": 400,
            "body": {
                "error": "Google token is required"
            }
        }

    return {
        "status": 200,
        "body": {
            "message": "Google authentication successful",
            "token": "dummy-google-jwt-token",
            "user": {
                "id": 1,
                "name": "Google User",
                "email": "googleuser@example.com"
            }
        }
    }