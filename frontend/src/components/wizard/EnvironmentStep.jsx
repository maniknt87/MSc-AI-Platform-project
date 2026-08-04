import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { environments } from "../../constants/environments";

function EnvironmentStep({ deploymentRequest, setDeploymentRequest }) {

  const handleSelectEnvironment = (environment) => {

    setDeploymentRequest({
      ...deploymentRequest,
      environment: environment
    });

  };

  return (

    <Grid container spacing={3} sx={{ mt: 2 }}>

      {environments.map((environment) => (

        <Grid item xs={12} md={6} key={environment.id}>

          <Card

            onClick={() => handleSelectEnvironment(environment.title)}

            sx={{
              cursor: "pointer",

              border:
                deploymentRequest.environment === environment.title
                  ? "3px solid #1976d2"
                  : "1px solid #cccccc",

              transition: "0.3s",

              "&:hover": {
                boxShadow: 6
              }

            }}

          >

            <CardContent>

              <Typography
                variant="h3"
                align="center"
              >
                {environment.icon}
              </Typography>

              <Typography
                variant="h6"
                align="center"
              >
                {environment.title}
              </Typography>

              <Typography
                variant="body2"
                align="center"
              >
                {environment.description}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      ))}

    </Grid>

  );

}

export default EnvironmentStep;