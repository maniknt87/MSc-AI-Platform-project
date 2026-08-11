variable "aws_region" {
  description = "AWS region for the Landing Zone"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "Development"
}

variable "platform_name" {
  description = "Name of the multi-cloud platform"
  type        = string
  default     = "Multi-Cloud Governance and Landing Zone Orchestration Platform"
}