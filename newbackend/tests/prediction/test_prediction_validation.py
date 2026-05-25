from app.validators.prediction_validator import (
    validate_prediction_input,
    validate_required_features
)


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


def test_validate_prediction_input_success():

    assert (
        validate_prediction_input(
            VALID_PAYLOAD
        )
        is True
    )


def test_validate_required_features_success():

    assert (
        validate_required_features(
            VALID_PAYLOAD
        )
        is True
    )


def test_validate_prediction_input_empty_payload():

    assert (
        validate_prediction_input({})
        is not True
    )


def test_validate_prediction_input_missing_required_feature():

    payload = VALID_PAYLOAD.copy()

    payload.pop("Age")

    assert (
        validate_required_features(
            payload
        )
        is not True
    )


def test_validate_prediction_input_invalid_gender():

    payload = VALID_PAYLOAD.copy()

    payload["Gender"] = 5

    assert (
        validate_prediction_input(
            payload
        )
        is not True
    )


def test_validate_prediction_input_invalid_age():

    payload = VALID_PAYLOAD.copy()

    payload["Age"] = 40

    assert (
        validate_prediction_input(
            payload
        )
        is not True
    )


def test_validate_prediction_input_invalid_sleep_duration():

    payload = VALID_PAYLOAD.copy()

    payload["Sleep_Duration"] = 15

    assert (
        validate_prediction_input(
            payload
        )
        is not True
    )


def test_validate_prediction_input_invalid_social_media_hours():

    payload = VALID_PAYLOAD.copy()

    payload["Social_Media_Hours"] = 24

    assert (
        validate_prediction_input(
            payload
        )
        is not True
    )


def test_validate_prediction_input_invalid_binary_field():

    payload = VALID_PAYLOAD.copy()

    payload["Physical_Activity"] = 7

    assert (
        validate_prediction_input(
            payload
        )
        is not True
    )


def test_validate_prediction_input_invalid_scale_value():

    payload = VALID_PAYLOAD.copy()

    payload["Melancholic"] = 10

    assert (
        validate_prediction_input(
            payload
        )
        is not True
    )


def test_validate_prediction_input_string_value():

    payload = VALID_PAYLOAD.copy()

    payload["Age"] = "twenty"

    assert (
        validate_prediction_input(
            payload
        )
        is not True
    )


def test_validate_prediction_input_none_value():

    payload = VALID_PAYLOAD.copy()

    payload["Age"] = None

    assert (
        validate_prediction_input(
            payload
        )
        is not True
    )


def test_validate_prediction_input_float_value():

    payload = VALID_PAYLOAD.copy()

    payload["Age"] = 22.5

    assert (
        validate_prediction_input(
            payload
        )
        is not True
    )