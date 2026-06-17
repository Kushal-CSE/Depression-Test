# run.py

import os
from dotenv import load_dotenv
from app import create_app
from flask_cors import CORS

load_dotenv()
app = create_app()


if __name__ == "__main__":

    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_DEBUG", "False").lower() == "true"


    CORS(
        app,
        resources={
            r"/*": {
                "origins": [
                    "http://localhost:3000", 
                    "http://127.0.0.1:3000", 
                    "http://localhost:3001"
                ],
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Headers"]
            }
        },
        supports_credentials=True
    )
    app.run(
        host=host,
        port=port,
        debug=debug
    )
# import os
# from dotenv import load_dotenv
# from flask import Flask
# from flask_cors import CORS
# from app import create_app

# load_dotenv()
# app = create_app()

# CORS(
#     app,
#     resources={
#         r"/predictions/*": {
#             "origins": [
#                 "http://localhost:3000",
#                 "http://127.0.0.1:3000",
#                 "http://localhost:3001",
#             ],
#             "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#             "allow_headers": ["Content-Type", "Authorization"],
#             "supports_credentials": True,
#         }
#     },
# )

# if __name__ == "__main__":
#     host = os.getenv("HOST", "0.0.0.0")
#     port = int(os.getenv("PORT", 5000))
#     debug = os.getenv("FLASK_DEBUG", "False").lower() == "true"

#     app.run(host=host, port=port, debug=debug)