# app/schemas/history_schema.py

from typing import Any, Mapping, Optional
from datetime import datetime


def _serialize_datetime(
    value: Optional[Any]
) -> Optional[str]:
    """
    Safely serialize datetime values.
    """

    if value is None:
        return None

    if isinstance(value, datetime):
        return value.isoformat()

    return str(value)


def serialize_prediction_history(
    history_records: list[Mapping[str, Any]]
) -> dict:
    """
    Serialize prediction history records into
    API-safe response payload.
    """

    serialized_records = []

    for record in history_records:

        confidence = record.get(
            "confidence",
            record.get("confidence_score", 0.0)
        )

        prediction = record.get(
            "prediction",
            record.get("final_prediction")
        )

        record_id = record.get("id") or record.get("_id")

        serialized_records.append({
            "id": (
                str(record_id)
                if record_id is not None
                else None
            ),
            "prediction": prediction,
            "confidence": round(
                float(confidence or 0.0),
                4
            ),
            "severity": record.get("severity"),
            "created_at": _serialize_datetime(
                record.get("created_at")
            )
        })

    return {
        "history": serialized_records
    }