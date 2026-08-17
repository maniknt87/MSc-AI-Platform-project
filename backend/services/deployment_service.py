import threading

from fastapi import HTTPException

from services.azure_devops import queue_pipeline
from services.deployment_history import save_deployment
from services.policy_service import validate_policy
from services.terraform_service import execute_terraform
from services.deployment_lifecycle import start_deployment_lifecycle
from services.policy_service import AI_WORKLOADS


# =====================================================
# Background Deployment Worker
# =====================================================

def run_deployment_background(
    deployment,
    deployment_plan,
):

    try:

        # ---------------------------------------------
        # Queue Azure DevOps Pipeline
        # ---------------------------------------------

        pipeline = queue_pipeline(deployment)

        # ---------------------------------------------
        # Execute Terraform
        # ---------------------------------------------

        terraform_result = execute_terraform(
            deployment
        )

        # ---------------------------------------------
        # Save Deployment History
        # ---------------------------------------------

        deployment_record = save_deployment(
            deployment,
            pipeline
        )

        # ---------------------------------------------
        # Start Deployment Lifecycle
        # ---------------------------------------------

        start_deployment_lifecycle(
            deployment_record["deployment_id"]
        )

        print(
            "Background deployment started successfully:",
            deployment_record["deployment_id"]
        )

        print(
            "Terraform result:",
            terraform_result
        )

    except Exception as error:

        # ---------------------------------------------
        # Background errors should not terminate
        # the FastAPI request.
        # ---------------------------------------------

        print(
            "Background deployment error:",
            str(error)
        )


# =====================================================
# Process Deployment
# =====================================================

def process_deployment(deployment):

    cloud = deployment.cloud
    workload = deployment.workload
    environment = deployment.environment
    region = deployment.region

    # =================================================
    # GOVERNANCE GATE
    # =================================================

    policy_result = validate_policy(
        deployment
    )

    # ---------------------------------------------
    # Governance failure = HARD STOP
    # ---------------------------------------------

    if not policy_result["allowed"]:

        raise HTTPException(
            status_code=400,
            detail=policy_result
        )

    # =================================================
    # Deployment Plan
    # =================================================

    deployment_plan = {}

    # =================================================
    # Azure
    # =================================================

    if cloud == "Azure":

        # -----------------------------------------
        # General Workload
        # -----------------------------------------

        if workload == "General":

            deployment_plan = {

                "cloud": cloud,

                "pipeline":
                    "azure-general-pipeline",

                "terraform":
                    "azure-general.tfvars",

                "environment":
                    environment,

                "region":
                    region,

                "status":
                    "Ready for Azure Deployment"

            }

        # -----------------------------------------
        # AI Workload
        # -----------------------------------------

        elif workload in AI_WORKLOADS:

            deployment_plan = {

                "cloud": cloud,

                "pipeline":
                    "azure-ai-pipeline",

                "terraform":
                    "azure-ai.tfvars",

                "environment":
                    environment,

                "region":
                    region,

                "status":
                    "Ready for Azure AI Deployment"

            }

    # =================================================
    # AWS
    # =================================================

    elif cloud == "AWS":

        # -----------------------------------------
        # General Workload
        # -----------------------------------------

        if workload == "General":

            deployment_plan = {

                "cloud": cloud,

                "pipeline":
                    "aws-general-pipeline",

                "terraform":
                    "aws-general.tfvars",

                "environment":
                    environment,

                "region":
                    region,

                "status":
                    "Ready for AWS Deployment"

            }

        # -----------------------------------------
        # AI Workload
        # -----------------------------------------

        elif workload in AI_WORKLOADS:

            deployment_plan = {

                "cloud": cloud,

                "pipeline":
                    "aws-ai-pipeline",

                "terraform":
                    "aws-ai.tfvars",

                "environment":
                    environment,

                "region":
                    region,

                "status":
                    "Ready for AWS AI Deployment"

            }

    # =================================================
    # Unsupported Deployment
    # =================================================

    if not deployment_plan:

        raise HTTPException(

            status_code=400,

            detail={
                "status": "Unsupported Deployment",
                "message":
                    "The selected cloud and workload "
                    "combination is not supported."
            }

        )

    # =================================================
    # START BACKGROUND DEPLOYMENT
    # =================================================

    deployment_thread = threading.Thread(

        target=run_deployment_background,

        args=(
            deployment,
            deployment_plan,
        ),

        daemon=True

    )

    deployment_thread.start()

    # =================================================
    # RETURN IMMEDIATELY
    # =================================================

    return {

        "status": "QUEUED",

        "message":
            "Deployment pipeline queued successfully.",

        "plan":
            deployment_plan,

        "policy":
            policy_result,

        "deployment":
            {

                "cloud":
                    cloud,

                "workload":
                    workload,

                "environment":
                    environment,

                "region":
                    region

            }

    }