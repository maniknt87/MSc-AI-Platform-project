import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function DashboardCard({ title, value }) {

  return (

    <Paper
      elevation={3}
      sx={{
        p: 3,
        textAlign: "center",
        borderRadius: 3
      }}
    >

      <Typography
        variant="subtitle1"
        color="text.secondary"
      >
        {title}
      </Typography>

      <Typography
        variant="h4"
        sx={{
          mt: 1,
          fontWeight: "bold"
        }}
      >
        {value}
      </Typography>

    </Paper>

  );

}

export default DashboardCard;