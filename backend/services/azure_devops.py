import uuid
from datetime import datetime


def queue_pipeline(deployment):

    """
    Mock Azure DevOps Pipeline Queue

    This function simulates queuing a pipeline.
    Later, this will call the Azure DevOps REST API.
    """

    pipeline_id = str(uuid.uuid4())[:8]

    return {
        "provider": "Azure DevOps",
        "pipeline_name": f"{deployment.cloud}-{deployment.workload}".lower(),
        "pipeline_id": pipeline_id,
        "queued_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "status": "Queued"
    }