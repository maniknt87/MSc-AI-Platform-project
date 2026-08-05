import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { getDeployments } from "../services/api";
import DashboardCard from "../components/dashboard/DashboardCard";

function DeploymentDashboard() {

  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    loadDeployments();
  }, []);

  async function loadDeployments() {

    console.log("Calling API...");

    const response = await getDeployments();

    console.log(response);

    setDeployments(response.deployments);
}

  const totalDeployments = deployments.length;

  const queued = deployments.filter(
    (d) => d.status === "Queued"
  ).length;

  const running = deployments.filter(
    (d) => d.status === "Running"
  ).length;

  const completed = deployments.filter(
    (d) => d.status === "Completed"
  ).length;

  return (

    <Box>

      <Typography
    variant="h4"
    gutterBottom
    color="error"
>
    THIS IS MY NEW DASHBOARD
        </Typography>

      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
      >

        <Grid item xs={12} md={3}>
          <DashboardCard
            title="Total Deployments"
            value={totalDeployments}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <DashboardCard
            title="Queued"
            value={queued}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <DashboardCard
            title="Running"
            value={running}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <DashboardCard
            title="Completed"
            value={completed}
          />
        </Grid>

      </Grid>

      <Paper sx={{ p: 2 }}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Cloud</b></TableCell>
              <TableCell><b>Workload</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Created</b></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {deployments.map((deployment) => (

              <TableRow key={deployment.deployment_id}>

                <TableCell>{deployment.deployment_id}</TableCell>

                <TableCell>{deployment.cloud}</TableCell>

                <TableCell>{deployment.workload}</TableCell>

                <TableCell>{deployment.status}</TableCell>

                <TableCell>{deployment.created_time}</TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </Paper>

    </Box>

  );

}

export default DeploymentDashboard;