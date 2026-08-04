from datetime import datetime

# In-memory deployment history
deployment_history = []


def generate_deployment_id():

    deployment_number = len(deployment_history) + 1

    return f"DEP-{deployment_number:05d}"


def save_deployment(deployment, pipeline):

    deployment_record = {
        "deployment_id": generate_deployment_id(),
        "cloud": deployment.cloud,
        "workload": deployment.workload,
        "environment": deployment.environment,
        "region": deployment.region,
        "status": pipeline["status"],
        "pipeline_name": pipeline["pipeline_name"],
        "pipeline_id": pipeline["pipeline_id"],
        "provider": pipeline["provider"],
        "created_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    deployment_history.append(deployment_record)

    return deployment_record


def get_deployment_history():

    return deployment_history