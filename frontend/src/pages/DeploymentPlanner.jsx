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
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>

          <Button
            variant="contained"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1
              ? "Provision Landing Zone"
              : "Next"}
          </Button>

        </Box>

      </Paper>

    </Box>

  );

}

export default DeploymentPlanner;