import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";

import { getGovernanceSettings } from "../services/api";

function GovernanceCenter() {

  const [settings, setSettings] = useState({
    clouds: [],
    environments: [],
    workloads: [],
    regions: {}
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {

    const response = await getGovernanceSettings();

    console.log(response);

    setSettings(response);

  }

  return (

    <Box>

      <Typography
        variant="h4"
        gutterBottom
      >
        Governance Center
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Review the governance policies currently enforced by the platform.
      </Typography>

      <Grid container spacing={3}>

        {/* ---------------------------------- */}
        {/* Cloud Providers */}
        {/* ---------------------------------- */}

        <Grid item xs={12} md={6}>

          <Paper sx={{ p:3 }}>

            <Typography variant="h6" gutterBottom>
              Allowed Cloud Providers
            </Typography>

            <List>

              {settings.clouds.map((cloud) => (

                <ListItem key={cloud}>

                  <ListItemText primary={cloud} />

                  <Chip
                    label="Allowed"
                    color="success"
                  />

                </ListItem>

              ))}

            </List>

          </Paper>

        </Grid>

        {/* ---------------------------------- */}
        {/* Environments */}
        {/* ---------------------------------- */}

        <Grid item xs={12} md={6}>

          <Paper sx={{ p:3 }}>

            <Typography variant="h6" gutterBottom>
              Allowed Environments
            </Typography>

            <List>

              {settings.environments.map((environment) => (

                <ListItem key={environment}>

                  <ListItemText
                    primary={environment}
                  />

                </ListItem>

              ))}

            </List>

          </Paper>

        </Grid>

        {/* ---------------------------------- */}
        {/* Workloads */}
        {/* ---------------------------------- */}

        <Grid item xs={12} md={6}>

          <Paper sx={{ p:3 }}>

            <Typography variant="h6" gutterBottom>
              Allowed Workloads
            </Typography>

            <List>

              {settings.workloads.map((workload) => (

                <ListItem key={workload}>

                  <ListItemText
                    primary={workload}
                  />

                </ListItem>

              ))}

            </List>

          </Paper>

        </Grid>

        {/* ---------------------------------- */}
        {/* Regions */}
        {/* ---------------------------------- */}

        <Grid item xs={12} md={6}>

          <Paper sx={{ p:3 }}>

            <Typography variant="h6" gutterBottom>
              Approved Regions
            </Typography>

            <List>

              {Object.entries(settings.regions).map(
                ([cloud, regions]) => (

                  <ListItem key={cloud}>

                    <ListItemText
                      primary={cloud}
                      secondary={regions.join(", ")}
                    />

                  </ListItem>

                )
              )}

            </List>

          </Paper>

        </Grid>

        {/* ---------------------------------- */}
        {/* OPA */}
        {/* ---------------------------------- */}

        <Grid item xs={12}>

          <Paper sx={{ p:3 }}>

            <Typography variant="h6" gutterBottom>
              Open Policy Agent
            </Typography>

            <Chip
              label="Not Connected"
              color="warning"
            />

          </Paper>

        </Grid>

      </Grid>

    </Box>

  );

}

export default GovernanceCenter;