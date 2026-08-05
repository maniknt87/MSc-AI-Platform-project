output "deployment_summary" {

  value = {

    cloud = var.cloud

    environment = var.environment

    region = var.region

    workload = var.workload

  }

}