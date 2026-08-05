import subprocess
from config.settings import TERRAFORM_DIRECTORY


# ----------------------------------------------------
# Execute Terraform Command
# ----------------------------------------------------

def run_terraform_command(command):

    result = subprocess.run(
        command,
        cwd=TERRAFORM_DIRECTORY,
        capture_output=True,
        text=True,
        shell=True,
    )

    return {
        "success": result.returncode == 0,
        "stdout": result.stdout,
        "stderr": result.stderr,
    }


# ----------------------------------------------------
# Terraform Init
# ----------------------------------------------------

def terraform_init():

    return run_terraform_command(
        "terraform init"
    )


# ----------------------------------------------------
# Terraform Validate
# ----------------------------------------------------

def terraform_validate():

    return run_terraform_command(
        "terraform validate"
    )


# ----------------------------------------------------
# Terraform Plan
# ----------------------------------------------------

def terraform_plan(deployment):

    command = (
        f'terraform plan '
        f'-var="cloud={deployment.cloud}" '
        f'-var="workload={deployment.workload}" '
        f'-var="environment={deployment.environment}" '
        f'-var="region={deployment.region}"'
    )

    return run_terraform_command(command)


# ----------------------------------------------------
# Complete Terraform Workflow
# ----------------------------------------------------

def execute_terraform(deployment):

    init_result = terraform_init()

    if not init_result["success"]:

        return {
            "status": "FAILED",
            "step": "terraform init",
            "result": init_result
        }

    validate_result = terraform_validate()

    if not validate_result["success"]:

        return {
            "status": "FAILED",
            "step": "terraform validate",
            "result": validate_result
        }

    plan_result = terraform_plan(deployment)

    if not plan_result["success"]:

        return {
            "status": "FAILED",
            "step": "terraform plan",
            "result": plan_result
        }

    return {

        "status": "SUCCESS",

        "message": "Terraform execution completed successfully.",

        "terraform": {

            "init": init_result,

            "validate": validate_result,

            "plan": plan_result

        }

    }