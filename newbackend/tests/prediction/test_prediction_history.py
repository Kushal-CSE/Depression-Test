def test_get_prediction_history_success(
    client,
    auth_headers,
    prediction_history_factory
):

    prediction_history_factory()

    response = client.get(
        "/predictions/history",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert "history" in data
    assert isinstance(
        data["history"],
        list
    )


def test_get_prediction_history_requires_authentication(
    client
):

    response = client.get(
        "/predictions/history"
    )

    assert response.status_code in (
        401,
        403
    )


def test_get_prediction_history_rejects_invalid_token(
    client
):

    response = client.get(
        "/predictions/history",
        headers={
            "Authorization": (
                "Bearer invalid-token"
            )
        }
    )

    assert response.status_code in (
        401,
        403
    )


def test_get_prediction_history_empty_response(
    client,
    auth_headers
):

    response = client.get(
        "/predictions/history",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["history"] == []


def test_get_prediction_history_returns_valid_structure(
    client,
    auth_headers,
    prediction_history_factory
):

    prediction_history_factory()

    response = client.get(
        "/predictions/history",
        headers=auth_headers
    )

    data = response.get_json()

    history_item = data["history"][0]

    expected_fields = {
        "prediction_id",
        "prediction",
        "confidence_score",
        "severity",
        "model_used",
        "created_at"
    }

    assert expected_fields.issubset(
        history_item.keys()
    )

    assert isinstance(
        history_item["prediction"],
        int
    )

    assert isinstance(
        history_item["confidence_score"],
        float
    )

    assert (
        0.0
        <= history_item["confidence_score"]
        <= 1.0
    )

    assert isinstance(
        history_item["severity"],
        str
    )

    assert isinstance(
        history_item["model_used"],
        str
    )

    assert isinstance(
        history_item["created_at"],
        str
    )


def test_get_prediction_history_multiple_records(
    client,
    auth_headers,
    prediction_history_factory
):

    prediction_history_factory(
        count=3
    )

    response = client.get(
        "/predictions/history",
        headers=auth_headers
    )

    data = response.get_json()

    assert len(
        data["history"]
    ) == 3


def test_get_prediction_history_user_isolation(
    client,
    auth_headers,
    prediction_history_factory
):

    prediction_history_factory(
        user_scope="another_user"
    )

    response = client.get(
        "/predictions/history",
        headers=auth_headers
    )

    data = response.get_json()

    assert data["history"] == []