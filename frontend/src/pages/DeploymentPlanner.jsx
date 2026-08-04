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

const steps = [
  "Cloud",
  "Workload",
  "Environment",
  "Region",
  "Review"
];

function DeploymentPlanner() {

  const [activeStep, setActiveStep] = useState(0);

  const [deploymentRequest, setDeploymentRequest] = useState({
    cloud: "",
    workload: "",
    environment: "",
    region: ""
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
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

        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
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
          <Typography
            variant="h6"
            align="center"
          >
            Region Step Coming Soon...
          </Typography>
        )}

        {/* STEP 5 */}

        {activeStep === 4 && (
          <Typography
            variant="h6"
            align="center"
          >
            Review Step Coming Soon...
          </Typography>
        )}

        {/* Current Deployment Request */}

        <Box
          sx={{
            mt: 5,
            p: 2,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            border: "1px solid #ddd"
          }}
        >

          <Typography
            variant="h6"
            gutterBottom
          >
            Current Deployment Request
          </Typography>

          <Typography>
            <strong>Cloud:</strong> {deploymentRequest.cloud || "Not Selected"}
          </Typography>

          <Typography>
            <strong>Workload:</strong> {deploymentRequest.workload || "Not Selected"}
          </Typography>

          <Typography>
            <strong>Environment:</strong> {deploymentRequest.environment || "Not Selected"}
          </Typography>

          <Typography>
            <strong>Region:</strong> {deploymentRequest.region || "Not Selected"}
          </Typography>

        </Box>

        {/* Navigation */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 5
          }}
        >

          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>

          <Button
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>

        </Box>

      </Paper>

    </Box>
  );

}

export default DeploymentPlanner;