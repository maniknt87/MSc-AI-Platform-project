# ---------------------------------------
# Multi-Cloud Governance Policy Engine
# ---------------------------------------

ALLOWED_CLOUDS = [
    "Azure",
    "AWS"
]

ALLOWED_ENVIRONMENTS = [
    "Development",
    "Testing",
    "Production"
]

ALLOWED_REGIONS = {
    "Azure": [
        "Central India",
        "East US",
        "West Europe"
    ],

    "AWS": [
        "South India",
        "US East (N. Virginia)",
        "Europe (Ireland)"
    ]
}

ALLOWED_WORKLOADS = [
    "General",
    "AI"
]


def validate_policy(deployment):

    # -------------------------
    # Cloud Validation
    # -------------------------

    if deployment.cloud not in ALLOWED_CLOUDS:
        return {
            "allowed": False,
            "reason": "Cloud provider is not allowed."
        }

    # -------------------------
    # Environment Validation
    # -------------------------

    if deployment.environment not in ALLOWED_ENVIRONMENTS:
        return {
            "allowed": False,
            "reason": "Environment is not allowed."
        }

    # -------------------------
    # Region Validation
    # -------------------------

    if deployment.region not in ALLOWED_REGIONS[deployment.cloud]:
        return {
            "allowed": False,
            "reason": f"{deployment.region} is not an approved region for {deployment.cloud}."
        }

    # -------------------------
    # Workload Validation
    # -------------------------

    if deployment.workload not in ALLOWED_WORKLOADS:
        return {
            "allowed": False,
            "reason": "Workload type is not allowed."
        }

    # -------------------------
    # Policy Passed
    # -------------------------

    return {
        "allowed": True,
        "reason": "Policy validation successful."
    }