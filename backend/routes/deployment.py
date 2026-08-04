from fastapi import APIRouter

from models.deployment import DeploymentRequest
from services.deployment_service import process_deployment

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