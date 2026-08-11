import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { deploymentTemplates } from "./deploymentTemplates";

function WorkloadStep({ deploymentRequest, setDeploymentRequest }) {

  const handleSelectTemplate = (template) => {
    setDeploymentRequest({
      ...deploymentRequest,
      templateId: template.id,
      workload: template.workload,
      environment: template.environment,
      vmSize: template.vmSize,
      storageType: template.storageType,
      enableBackup: template.enableBackup,
      enableMonitoring: template.enableMonitoring,
      enableAvailabilityZone: template.enableAvailabilityZone,
      enablePrivateEndpoint: template.enablePrivateEndpoint,
      enablePublicIP: template.enablePublicIP
    });
  };

  // Show only templates belonging to the selected cloud
  const availableTemplates = deploymentTemplates.filter(
    (template) =>
      template.cloud === deploymentRequest.cloud
  );

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Select Deployment Template
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose a pre-configured landing zone template for your deployment.
      </Typography>

      <Grid container spacing={3}>

        {availableTemplates.map((template) => (

          <Grid item xs={12} md={6} key={template.id}>

            <Card
              onClick={() => handleSelectTemplate(template)}
              sx={{
                cursor: "pointer",

                border:
                  deploymentRequest.templateId === template.id
                    ? "3px solid #1976d2"
                    : "1px solid #ddd",

                transition: "0.3s",

                "&:hover": {
                  boxShadow: 6
                }
              }}
            >

              <CardContent>

                <Typography variant="h6">
                  {template.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {template.description}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 2 }}
                >
                  <strong>Environment:</strong>{" "}
                  {template.environment}
                </Typography>

                <Typography
                  variant="body2"
                >
                  <strong>VM Size:</strong>{" "}
                  {template.vmSize}
                </Typography>

                <Typography
                  variant="body2"
                >
                  <strong>Storage:</strong>{" "}
                  {template.storageType}
                </Typography>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

      {availableTemplates.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 3 }}>
          No templates are available for the selected cloud.
        </Typography>
      )}

    </>
  );
}

export default WorkloadStep;