import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Navbar({
  currentPage,
  setCurrentPage,
  user,
  onLogout
}) {

  return (

    <AppBar position="static">

      <Toolbar
  sx={{
    minHeight: 100,
    px: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 0
  }}
>

  {/* ---------------------------------- */}
  {/* Platform Title */}
  {/* ---------------------------------- */}

  <Typography
    variant="h5"
    sx={{
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 1.2,
      mb: 0.5
    }}
  >
    Multi-Cloud Governance & Landing Zone
    <br />
    Orchestration Platform
  </Typography>


  {/* ---------------------------------- */}
  {/* Navigation Row */}
  {/* ---------------------------------- */}

  <Box
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 1
    }}
  >

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

    <Button
      color="inherit"
      onClick={() => setCurrentPage("users")}
    >
      👥 Users & Roles
    </Button>

    {user && (
      <Box
        sx={{
          ml: 2,
          pl: 2,
          borderLeft:
            "1px solid rgba(255,255,255,0.45)",
          display: "flex",
          alignItems: "center",
          gap: 1
        }}
      >

        <Box sx={{ textAlign: "center" }}>

          <Typography
            variant="body2"
            fontWeight="bold"
          >
            👤 {user.username}
          </Typography>

          <Typography variant="caption">
            {user.role}
          </Typography>

        </Box>

        <Button
          color="inherit"
          variant="outlined"
          size="small"
          onClick={onLogout}
        >
          Logout
        </Button>

      </Box>
    )}

  </Box>

</Toolbar>

    </AppBar>

  );
}

export default Navbar;