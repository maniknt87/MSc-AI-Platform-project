import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import { aiWorkloads } from "../constants/aiWorkloads";
import { getGovernanceSettings } from "../services/api";


// ----------------------------------------------------
// Environment Governance Baseline
// ----------------------------------------------------

const governancePolicies = [
  {
    policy: "Identity & Access Governance",
    development: "Required",
    testing: "Required",
    production: "Mandatory",
  },
  {
    policy: "Model Governance",
    development: "Recommended",
    testing: "Required",
    production: "Mandatory",
  },
  {
    policy: "Private Network Access",
    development: "Optional",
    testing: "Required",
    production: "Mandatory",
  },
  {
    policy: "Public Network Exposure",
    development: "Allowed",
    testing: "Restricted",
    production: "Disabled",
  },
  {
    policy: "Data & Workload Protection",
    development: "Recommended",
    testing: "Required",
    production: "Mandatory",
  },
  {
    policy: "Backup",
    development: "Optional",
    testing: "Required",
    production: "Required",
  },
  {
    policy: "Monitoring",
    development: "Recommended",
    testing: "Required",
    production: "Mandatory",
  },
  {
    policy: "Availability Zone",
    development: "Optional",
    testing: "Recommended",
    production: "Required",
  },
];


// ----------------------------------------------------
// Policy Status Chip
// ----------------------------------------------------

function PolicyChip({ value }) {

  let color = "default";

  if (value === "Mandatory") {
    color = "error";
  } else if (value === "Required") {
    color = "primary";
  } else if (value === "Recommended") {
    color = "success";
  } else if (value === "Restricted") {
    color = "warning";
  } else if (value === "Disabled") {
    color = "error";
  } else if (value === "Allowed") {
    color = "success";
  } else if (value === "Optional") {
    color = "default";
  }

  return (
    <Chip
      label={value}
      color={color}
      size="small"
      variant={value === "Mandatory" || value === "Disabled"
        ? "filled"
        : "outlined"}
    />
  );
}


// ----------------------------------------------------
// Governance Center
// ----------------------------------------------------

function GovernanceCenter() {

  const [settings, setSettings] = useState({
    clouds: [],
    environments: [],
    workloads: [],
    regions: {},
  });


  useEffect(() => {
    loadSettings();
  }, []);


  async function loadSettings() {

    try {

      const response = await getGovernanceSettings();

      console.log(response);

      setSettings(response);

    } catch (error) {

      console.error(
        "Unable to load governance settings:",
        error
      );

    }

  }


  return (

    <Box>

      {/* ------------------------------------------------ */}
      {/* Header */}
      {/* ------------------------------------------------ */}

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
        Review approved resources, environment-specific governance
        baselines, and policy enforcement requirements.
      </Typography>


      <Grid container spacing={3}>


        {/* ------------------------------------------------ */}
        {/* Approved AI Workloads */}
        {/* ------------------------------------------------ */}

        <Grid item xs={12} md={6}>

          <Paper sx={{ p: 3 }}>

            <Typography
              variant="h6"
              gutterBottom
            >
              Approved AI Workloads
            </Typography>

            <List>

              {aiWorkloads.map((workload) => (

                <ListItem
                  key={workload.id}
                  divider
                >

                  <ListItemText
                    primary={workload.name}
                    secondary={workload.description}
                  />

                </ListItem>

              ))}

            </List>

          </Paper>

        </Grid>


        {/* ------------------------------------------------ */}
        {/* Allowed Environments */}
        {/* ------------------------------------------------ */}

        <Grid item xs={12} md={6}>

          <Paper sx={{ p: 3 }}>

            <Typography
              variant="h6"
              gutterBottom
            >
              Allowed Environments
            </Typography>

            <List>

              {settings.environments.map((environment) => (

                <ListItem
                  key={environment}
                  divider
                >

                  <ListItemText
                    primary={environment}
                  />

                </ListItem>

              ))}

            </List>

          </Paper>

        </Grid>


        {/* ------------------------------------------------ */}
        {/* Allowed Workloads */}
        {/* ------------------------------------------------ */}

        <Grid item xs={12} md={6}>

          <Paper sx={{ p: 3 }}>

            <Typography
              variant="h6"
              gutterBottom
            >
              Allowed Workload Categories
            </Typography>

            <List>

              {settings.workloads.map((workload) => (

                <ListItem
                  key={workload}
                  divider
                >

                  <ListItemText
                    primary={workload}
                  />

                </ListItem>

              ))}

            </List>

          </Paper>

        </Grid>


        {/* ------------------------------------------------ */}
        {/* Approved Regions */}
        {/* ------------------------------------------------ */}

        <Grid item xs={12} md={6}>

          <Paper sx={{ p: 3 }}>

            <Typography
              variant="h6"
              gutterBottom
            >
              Approved Regions
            </Typography>

            <List>

              {Object.entries(settings.regions).map(
                ([cloud, regions]) => (

                  <ListItem
                    key={cloud}
                    divider
                  >

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


        {/* ------------------------------------------------ */}
        {/* Environment Governance Matrix */}
        {/* ------------------------------------------------ */}

        <Grid item xs={12}>

          <Paper sx={{ p: 3 }}>

            <Typography
              variant="h6"
              gutterBottom
            >
              Environment Governance Baseline
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Environment-specific governance requirements applied
              to AI-ready landing zone deployments.
            </Typography>


            {/* Header */}

            <Grid
              container
              spacing={2}
              sx={{
                mb: 1,
                fontWeight: 600,
              }}
            >

              <Grid item xs={12} md={4}>
                <Typography fontWeight={600}>
                  Governance Control
                </Typography>
              </Grid>

              <Grid item xs={12} md={2.66}>
                <Typography fontWeight={600}>
                  Development
                </Typography>
              </Grid>

              <Grid item xs={12} md={2.66}>
                <Typography fontWeight={600}>
                  Testing
                </Typography>
              </Grid>

              <Grid item xs={12} md={2.66}>
                <Typography fontWeight={600}>
                  Production
                </Typography>
              </Grid>

            </Grid>


            <Divider sx={{ mb: 1 }} />


            {/* Policy Rows */}

            {governancePolicies.map((policy) => (

              <Box
                key={policy.policy}
                sx={{
                  py: 1.5,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >

                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                >

                  <Grid item xs={12} md={4}>

                    <Typography
                      variant="body2"
                      fontWeight={600}
                    >
                      {policy.policy}
                    </Typography>

                  </Grid>


                  <Grid item xs={12} md={2.66}>

                    <PolicyChip
                      value={policy.development}
                    />

                  </Grid>


                  <Grid item xs={12} md={2.66}>

                    <PolicyChip
                      value={policy.testing}
                    />

                  </Grid>


                  <Grid item xs={12} md={2.66}>

                    <PolicyChip
                      value={policy.production}
                    />

                  </Grid>

                </Grid>

              </Box>

            ))}

          </Paper>

        </Grid>


        {/* ------------------------------------------------ */}
        {/* Governance Enforcement */}
        {/* ------------------------------------------------ */}

        <Grid item xs={12} md={6}>

          <Paper sx={{ p: 3 }}>

            <Typography
              variant="h6"
              gutterBottom
            >
              Policy Enforcement Engine
            </Typography>

            <Chip
              label="Connected"
              color="success"
              size="small"
              sx={{ mb: 2 }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Deployment requests are evaluated against the
              platform governance policy engine before deployment
              execution is permitted.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="body2"
              sx={{ mb: 1 }}
            >
              <b>Governance Gate</b>
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              A failed mandatory governance policy prevents the
              deployment workflow from proceeding.
            </Typography>

          </Paper>

        </Grid>


        {/* ------------------------------------------------ */}
        {/* Policy-as-Code */}
        {/* ------------------------------------------------ */}

        <Grid item xs={12} md={6}>

          <Paper sx={{ p: 3 }}>

            <Typography
              variant="h6"
              gutterBottom
            >
              Policy-as-Code Integration
            </Typography>

            <Chip
              label="Planned Enhancement"
              color="warning"
              size="small"
              sx={{ mb: 2 }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Open Policy Agent (OPA) integration is planned as
              a future policy-as-code enhancement. The current
              governance engine remains the authoritative policy
              validation layer.
            </Typography>

          </Paper>

        </Grid>


      </Grid>

    </Box>

  );

}


export default GovernanceCenter;