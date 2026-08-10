import { useState } from "react";

import Box from "@mui/material/Box";

import Navbar from "../components/Navbar";

import DeploymentPlanner from "../pages/DeploymentPlanner";
import DeploymentDashboard from "../pages/DeploymentDashboard";
import GovernanceCenter from "../pages/GovernanceCenter";
import UsersRoles from "../pages/UsersRoles";

function MainLayout({ user, onLogout }) {

  const [currentPage, setCurrentPage] = useState("planner");

  return (

    <Box>

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onLogout={onLogout}
      />

      <Box sx={{ p: 3 }}>

  {currentPage === "planner" && (
    <DeploymentPlanner />
  )}

  {currentPage === "dashboard" && (
    <DeploymentDashboard />
  )}

  {currentPage === "governance" && (
    <GovernanceCenter />
  )}

  {currentPage === "users" && (
    <UsersRoles />
  )}

</Box>

    </Box>

  );

}

export default MainLayout;