terraform {
  required_version = ">= 1.5.0"
}

# --------------------------------------------------
# This is a demo configuration.
# No cloud resources are created yet.
# --------------------------------------------------

locals {
  platform_name = "Multi-Cloud Governance & Landing Zone Orchestration Platform"

  version = "1.0"

  deployment_status = "Ready"
}

output "platform_name" {
  value = local.platform_name
}

output "version" {
  value = local.version
}

output "deployment_status" {
  value = local.deployment_status
}