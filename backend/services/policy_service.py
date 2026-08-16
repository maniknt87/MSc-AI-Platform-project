# ==========================================
# Multi-Cloud Governance Policy Engine
# ==========================================

from config.settings import (
    ALLOWED_CLOUDS,
    ALLOWED_ENVIRONMENTS,
    ALLOWED_REGIONS,
)
from config.governance_policies import GOVERNANCE_POLICIES


# ==========================================
# AI Workloads
# ==========================================

AI_WORKLOADS = [
    "sentiment-analysis",
    "named-entity-recognition",
    "image-classification",
]


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

    if deployment.region not in ALLOWED_REGIONS.get(
        deployment.cloud, []
    ):
        return {
            "allowed": False,
            "policy": "Region Policy",
            "reason": (
                f"{deployment.region} is not an approved "
                f"region for {deployment.cloud}."
            )
        }

    return {"allowed": True}


# ------------------------------------------
# AI Workload Validation
# ------------------------------------------

def validate_ai_workload(deployment):

    if deployment.workload not in AI_WORKLOADS:
        return {
            "allowed": False,
            "policy": "AI Workload Policy",
            "reason": (
                f"{deployment.workload} is not an approved "
                "AI workload."
            )
        }

    return {"allowed": True}


# ------------------------------------------
# AI Model Validation
# ------------------------------------------

def validate_ai_model(deployment):

    if not deployment.modelId:
        return {
            "allowed": False,
            "policy": "AI Model Policy",
            "reason": "A validated AI model must be selected."
        }

    if not deployment.modelName:
        return {
            "allowed": False,
            "policy": "AI Model Policy",
            "reason": "AI model name is required."
        }

    return {"allowed": True}


# ------------------------------------------
# Identity & Access Governance
# ------------------------------------------

def validate_identity_governance(deployment):

    if not deployment.enableIdentityGovernance:
        return {
            "allowed": False,
            "policy": "Identity & Access Governance",
            "reason": (
                "Identity and access governance must be enabled "
                "for AI workloads."
            )
        }

    return {"allowed": True}


# ------------------------------------------
# Network Isolation
# ------------------------------------------

def validate_ai_network(deployment):

    if not deployment.enablePrivateEndpoint:
        return {
            "allowed": False,
            "policy": "AI Network Isolation Policy",
            "reason": (
                "Private network access must be enabled "
                "for AI workloads."
            )
        }

    if deployment.enablePublicIP:
        return {
            "allowed": False,
            "policy": "AI Network Isolation Policy",
            "reason": (
                "Public network exposure is not allowed "
                "for AI workloads."
            )
        }

    return {"allowed": True}


# ------------------------------------------
# Data Protection
# ------------------------------------------

def validate_ai_data_protection(deployment):

    if not deployment.enableBackup:
        return {
            "allowed": False,
            "policy": "AI Data Protection Policy",
            "reason": (
                "Data and workload protection must be "
                "enabled for AI workloads."
            )
        }

    return {"allowed": True}


# ------------------------------------------
# Model Governance
# ------------------------------------------

def validate_model_governance(deployment):

    if not deployment.enableModelGovernance:
        return {
            "allowed": False,
            "policy": "AI Model Governance Policy",
            "reason": (
                "Model governance must be enabled "
                "for AI workloads."
            )
        }

    return {"allowed": True}


# ------------------------------------------
# Monitoring
# ------------------------------------------

def validate_ai_monitoring(deployment):

    if not deployment.enableMonitoring:
        return {
            "allowed": False,
            "policy": "AI Monitoring Policy",
            "reason": (
                "Monitoring must be enabled "
                "for AI workloads."
            )
        }

    return {"allowed": True}


# ==========================================
# Existing IaaS Policies
# ==========================================

# ------------------------------------------
# Workload Validation
# ------------------------------------------

def validate_workload(deployment):

    if deployment.workload not in ["General", "AI"]:
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
            "reason": (
                f"{deployment.vmSize} is not allowed "
                f"in {deployment.environment}."
            )
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
            "reason": (
                f"{deployment.storageType} is not allowed "
                f"in {deployment.environment}."
            )
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
            "reason": (
                "Backup is not required for this environment."
            )
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

    return GOVERNANCE_POLICIES.get(
        cloud,
        {}
    ).get(environment)


# ==========================================
# Main Governance Validation
# ==========================================

def validate_policy(deployment):

    # --------------------------------------
    # AI Deployment Governance
    # --------------------------------------

    if deployment.workload in AI_WORKLOADS:

        validations = [
            validate_cloud,
            validate_environment,
            validate_ai_workload,
            validate_ai_model,
            validate_identity_governance,
            validate_ai_network,
            validate_ai_data_protection,
            validate_model_governance,
            validate_ai_monitoring,
        ]

    # --------------------------------------
    # Existing IaaS Governance
    # --------------------------------------

    else:

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
                "policy": (
                    validation.__name__
                    .replace("validate_", "")
                    .replace("_", " ")
                    .title()
                )
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