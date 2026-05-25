from flask import Response, request, g

from app.utils.security import sanitize_input


SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": (
        "default-src 'self'; "
        "object-src 'none'; "
        "base-uri 'self'; "
        "frame-ancestors 'none'"
    ),
    "Permissions-Policy": (
        "camera=(), microphone=(), geolocation=()"
    ),
}


def _sanitize_value(value):
    """
    Recursively sanitize JSON-compatible values.
    """

    if isinstance(value, str):
        return sanitize_input(value)

    if isinstance(value, dict):
        return {
            key: _sanitize_value(item)
            for key, item in value.items()
        }

    if isinstance(value, list):
        return [
            _sanitize_value(item)
            for item in value
        ]

    return value


def apply_security_headers(response: Response) -> Response:
    """
    Attach security-related HTTP headers
    to every outgoing response.
    """

    for header, value in SECURITY_HEADERS.items():
        response.headers[header] = value

    return response


def sanitize_request() -> None:
    """
    Sanitize incoming JSON payloads.

    Sanitized data is stored inside Flask g.
    Validation responsibility belongs to validators.
    """

    if not request.is_json:
        return

    request_data = request.get_json(silent=True)

    if request_data is None:
        return

    g.sanitized_json = _sanitize_value(request_data)