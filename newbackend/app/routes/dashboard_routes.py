from flask import Blueprint

from app.controllers.dashboard_controller import (
    dashboard_controller
)

dashboard_blueprint = Blueprint(
    "dashboard",
    __name__,
    url_prefix="/dashboard"
)


@dashboard_blueprint.route(
    "",
    methods=["GET"]
)
def dashboard():
    return dashboard_controller()


def register_dashboard_routes(app):
    app.register_blueprint(
        dashboard_blueprint
    )