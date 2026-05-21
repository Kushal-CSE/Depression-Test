import json


VALID_RESPONSE = {
    "prediction": 1,
    "confidence_score": 0.87,
    "severity": "moderate",
    "model_used": "svm_x3_ces-d",
    "recommendation": (
        "Consider reaching out "
        "to trusted people."
    )
}


def test_prediction_response_contains_required_fields():

    required_fields = {
        "prediction",
        "confidence_score",
        "severity",
        "model_used"
    }

    assert required_fields.issubset(
        VALID_RESPONSE.keys()
    )


def test_prediction_response_prediction_is_valid():

    prediction = VALID_RESPONSE[
        "prediction"
    ]

    assert isinstance(
        prediction,
        int
    )

    assert prediction >= 0


def test_prediction_response_confidence_score_is_valid():

    confidence = VALID_RESPONSE[
        "confidence_score"
    ]

    assert isinstance(
        confidence,
        float
    )

    assert 0.0 <= confidence <= 1.0


def test_prediction_response_severity_is_valid():

    allowed_severity = {
        "minimal",
        "mild",
        "moderate",
        "severe"
    }

    severity = VALID_RESPONSE[
        "severity"
    ]

    assert isinstance(
        severity,
        str
    )

    assert severity in allowed_severity


def test_prediction_response_model_used_is_valid():

    model_used = VALID_RESPONSE[
        "model_used"
    ]

    assert isinstance(
        model_used,
        str
    )

    assert len(model_used) > 0


def test_prediction_response_recommendation_is_valid():

    recommendation = VALID_RESPONSE[
        "recommendation"
    ]

    assert isinstance(
        recommendation,
        str
    )

    assert len(recommendation) > 0


def test_prediction_response_is_serializable():

    serialized = json.dumps(
        VALID_RESPONSE
    )

    assert isinstance(
        serialized,
        str
    )