from services.azure_devops import queue_pipeline
from services.deployment_history import save_deployment


def process_deployment(deployment):

    cloud = deployment.cloud
    workload = deployment.workload
    environment = deployment.environment
    region = deployment.region

    deployment_plan = {}

    # ------------------------------------
    # Azure Deployment
    # ------------------------------------

    if cloud == "Azure":

        if workload == "General":

            deployment_plan = {
                "cloud": cloud,
                "pipeline": "azure-general-pipeline",
                "terraform": "azure-general.tfvars",
                "environment": environment,
                "region": region,
                "status": "Ready for Azure Deployment"
            }

        elif workload == "AI":

            deployment_plan = {
                "cloud": cloud,
                "pipeline": "azure-ai-pipeline",
                "terraform": "azure-ai.tfvars",
                "environment": environment,
                "region": region,
                "status": "Ready for Azure AI Deployment"
            }

    # ------------------------------------
    # AWS Deployment
    # ------------------------------------

    elif cloud == "AWS":

        if workload == "General":

            deployment_plan = {
                "cloud": cloud,
                "pipeline": "aws-general-pipeline",
                "terraform": "aws-general.tfvars",
                "environment": environment,
                "region": region,
                "status": "Ready for AWS Deployment"
            }

        elif workload == "AI":

            deployment_plan = {
                "cloud": cloud,
                "pipeline": "aws-ai-pipeline",
                "terraform": "aws-ai.tfvars",
                "environment": environment,
                "region": region,
                "status": "Ready for AWS AI Deployment"
            }

    if not deployment_plan:

        return {
            "status": "Unsupported Deployment"
        }

    # Queue Pipeline
    pipeline = queue_pipeline(deployment)

    # Save Deployment History
    deployment_record = save_deployment(
        deployment,
        pipeline
    )

    return {
        "plan": deployment_plan,
        "pipeline": pipeline,
        "deployment_record": deployment_record
    }