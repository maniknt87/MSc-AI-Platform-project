import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { workloadTypes } from "../../constants/workloadTypes";

function WorkloadStep({ deploymentRequest, setDeploymentRequest }) {

  const handleSelectWorkload = (workload) => {

    setDeploymentRequest({
      ...deploymentRequest,
      workload: workload
    });

  };

  return (

    <Grid container spacing={3} sx={{ mt: 2 }}>

      {workloadTypes.map((workload) => (

        <Grid item xs={12} md={6} key={workload.id}>

          <Card

            onClick={() => handleSelectWorkload(workload.shortName)}

            sx={{
              cursor: "pointer",

              border:
                deploymentRequest.workload === workload.shortName
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
                {workload.icon}
              </Typography>

              <Typography
                variant="h6"
                align="center"
              >
                {workload.title}
              </Typography>

              <Typography
                variant="body2"
                align="center"
              >
                {workload.description}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      ))}

    </Grid>

  );

}

export default WorkloadStep;