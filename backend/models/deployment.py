from pydantic import BaseModel


class DeploymentRequest(BaseModel):

    # ---------------------------------------
    # Deployment Configuration
    # ---------------------------------------

    cloud: str

    workload: str

    environment: str

    region: str

    # ---------------------------------------
    # Infrastructure Configuration
    # ---------------------------------------

    vmSize: str

    storageType: str

    enableBackup: bool

    enableMonitoring: bool

    enableAvailabilityZone: bool

    enablePrivateEndpoint: bool

    enablePublicIP: bool