import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import SummaryCard from "../common/SummaryCard";
import { deploymentResources } from "../../constants/deploymentResources";

function ReviewStep({ deploymentRequest }) {

  const resources =
    deploymentResources?.[deploymentRequest.cloud]?.[
      deploymentRequest.workload
    ] || [];

  return (

    <Box>

      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        Enterprise Landing Zone Deployment Summary
      </Typography>

      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Review your deployment configuration before provisioning the Landing Zone.
      </Typography>

      {/* Deployment Summary */}

      <Grid container spacing={3}>

        <Grid item xs={12} md={3}>
          <SummaryCard
            icon="☁"
            title="Cloud"
            value={deploymentRequest.cloud}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <SummaryCard
            icon="🤖"
            title="Workload"
            value={deploymentRequest.workload}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <SummaryCard
            icon="🏢"
            title="Environment"
            value={deploymentRequest.environment}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <SummaryCard
            icon="🌍"
            title="Region"
            value={deploymentRequest.region}
          />
        </Grid>

      </Grid>

      {/* Infrastructure Configuration */}

      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 2,
        }}
      >

        <Typography
          variant="h5"
          gutterBottom
        >
          Infrastructure Configuration
        </Typography>

        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <Typography>
              <b>VM Size:</b> {deploymentRequest.vmSize}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <b>Storage:</b> {deploymentRequest.storageType}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <b>Backup:</b>{" "}
              {deploymentRequest.enableBackup ? "Enabled" : "Disabled"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <b>Azure Monitor:</b>{" "}
              {deploymentRequest.enableMonitoring ? "Enabled" : "Disabled"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <b>Availability Zone:</b>{" "}
              {deploymentRequest.enableAvailabilityZone ? "Enabled" : "Disabled"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <b>Private Endpoint:</b>{" "}
              {deploymentRequest.enablePrivateEndpoint ? "Enabled" : "Disabled"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <b>Public IP:</b>{" "}
              {deploymentRequest.enablePublicIP ? "Enabled" : "Disabled"}
            </Typography>
          </Grid>

        </Grid>

      </Paper>

      {/* Resources */}

      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 2,
        }}
      >

        <Typography
          variant="h5"
          gutterBottom
        >
          Infrastructure To Be Created
        </Typography>

        {resources.map((resource) => (

          <Typography
            key={resource}
            sx={{ mb: 1 }}
          >
            ✔ {resource}
          </Typography>

        ))}

      </Paper>

    </Box>

  );

}

export default ReviewStep;