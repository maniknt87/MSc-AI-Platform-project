import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <AppBar position="static">

      <Toolbar>

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold"
          }}
        >
          Multi-Cloud Governance &
          Landing Zone Orchestration Platform
        </Typography>

        <Box>

          <Button
            color="inherit"
            onClick={() => setCurrentPage("planner")}
          >
            🚀 New Deployment
          </Button>

          <Button
            color="inherit"
            onClick={() => setCurrentPage("dashboard")}
          >
            📊 Dashboard
          </Button>

          <Button
            color="inherit"
            onClick={() => setCurrentPage("governance")}
          >
            🛡 Governance
          </Button>

        </Box>

      </Toolbar>

    </AppBar>
  );
}

export default Navbar;