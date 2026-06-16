from flask import Blueprint

from app.controllers.prediction_controller import (
    predict_controller,
    save_manual_test_controller,
    get_prediction_controller,
    delete_prediction_controller
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


@prediction_blueprint.route(
    "/save",
    methods=["POST"]
)
@jwt_required()
def save_test_route():
    return save_manual_test_controller()

@prediction_blueprint.route(
    "/<string:prediction_id>",
    methods=["GET"]
)
@jwt_required()
def get_prediction_route(
    prediction_id: str
):
    return get_prediction_controller(
        prediction_id
    )


@prediction_blueprint.route(
    "/<string:prediction_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_prediction_route(
    prediction_id: str
):
    return delete_prediction_controller(
        prediction_id
    )

def register_prediction_routes(app):
    app.register_blueprint(
        prediction_blueprint
    )