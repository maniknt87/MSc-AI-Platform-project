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
          sx={{ flexGrow: 1 }}
        >
          Enterprise Landing Zone Platform
        </Typography>

        <Box>

          <Button
            color="inherit"
            onClick={() => setCurrentPage("planner")}
          >
            New Deployment
          </Button>

          <Button
            color="inherit"
            onClick={() => setCurrentPage("dashboard")}
          >
            Deployment Dashboard
          </Button>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;