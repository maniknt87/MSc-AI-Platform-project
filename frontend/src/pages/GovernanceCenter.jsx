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

function GovernanceCenter() {

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

        <Grid item xs={12} md={6}>

          <Paper sx={{ p:3 }}>

            <Typography variant="h6" gutterBottom>
              Allowed Cloud Providers
            </Typography>

            <List>

              <ListItem>
                <ListItemText primary="Microsoft Azure" />
                <Chip label="Allowed" color="success" />
              </ListItem>

              <ListItem>
                <ListItemText primary="Amazon Web Services" />
                <Chip label="Allowed" color="success" />
              </ListItem>

            </List>

          </Paper>

        </Grid>

        <Grid item xs={12} md={6}>

          <Paper sx={{ p:3 }}>

            <Typography variant="h6" gutterBottom>
              Allowed Environments
            </Typography>

            <List>

              <ListItem>
                <ListItemText primary="Development" />
              </ListItem>

              <ListItem>
                <ListItemText primary="Testing" />
              </ListItem>

              <ListItem>
                <ListItemText primary="Production" />
              </ListItem>

            </List>

          </Paper>

        </Grid>

        <Grid item xs={12} md={6}>

          <Paper sx={{ p:3 }}>

            <Typography variant="h6" gutterBottom>
              Governance Policies
            </Typography>

            <List>

              <ListItem>
                <ListItemText primary="Cloud Policy" />
              </ListItem>

              <ListItem>
                <ListItemText primary="Environment Policy" />
              </ListItem>

              <ListItem>
                <ListItemText primary="Region Policy" />
              </ListItem>

              <ListItem>
                <ListItemText primary="Workload Policy" />
              </ListItem>

            </List>

          </Paper>

        </Grid>

        <Grid item xs={12} md={6}>

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