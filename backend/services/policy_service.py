# ==========================================
# Multi-Cloud Governance Policy Engine
# ==========================================

from config.settings import (
    ALLOWED_CLOUDS,
    ALLOWED_ENVIRONMENTS,
    ALLOWED_REGIONS,
    ALLOWED_WORKLOADS,
)


# ------------------------------------------
# Cloud Validation
# ------------------------------------------

def validate_cloud(deployment):

    if deployment.cloud not in ALLOWED_CLOUDS:
        return {
            "allowed": False,
            "policy": "Cloud Policy",
            "reason": "Cloud provider is not allowed."
        }

    return {"allowed": True}


# ------------------------------------------
# Environment Validation
# ------------------------------------------

def validate_environment(deployment):

    if deployment.environment not in ALLOWED_ENVIRONMENTS:
        return {
            "allowed": False,
            "policy": "Environment Policy",
            "reason": "Environment is not allowed."
        }

    return {"allowed": True}


# ------------------------------------------
# Region Validation
# ------------------------------------------

def validate_region(deployment):

    if deployment.region not in ALLOWED_REGIONS.get(deployment.cloud, []):
        return {
            "allowed": False,
            "policy": "Region Policy",
            "reason": f"{deployment.region} is not an approved region for {deployment.cloud}."
        }

    return {"allowed": True}


# ------------------------------------------
# Workload Validation
# ------------------------------------------

def validate_workload(deployment):

    if deployment.workload not in ALLOWED_WORKLOADS:
        return {
            "allowed": False,
            "policy": "Workload Policy",
            "reason": "Workload type is not allowed."
        }

    return {"allowed": True}


# ------------------------------------------
# Main Policy Validation
# ------------------------------------------

def validate_policy(deployment):

    validations = [
        validate_cloud,
        validate_environment,
        validate_region,
        validate_workload,
    ]

    for validation in validations:

        result = validation(deployment)

        if not result["allowed"]:
            return result

    return {
        "allowed": True,
        "policy": "Governance",
        "reason": "All governance policies passed successfully."
    }