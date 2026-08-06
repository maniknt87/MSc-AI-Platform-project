# ==========================================
# Multi-Cloud Governance Policy Engine
# ==========================================

from config.settings import (
    ALLOWED_CLOUDS,
    ALLOWED_ENVIRONMENTS,
    ALLOWED_REGIONS,
    ALLOWED_WORKLOADS,
)
from config.governance_policies import GOVERNANCE_POLICIES

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
# VM Size Validation
# ------------------------------------------

def validate_vm_size(deployment):

    policy = get_environment_policy(
    deployment.cloud,
    deployment.environment
)

    allowed_vm_sizes = policy["vm_size"]["allowed"]

    if deployment.vmSize not in allowed_vm_sizes:

        return {
            "allowed": False,
            "policy": policy["vm_size"]["name"],
            "reason": f"{deployment.vmSize} is not allowed in {deployment.environment}."
        }

    return {"allowed": True}


# ------------------------------------------
# Storage Validation
# ------------------------------------------

def validate_storage(deployment):

    policy = get_environment_policy(
    deployment.cloud,
    deployment.environment
)

    allowed_storage = policy["storage"]["allowed"]

    if deployment.storageType not in allowed_storage:

        return {
            "allowed": False,
            "policy": policy["storage"]["name"],
            "reason": f"{deployment.storageType} is not allowed in {deployment.environment}."
        }

    return {"allowed": True}


# ------------------------------------------
# Backup Validation
# ------------------------------------------

def validate_backup(deployment):

    policy = get_environment_policy(
    deployment.cloud,
    deployment.environment
)

    required = policy["backup"]["required"]

    if required and not deployment.enableBackup:

        return {
            "allowed": False,
            "policy": policy["backup"]["name"],
            "reason": "Backup must be enabled."
        }

    if not required and deployment.enableBackup:

        return {
            "allowed": False,
            "policy": policy["backup"]["name"],
            "reason": "Backup is not required for this environment."
        }

    return {"allowed": True}


# ------------------------------------------
# Monitoring Validation
# ------------------------------------------

def validate_monitoring(deployment):

    policy = get_environment_policy(
    deployment.cloud,
    deployment.environment
)

    required = policy["monitoring"]["required"]

    if required and not deployment.enableMonitoring:

        return {
            "allowed": False,
            "policy": policy["monitoring"]["name"],
            "reason": "Monitoring must be enabled."
        }

    return {"allowed": True}


# ------------------------------------------
# Private Endpoint Validation
# ------------------------------------------

def validate_private_endpoint(deployment):

    policy = get_environment_policy(
    deployment.cloud,
    deployment.environment
)

    required = policy["private_endpoint"]["required"]

    if required and not deployment.enablePrivateEndpoint:

        return {
            "allowed": False,
            "policy": policy["private_endpoint"]["name"],
            "reason": "Private Endpoint is mandatory."
        }

    return {"allowed": True}


# ------------------------------------------
# Public IP Validation
# ------------------------------------------

def validate_public_ip(deployment):

    policy = get_environment_policy(
    deployment.cloud,
    deployment.environment
)

    allowed = policy["public_ip"]["allowed"]

    if not allowed and deployment.enablePublicIP:

        return {
            "allowed": False,
            "policy": policy["public_ip"]["name"],
            "reason": "Public IP is not allowed."
        }

    return {"allowed": True}
# ==========================================
# Load Environment Policy
# ==========================================

def get_environment_policy(cloud, environment):

    return GOVERNANCE_POLICIES.get(cloud, {}).get(environment)


# ==========================================
# Evaluate Single Policy
# ==========================================

def evaluate_policy(policy_name, passed, reason=""):

    return {

        "policy": policy_name,

        "status": "PASS" if passed else "FAIL",

        "reason": reason

    }
# ------------------------------------------
# Main Governance Validation
# ------------------------------------------

def validate_policy(deployment):

    validations = [

    validate_cloud,
    validate_environment,
    validate_region,
    validate_workload,
    validate_vm_size,
    validate_storage,
    validate_backup,
    validate_monitoring,
    validate_private_endpoint,
    validate_public_ip,

]

    results = []

    passed = 0

    failed = 0

    for validation in validations:

        result = validation(deployment)

        if result["allowed"]:

            results.append({

                "status": "PASS",

                "policy": validation.__name__.replace("validate_", "").replace("_", " ").title()

            })

            passed += 1

        else:

            results.append({

                "status": "FAIL",

                "policy": result["policy"],

                "reason": result["reason"]

            })

            failed += 1

    compliance_score = round(
        (passed / len(validations)) * 100
    )

    return {

        "allowed": failed == 0,

        "passed": passed,

        "failed": failed,

        "compliance_score": compliance_score,

        "results": results

    }