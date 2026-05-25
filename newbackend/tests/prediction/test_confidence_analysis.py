import copy


VALID_PAYLOAD = {
    "Academic Status": 2,
    "Age": 22,
    "Agitation_Level": 1,
    "Alcohol_Consumption": 0,
    "Anhedonia_No_Joy": 1,
    "Crying_Frequency": 1,
    "Difficulty_Focusing": 1,
    "Difficulty_Speaking_Socially": 1,
    "Easy_Fatigue": 1,
    "Emotional_Alignment_Frequency": 1,
    "Fatigue_Frequency": 1,
    "Fear_Something_Bad": 1,
    "Feeling_Down": 1,
    "Feeling_Insignificant": 1,
    "Feels_Others_Are_Kind": 1,
    "Feels_Pitied": 1,
    "Financial_Pressure": 0,
    "Future_Hopelessness": 1,
    "Gender": 1,
    "Has_Debts": 0,
    "High_Appetite": 1,
    "Hopelessness_EndFeeling": 1,
    "Indecisiveness": 1,
    "Insomnia": 1,
    "Interest_Loss": 1,
    "Irritability": 1,
    "Isolation_Frequency": 1,
    "Lack_of_Pleasure": 1,
    "Life_Feels_Hard": 1,
    "Loneliness_Frequency": 1,
    "Lost_Someone_Recently": 0,
    "Low_Appetite": 1,
    "Low_Concentration": 1,
    "Meaninglessness": 1,
    "Melancholic": 1,
    "No_Support_Frequency": 1,
    "On_Medication": 0,
    "Performance_Decline": 1,
    "Physical_Activity": 1,
    "Presence_Not_Genuine_Frequency": 1,
    "Recent_Abuse_Experience": 0,
    "Relationship_Status_Divorced": 0,
    "Relationship_Status_In a Relationship": 0,
    "Relationship_Status_Married": 0,
    "Relationship_Status_Single": 1,
    "Relationships_Unimportant_Level": 1,
    "Residential_Area_Hall": 1,
    "Residential_Area_Outside Hall": 0,
    "Residential_Area_With family": 0,
    "Restlessness": 1,
    "Satisfied_Living_Environment": 1,
    "Self_Confidence_Erosion": 1,
    "Self_Perceived_Failure": 1,
    "Share_Feelings_Lack": 1,
    "Significant_Ailments": 0,
    "Sleep_Duration": 7,
    "Smoking": 0,
    "Social Economic Status": 3,
    "Social_LeftOut_Level": 1,
    "Social_Media_Hours": 4,
    "Social_Withdrawal": 1,
    "Suicidal_Thoughts": 0,
    "Work_While_Study": 0,
    "Workload_Academic_Demand": 1
}


def test_predict_endpoint_success(
    client,
    auth_headers
):

    response = client.post(
        "/predict",
        json=VALID_PAYLOAD,
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    expected_fields = {
        "prediction",
        "confidence_score",
        "severity",
        "model_used"
    }

    assert expected_fields.issubset(
        data.keys()
    )


def test_predict_endpoint_returns_valid_response(
    client,
    auth_headers
):

    response = client.post(
        "/predict",
        json=VALID_PAYLOAD,
        headers=auth_headers
    )

    data = response.get_json()

    assert isinstance(
        data["prediction"],
        int
    )

    assert isinstance(
        data["confidence_score"],
        float
    )

    assert isinstance(
        data["severity"],
        str
    )

    assert isinstance(
        data["model_used"],
        str
    )

    assert (
        0.0
        <= data["confidence_score"]
        <= 1.0
    )


def test_predict_endpoint_requires_authentication(
    client
):

    response = client.post(
        "/predict",
        json=VALID_PAYLOAD
    )

    assert response.status_code in (
        401,
        403
    )


def test_predict_endpoint_rejects_invalid_token(
    client
):

    response = client.post(
        "/predict",
        json=VALID_PAYLOAD,
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


def test_predict_endpoint_missing_required_feature(
    client,
    auth_headers
):

    payload = copy.deepcopy(
        VALID_PAYLOAD
    )

    payload.pop("Age")

    response = client.post(
        "/predict",
        json=payload,
        headers=auth_headers
    )

    assert response.status_code == 400


def test_predict_endpoint_invalid_type(
    client,
    auth_headers
):

    payload = copy.deepcopy(
        VALID_PAYLOAD
    )

    payload["Age"] = "twenty-two"

    response = client.post(
        "/predict",
        json=payload,
        headers=auth_headers
    )

    assert response.status_code == 400


def test_predict_endpoint_invalid_range(
    client,
    auth_headers
):

    payload = copy.deepcopy(
        VALID_PAYLOAD
    )

    payload["Sleep_Duration"] = 20

    response = client.post(
        "/predict",
        json=payload,
        headers=auth_headers
    )

    assert response.status_code == 400


def test_predict_endpoint_empty_payload(
    client,
    auth_headers
):

    response = client.post(
        "/predict",
        json={},
        headers=auth_headers
    )

    assert response.status_code == 400


def test_predict_endpoint_invalid_content_type(
    client,
    auth_headers
):

    response = client.post(
        "/predict",
        data="invalid-body",
        headers={
            **auth_headers,
            "Content-Type": "text/plain"
        }
    )

    assert response.status_code in (
        400,
        415
    )


def test_predict_endpoint_large_values(
    client,
    auth_headers
):

    payload = copy.deepcopy(
        VALID_PAYLOAD
    )

    payload["Social_Media_Hours"] = 999999

    response = client.post(
        "/predict",
        json=payload,
        headers=auth_headers
    )

    assert response.status_code == 400


def test_predict_endpoint_negative_values(
    client,
    auth_headers
):

    payload = copy.deepcopy(
        VALID_PAYLOAD
    )

    payload["Age"] = -10

    response = client.post(
        "/predict",
        json=payload,
        headers=auth_headers
    )

    assert response.status_code == 400


def test_predict_endpoint_returns_json(
    client,
    auth_headers
):

    response = client.post(
        "/predict",
        json=VALID_PAYLOAD,
        headers=auth_headers
    )

    assert response.content_type.startswith(
        "application/json"
    )