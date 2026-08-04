from fastapi import APIRouter

from models.deployment import DeploymentRequest

router = APIRouter()


@router.post("/deploy")
def deploy(request: DeploymentRequest):

    return {
        "status": "success",
        "message": "Deployment request received.",
        "deployment": request
    }