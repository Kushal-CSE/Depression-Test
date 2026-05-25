import os


class ProductionConfig:

    DEBUG = False

    HOST = os.getenv("HOST", "0.0.0.0")

    PORT = int(
        os.getenv("PORT", 5000)
    )

    MONGO_URI = os.getenv("MONGO_URI")

    # Backward compatibility alias
    MONGODB_URI = MONGO_URI

    DATABASE_NAME = os.getenv(
        "DATABASE_NAME"
    )

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY"
    )

    JWT_ACCESS_TOKEN_EXPIRES = int(
        os.getenv(
            "JWT_ACCESS_TOKEN_EXPIRES",
            7
        )
    )

    # Legacy compatibility layer
    JWT_SECRET = JWT_SECRET_KEY

    JWT_ALGORITHM = os.getenv(
        "JWT_ALGORITHM",
        "HS256"
    )

    JWT_ACCESS_EXPIRATION = (
        JWT_ACCESS_TOKEN_EXPIRES
    )

    JWT_REFRESH_EXPIRATION = int(
        os.getenv(
            "JWT_REFRESH_TOKEN_EXPIRES",
            30
        )
    )

    GEMINI_API_KEY = os.getenv(
        "GEMINI_API_KEY"
    )

    OLLAMA_BASE_URL = os.getenv(
        "OLLAMA_BASE_URL"
    )

    RATE_LIMIT_PER_MINUTE = int(
        os.getenv(
            "RATE_LIMIT_PER_MINUTE",
            60
        )
    )

    LOG_LEVEL = os.getenv(
        "LOG_LEVEL",
        "WARNING"
    )