import pytest

from ml.inference.ensemble_predictor import (
    run_all_models
)

from ml.preprocessing.feature_selector import (
    select_x1_features,
    select_x3_features
)


VALID_INPUT = {
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


def test_select_x1_features_returns_data():

    result = select_x1_features(
        VALID_INPUT
    )

    assert result is not None
    assert len(result) > 0


def test_select_x3_features_returns_data():

    result = select_x3_features(
        VALID_INPUT
    )

    assert result is not None
    assert len(result) > 0


def test_select_x3_features_contains_expected_fields():

    result = select_x3_features(
        VALID_INPUT
    )

    assert "Age" in result
    assert "Feeling_Down" in result
    assert "Melancholic" in result


def test_x3_contains_more_features_than_x1():

    x1_features = select_x1_features(
        VALID_INPUT
    )

    x3_features = select_x3_features(
        VALID_INPUT
    )

    assert len(x3_features) >= len(
        x1_features
    )


def test_run_all_models_returns_complete_output():

    result = run_all_models(
        VALID_INPUT
    )

    expected_keys = {
        "svm",
        "logistic",
        "randomforest",
        "ensemble"
    }

    assert expected_keys.issubset(
        result.keys()
    )


def test_model_outputs_have_valid_structure():

    result = run_all_models(
        VALID_INPUT
    )

    for model_name in [
        "svm",
        "logistic",
        "randomforest"
    ]:

        model_output = result[
            model_name
        ]

        assert "prediction" in model_output
        assert "confidence_score" in model_output

        assert isinstance(
            model_output["prediction"],
            int
        )

        assert isinstance(
            model_output["confidence_score"],
            float
        )

        assert (
            0.0
            <= model_output["confidence_score"]
            <= 1.0
        )


def test_ensemble_output_has_valid_structure():

    result = run_all_models(
        VALID_INPUT
    )

    ensemble = result["ensemble"]

    assert "prediction" in ensemble
    assert "confidence_score" in ensemble

    assert isinstance(
        ensemble["prediction"],
        int
    )

    assert isinstance(
        ensemble["confidence_score"],
        float
    )

    assert (
        0.0
        <= ensemble["confidence_score"]
        <= 1.0
    )


def test_run_all_models_rejects_invalid_input():

    invalid_input = {
        "Age": "invalid",
        "Gender": 99
    }

    with pytest.raises(Exception):
        run_all_models(
            invalid_input
        )


def test_feature_selectors_handle_empty_input():

    empty_input = {}

    x1_result = select_x1_features(
        empty_input
    )

    x3_result = select_x3_features(
        empty_input
    )

    assert x1_result is not None
    assert x3_result is not None