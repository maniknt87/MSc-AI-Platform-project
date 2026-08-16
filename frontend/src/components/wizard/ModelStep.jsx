import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { aiModels } from "../../constants/aiModels";

function ModelStep({ deploymentRequest, setDeploymentRequest }) {
  const availableModels = aiModels.filter(
    (model) => model.workload === deploymentRequest.workload
  );

  const handleSelectModel = (model) => {
    setDeploymentRequest({
      ...deploymentRequest,
      modelId: model.id,
      modelName: model.name,
    });
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Select AI Model
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select the validated AI model associated with your chosen workload.
      </Typography>

      <Grid container spacing={3}>
        {availableModels.map((model) => (
          <Grid item xs={12} md={6} key={model.id}>
            <Card
              onClick={() => handleSelectModel(model)}
              sx={{
                cursor: "pointer",
                height: "100%",
                border:
                  deploymentRequest.modelId === model.id
                    ? "3px solid #1976d2"
                    : "1px solid #ddd",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {model.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {model.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {availableModels.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 3 }}>
          No model is currently available for the selected AI workload.
        </Typography>
      )}
    </>
  );
}

export default ModelStep;