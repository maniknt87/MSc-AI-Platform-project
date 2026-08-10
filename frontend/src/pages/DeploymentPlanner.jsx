import { useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";

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

  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: "",
    severity: "success"
  });

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

    setDialog({
      open: true,
      title: "Deployment Submitted",
      message: response.message,
      severity: "success"
    });

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

      setDialog({
        open: true,
        title: "Governance Compliance Report",
        message,
        severity: report.compliance_score >= 80 ? "success" : "error"
      });

    } else {

      setDialog({
        open: true,
        title: "Deployment Failed",
        message: report,
        severity: "error"
      });

    }

  } else {

    setDialog({
      open: true,
      title: "Connection Error",
      message: "Unable to contact backend.",
      severity: "error"
    });

  }

} finally {

  setLoading(false);

}

};

  return (
    <>
      <Dialog
        open={dialog.open}
        onClose={() =>
          setDialog((prev) => ({
            ...prev,
            open: false
          }))
        }
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 8
          }
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
          {dialog.title}
        </DialogTitle>

        <DialogContent>
          <Alert
            severity={dialog.severity}
            sx={{
              alignItems: "flex-start",
              whiteSpace: "pre-line"
            }}
          >
            {dialog.message}
          </Alert>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            variant="contained"
            onClick={() =>
              setDialog((prev) => ({
                ...prev,
                open: false
              }))
            }
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

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
    </>
  );

}

export default DeploymentPlanner;