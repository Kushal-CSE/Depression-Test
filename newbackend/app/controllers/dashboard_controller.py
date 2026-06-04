from flask import jsonify, g

from app.services.dashboard_service import (
    get_dashboard_data
)


def dashboard_controller():

    # print(g.current_user)

    user = g.current_user

    result = get_dashboard_data(
        user=user
    )

    status_code = 200

    if not result["success"]:
        status_code = 404

    return jsonify(result), status_code