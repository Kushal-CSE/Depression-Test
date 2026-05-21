from flask import Blueprint

from app.controllers.history_controller import (
    get_prediction_history_controller
)

from app.decorators.jwt_decorator import (
    jwt_required
)

history_blueprint = Blueprint(
    "prediction_history",
    __name__,
    url_prefix="/predictions"
)


@history_blueprint.route(
    "/history",
    methods=["GET"]
)
@jwt_required()
def get_prediction_history_route():
    return get_prediction_history_controller()


def register_history_routes(app):
    app.register_blueprint(history_blueprint)