variable "cloud" {
  description = "Target cloud platform"
  type        = string
  default     = "Azure"
}

variable "workload" {
  description = "Workload type"
  type        = string
  default     = "General"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "Development"
}

variable "region" {
  description = "Deployment region"
  type        = string
  default     = "Central India"
}

variable "vmSize" {
  description = "Virtual machine size"
  type        = string
  default     = "Standard_B2s"
}

variable "storageType" {
  description = "Storage SKU/type"
  type        = string
  default     = "Standard_LRS"
}

variable "enableBackup" {
  description = "Enable backup"
  type        = bool
  default     = true
}

variable "enableMonitoring" {
  description = "Enable Azure monitoring"
  type        = bool
  default     = true
}

variable "enableAvailabilityZone" {
  description = "Enable availability zone"
  type        = bool
  default     = true
}

variable "enablePrivateEndpoint" {
  description = "Enable private endpoint"
  type        = bool
  default     = true
}

variable "enablePublicIP" {
  description = "Enable public IP"
  type        = bool
  default     = false
}