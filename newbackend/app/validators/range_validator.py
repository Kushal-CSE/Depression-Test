# app/validators/range_validator.py

def validate_feature_ranges(
    data: dict,
    feature_ranges: dict
) -> list[str]:
<<<<<<< HEAD
    """
    Validate numeric ranges for features.

    Args:
        data: Request payload
        feature_ranges:
            {
                "Age": (10, 100),
                "Sleep_Duration": (0, 24)
            }

    Returns:
        List of validation errors
    """

    errors = []

    for field, limits in feature_ranges.items():
=======

    errors = []

    for field, rule in feature_ranges.items():
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a

        if field not in data:
            continue

        value = data[field]

        if not isinstance(value, (int, float)):
            continue

<<<<<<< HEAD
        min_value, max_value = limits

        if value < min_value or value > max_value:

            errors.append(
                f"{field} must be between "
                f"{min_value} and {max_value}"
            )

    return errors


def validate_score_limits(
    score: float,
    min_score: float = 0.0,
    max_score: float = 1.0
) -> list[str]:
    """
    Validate confidence/probability score boundaries.
    """

    errors = []

    if score < min_score or score > max_score:

        errors.append(
            f"Score must be between "
            f"{min_score} and {max_score}"
        )
=======
        #
        # Allowed values
        #
        if isinstance(rule, list):

            if value not in rule:

                errors.append(
                    f"{field} must be one of {rule}"
                )

            continue

        #
        # Dictionary range
        #
        if isinstance(rule, dict):

            min_value = rule["min"]
            max_value = rule["max"]

            if value < min_value or value > max_value:

                errors.append(
                    f"{field} must be between "
                    f"{min_value} and {max_value}"
                )

            continue

        #
        # Tuple range (backward compatibility)
        #
        if isinstance(rule, tuple):

            min_value, max_value = rule

            if value < min_value or value > max_value:

                errors.append(
                    f"{field} must be between "
                    f"{min_value} and {max_value}"
                )
>>>>>>> 2c0096354ce35b841f35c6add81b449cd074e09a

    return errors