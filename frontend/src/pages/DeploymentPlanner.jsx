import { useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

import CloudStep from "../components/wizard/CloudStep";
import WorkloadStep from "../components/wizard/WorkloadStep";
import EnvironmentStep from "../components/wizard/EnvironmentStep";
import RegionStep from "../components/wizard/RegionStep";
import ReviewStep from "../components/wizard/ReviewStep";

import { deployLandingZone } from "../services/api";
import InfrastructureStep from "../components/wizard/InfrastructureStep";

const steps = [
  "Cloud",
  "Workload",
  "Environment",
  "Region",
  "Infrastructure",
  "Review"
];

function DeploymentPlanner() {

  const [activeStep, setActiveStep] = useState(0);

  const [loading, setLoading] = useState(false);

  const [deploymentRequest, setDeploymentRequest] = useState({

    cloud: "",

    workload: "",

    environment: "",

    region: "",

    vmSize: "",

    storageType: "",

    enableBackup: true,

    enableMonitoring: true,

    enableAvailabilityZone: true,

    enablePrivateEndpoint: true,

    enablePublicIP: false

});

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleProvision = async () => {

  try {

    setLoading(true);

    const response = await deployLandingZone(deploymentRequest);

    console.log("Backend Response:", response);

    alert("✅ " + response.message);

  } catch (error) {

  console.error(error);

  if (error.response) {

    const report = error.response.data.detail;

    // If backend returned a compliance report
    if (typeof report === "object") {

      let message = "";

      message += "❌ GOVERNANCE COMPLIANCE REPORT\n\n";

      message += `Compliance Score : ${report.compliance_score}%\n`;
      message += `Passed Policies : ${report.passed}\n`;
      message += `Failed Policies : ${report.failed}\n\n`;

      report.results.forEach((policy) => {

        if (policy.status === "PASS") {

          message += `✅ ${policy.policy}\n`;

        } else {

          message += `❌ ${policy.policy}\n`;
          message += `   ${policy.reason}\n`;

        }

      });

      alert(message);

    } else {

      alert("❌ " + report);

    }

  } else {

    alert("❌ Unable to contact backend.");

  }

} finally {

  setLoading(false);

}

};

  return (

    <Box sx={{ p: 4 }}>

      <Typography
        variant="h4"
        align="center"
        gutterBottom
      >
        Cloud Landing Zone Deployment Planner
      </Typography>

      <Paper sx={{ p: 4 }}>

        <Stepper
          activeStep={activeStep}
          sx={{ mb: 5 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* STEP 1 */}

        {activeStep === 0 && (
          <CloudStep
            deploymentRequest={deploymentRequest}
            setDeploymentRequest={setDeploymentRequest}
          />
        )}

        {/* STEP 2 */}

        {activeStep === 1 && (
          <WorkloadStep
            deploymentRequest={deploymentRequest}
            setDeploymentRequest={setDeploymentRequest}
          />
        )}

        {/* STEP 3 */}

        {activeStep === 2 && (
          <EnvironmentStep
            deploymentRequest={deploymentRequest}
            setDeploymentRequest={setDeploymentRequest}
          />
        )}

        {/* STEP 4 */}

        {activeStep === 3 && (
          <RegionStep
            deploymentRequest={deploymentRequest}
            setDeploymentRequest={setDeploymentRequest}
          />
        )}

        {/* STEP 5 */}

{activeStep === 4 && (
  <InfrastructureStep
    deploymentRequest={deploymentRequest}
    setDeploymentRequest={setDeploymentRequest}
  />
)}

{/* STEP 6 */}

{activeStep === 5 && (
  <ReviewStep
    deploymentRequest={deploymentRequest}
  />
)}

        {/* Navigation */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 5
          }}
        >

          <Button
            disabled={activeStep === 0 || loading}
            onClick={handleBack}
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? (

            <Button
              variant="contained"
              onClick={handleProvision}
              disabled={loading}
            >
              {loading ? "Provisioning..." : "Provision Landing Zone"}
            </Button>

          ) : (

            <Button
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>

          )}

        </Box>

      </Paper>

    </Box>

  );

}

export default DeploymentPlanner;