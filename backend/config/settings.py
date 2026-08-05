"""
-------------------------------------------------------
Platform Configuration
Multi-Cloud Governance & Landing Zone Orchestration Platform
-------------------------------------------------------
"""

from pathlib import Path

# -------------------------------------------------------
# Platform Information
# -------------------------------------------------------

PLATFORM_NAME = "Multi-Cloud Governance & Landing Zone Orchestration Platform"

PLATFORM_VERSION = "1.0"

# -------------------------------------------------------
# Terraform Configuration
# -------------------------------------------------------

BASE_DIRECTORY = Path(__file__).resolve().parent.parent

TERRAFORM_DIRECTORY = BASE_DIRECTORY / "terraform"

# -------------------------------------------------------
# Governance Configuration
# -------------------------------------------------------

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