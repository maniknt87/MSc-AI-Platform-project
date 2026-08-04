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

      <Grid container spacing={3}>

        <Grid item xs={12} md={6}>

          <SummaryCard
            icon="☁"
            title="Cloud"
            value={deploymentRequest.cloud}
          />

        </Grid>

        <Grid item xs={12} md={6}>

          <SummaryCard
            icon="🤖"
            title="Workload"
            value={deploymentRequest.workload}
          />

        </Grid>

        <Grid item xs={12} md={6}>

          <SummaryCard
            icon="🏢"
            title="Environment"
            value={deploymentRequest.environment}
          />

        </Grid>

        <Grid item xs={12} md={6}>

          <SummaryCard
            icon="🌍"
            title="Region"
            value={deploymentRequest.region}
          />

        </Grid>

      </Grid>

      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 2
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