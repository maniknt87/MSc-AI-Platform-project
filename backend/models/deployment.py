from pydantic import BaseModel


class DeploymentRequest(BaseModel):

    # ---------------------------------------
    # Deployment Configuration
    # ---------------------------------------

    cloud: str

    workload: str

    environment: str

    # Kept temporarily for backend compatibility.
    # Region is no longer selected in the AI Platform UI.
    region: str = ""

    # ---------------------------------------
    # AI Configuration
    # ---------------------------------------

    modelId: str = ""

    modelName: str = ""

    # ---------------------------------------
    # AI Security & Governance
    # ---------------------------------------

    enableIdentityGovernance: bool = True

    enableModelGovernance: bool = True

    # ---------------------------------------
    # Existing Platform Controls
    # ---------------------------------------

    enableBackup: bool = True

    enableMonitoring: bool = True

    enableAvailabilityZone: bool = True

    enablePrivateEndpoint: bool = True

    enablePublicIP: bool = False

    # ---------------------------------------
    # Legacy Infrastructure Fields
    # ---------------------------------------
    # Retained temporarily so the existing
    # Landing Zone deployment path remains
    # compatible while the AI platform is
    # being integrated.

    vmSize: str = ""

    storageType: str = ""