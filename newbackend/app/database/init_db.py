# app/database/init_db.py

from app.database.connection import get_db

def initialize_database():
    db = get_db()

    db.predictions.create_index(
        "prediction_id",
        unique=True
    )