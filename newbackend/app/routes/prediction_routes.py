from flask import Blueprint

from app.controllers.prediction_controller import (
    predict_controller
)

from app.decorators.jwt_decorator import (
    jwt_required
)

prediction_blueprint = Blueprint(
    "predictions",
    __name__,
    url_prefix="/predictions"
)


@prediction_blueprint.route(
    "/predict",
    methods=["POST"]
)
@jwt_required()
def predict_route():
    return predict_controller()


def register_prediction_routes(app):
    app.register_blueprint(prediction_blueprint)