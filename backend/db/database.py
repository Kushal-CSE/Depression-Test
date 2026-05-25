from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGODB_URI")

client = MongoClient(MONGO_URI)
db = client["DepressionTest"]  # your DB name

def get_db():
    return db