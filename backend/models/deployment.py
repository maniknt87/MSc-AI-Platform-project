from pydantic import BaseModel


class DeploymentRequest(BaseModel):
    cloud: str
    workload: str
    environment: str
    region: str