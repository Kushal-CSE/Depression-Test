import os
from dotenv import load_dotenv
from app import create_app
from flask_cors import CORS

load_dotenv()
app = create_app()
CORS(
    app,
    resources={r"/*": {"origins": [
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]}},
    supports_credentials=True
)

if __name__ == "__main__":

    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_DEBUG", "False").lower() == "true"
    app.run(
        host=host,
        port=port,
        debug=debug
    )