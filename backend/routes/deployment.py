from fastapi import APIRouter

from models.deployment import DeploymentRequest
from services.deployment_service import process_deployment
from services.deployment_history import get_deployment_history

router = APIRouter()


@router.post("/deploy")
def deploy(request: DeploymentRequest):

    deployment = process_deployment(request)

    return {
        "status": "success",
        "message": "Deployment pipeline queued successfully.",
        "deployment": request.model_dump(),
        "result": deployment
    }


@router.get("/deployments")
def get_deployments():

    return {
        "count": len(get_deployment_history()),
        "deployments": get_deployment_history()
    }