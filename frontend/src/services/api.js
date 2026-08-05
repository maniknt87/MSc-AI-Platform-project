import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// ------------------------------------
// Deployment API
// ------------------------------------

export const deployLandingZone = async (deploymentRequest) => {
  const response = await API.post("/deploy", deploymentRequest);
  return response.data;
};

// ------------------------------------
// Deployment History
// ------------------------------------

export const getDeployments = async () => {
  const response = await API.get("/deployments");
  return response.data;
};

// ------------------------------------
// Governance Settings
// ------------------------------------

export const getGovernanceSettings = async () => {
  const response = await API.get("/governance/settings");
  return response.data;
};

export default API;