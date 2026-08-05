import { useState } from "react";

import Box from "@mui/material/Box";

import Navbar from "../components/Navbar";

import DeploymentPlanner from "../pages/DeploymentPlanner";
import DeploymentDashboard from "../pages/DeploymentDashboard";

function MainLayout() {

  const [currentPage, setCurrentPage] = useState("planner");

  return (

    <Box>

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Box sx={{ p: 3 }}>

        {currentPage === "planner" && (
          <DeploymentPlanner />
        )}

        {currentPage === "dashboard" && (
          <DeploymentDashboard />
        )}

      </Box>

    </Box>

  );

}

export default MainLayout;