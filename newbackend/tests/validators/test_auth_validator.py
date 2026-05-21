from app.validators.auth_validator import (
    validate_signup_data,
    validate_login_data,
    validate_email,
    validate_password
)


def test_validate_signup_data_success():
    valid, error = validate_signup_data({
        "name": "Kushal",
        "email": "kushal@example.com",
        "password": "secret123"
    })

    assert valid is True
    assert error is None


def test_validate_signup_data_missing_name():
    valid, error = validate_signup_data({
        "email": "kushal@example.com",
        "password": "secret123"
    })

    assert valid is False
    assert error == "'name' is required"


def test_validate_signup_data_invalid_email():
    valid, error = validate_signup_data({
        "name": "Kushal",
        "email": "invalid-email",
        "password": "secret123"
    })

    assert valid is False
    assert error == "Invalid email format"


def test_validate_signup_data_short_password():
    valid, error = validate_signup_data({
        "name": "Kushal",
        "email": "kushal@example.com",
        "password": "123"
    })

    assert valid is False
    assert error == (
        "Password must be at least 6 characters long"
    )


def test_validate_login_data_success():
    valid, error = validate_login_data({
        "email": "kushal@example.com",
        "password": "secret123"
    })

    assert valid is True
    assert error is None


def test_validate_login_data_missing_email():
    valid, error = validate_login_data({
        "password": "secret123"
    })

    assert valid is False
    assert error == "Email is required"


def test_validate_login_data_missing_password():
    valid, error = validate_login_data({
        "email": "kushal@example.com"
    })

    assert valid is False
    assert error == "Password is required"


def test_validate_email_success():
    valid, error = validate_email(
        "kushal@example.com"
    )

    assert valid is True
    assert error is None


def test_validate_email_invalid():
    valid, error = validate_email(
        "invalid-email"
    )

    assert valid is False
    assert error == "Invalid email format"


def test_validate_password_success():
    valid, error = validate_password(
        "secret123"
    )

    assert valid is True
    assert error is None


def test_validate_password_short():
    valid, error = validate_password(
        "123"
    )

    assert valid is False
    assert error == (
        "Password must be at least 6 characters long"
    )