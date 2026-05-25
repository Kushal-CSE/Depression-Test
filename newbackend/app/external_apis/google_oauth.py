from typing import Any, Dict, Optional

import requests

from flask import current_app
from requests.exceptions import (
    RequestException
)


GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)

REQUEST_TIMEOUT = 10


def get_google_provider_config(
) -> Optional[Dict[str, Any]]:
    """
    Fetch Google OAuth/OpenID provider
    configuration.
    """

    try:

        response = requests.get(
            GOOGLE_DISCOVERY_URL,
            timeout=REQUEST_TIMEOUT
        )

        response.raise_for_status()

        provider_config = response.json()

        required_keys = [
            "authorization_endpoint",
            "token_endpoint",
            "userinfo_endpoint"
        ]

        for key in required_keys:

            if key not in provider_config:
                return None

        return provider_config

    except (
        RequestException,
        ValueError
    ):
        return None


def exchange_auth_code(
    code: str
) -> Optional[Dict[str, Any]]:
    """
    Exchange Google authorization code
    for OAuth tokens.
    """

    if not code:
        return None

    provider_config = (
        get_google_provider_config()
    )

    if not provider_config:
        return None

    token_endpoint = provider_config.get(
        "token_endpoint"
    )

    if not token_endpoint:
        return None

    client_id = current_app.config.get(
        "GOOGLE_CLIENT_ID"
    )

    client_secret = current_app.config.get(
        "GOOGLE_CLIENT_SECRET"
    )

    redirect_uri = current_app.config.get(
        "GOOGLE_REDIRECT_URI"
    )

    if (
        not client_id
        or not client_secret
        or not redirect_uri
    ):
        return None

    payload = {
        "client_id": client_id,
        "client_secret": client_secret,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": redirect_uri
    }

    headers = {
        "Content-Type": (
            "application/"
            "x-www-form-urlencoded"
        )
    }

    try:

        response = requests.post(
            token_endpoint,
            data=payload,
            headers=headers,
            timeout=REQUEST_TIMEOUT
        )

        response.raise_for_status()

        token_data = response.json()

        if (
            "access_token"
            not in token_data
        ):
            return None

        return {
            "access_token": (
                token_data.get(
                    "access_token"
                )
            ),
            "id_token": token_data.get(
                "id_token"
            ),
            "expires_in": token_data.get(
                "expires_in"
            ),
            "token_type": token_data.get(
                "token_type"
            )
        }

    except (
        RequestException,
        ValueError
    ):
        return None


def get_google_user_info(
    access_token: str
) -> Optional[Dict[str, Any]]:
    """
    Retrieve authenticated Google
    user profile information.
    """

    if not access_token:
        return None

    provider_config = (
        get_google_provider_config()
    )

    if not provider_config:
        return None

    userinfo_endpoint = (
        provider_config.get(
            "userinfo_endpoint"
        )
    )

    if not userinfo_endpoint:
        return None

    try:

        response = requests.get(
            userinfo_endpoint,
            headers={
                "Authorization": (
                    f"Bearer {access_token}"
                )
            },
            timeout=REQUEST_TIMEOUT
        )

        response.raise_for_status()

        user_data = response.json()

        required_fields = [
            "sub",
            "email",
            "name"
        ]

        for field in required_fields:

            if not user_data.get(field):
                return None

        return {
            "sub": user_data.get("sub"),
            "email": user_data.get("email"),
            "name": user_data.get("name"),
            "picture": user_data.get(
                "picture"
            ),
            "email_verified": user_data.get(
                "email_verified",
                False
            )
        }

    except (
        RequestException,
        ValueError
    ):
        return None