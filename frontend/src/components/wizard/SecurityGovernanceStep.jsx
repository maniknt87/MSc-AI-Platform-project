import {
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";

function SecurityGovernanceStep({
  deploymentRequest,
  setDeploymentRequest,
}) {
  const handleChange = (field) => (event) => {
    setDeploymentRequest({
      ...deploymentRequest,
      [field]: event.target.checked,
    });
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
      >
        Security & Governance
      </Typography>

      <Typography
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Configure security, isolation, protection and monitoring
        controls for the AI workload.
      </Typography>

      {/* Identity & Access */}

      <Typography variant="h6" gutterBottom>
        Identity & Access
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={deploymentRequest.enableIdentityGovernance}
            onChange={handleChange("enableIdentityGovernance")}
          />
        }
        label="Enable identity and access governance"
      />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ ml: 4, mb: 3 }}
      >
        Apply controlled access to AI workloads and platform resources.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Network Security */}

      <Typography variant="h6" gutterBottom>
        Network Security
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={deploymentRequest.enablePrivateEndpoint}
            onChange={handleChange("enablePrivateEndpoint")}
          />
        }
        label="Enable private network access"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={!deploymentRequest.enablePublicIP}
            onChange={(event) =>
              setDeploymentRequest({
                ...deploymentRequest,
                enablePublicIP: !event.target.checked,
              })
            }
          />
        }
        label="Disable public network exposure"
      />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ ml: 4, mb: 3 }}
      >
        Restrict AI workload access through private connectivity
        and reduce public exposure.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Data Protection */}

      <Typography variant="h6" gutterBottom>
        Data Protection
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={deploymentRequest.enableBackup}
            onChange={handleChange("enableBackup")}
          />
        }
        label="Enable data and workload protection"
      />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ ml: 4, mb: 3 }}
      >
        Enable protection mechanisms for AI workload resources.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Model Governance */}

      <Typography variant="h6" gutterBottom>
        Model Governance
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={deploymentRequest.enableModelGovernance}
            onChange={handleChange("enableModelGovernance")}
          />
        }
        label="Enable model governance"
      />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ ml: 4, mb: 3 }}
      >
        Apply governance controls to the selected AI model and workload.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Monitoring */}

      <Typography variant="h6" gutterBottom>
        Monitoring
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={deploymentRequest.enableMonitoring}
            onChange={handleChange("enableMonitoring")}
          />
        }
        label="Enable AI workload monitoring"
      />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ ml: 4 }}
      >
        Monitor the deployed AI workload and its platform resources.
      </Typography>
    </Paper>
  );
}

export default SecurityGovernanceStep;