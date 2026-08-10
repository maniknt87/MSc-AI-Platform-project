import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

function UsersRoles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [cloudRoles, setCloudRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);

  const getCurrentUser = () => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Unable to read current user:", error);
      return null;
    }
  };

  const currentUser = getCurrentUser();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const current = getCurrentUser();

      if (!current) {
        console.error("No authenticated user found.");
        setUsers([]);
        return;
      }

      // Administrator sees all users.
      if (current.role === "Administrator") {
        const response = await fetch(
          "http://127.0.0.1:8000/users"
        );

        const data = await response.json();
        setUsers(data.users);
      } else {
        // Other users see only themselves.
        setUsers([
          {
            id: current.id,
            username: current.username,
            email: current.email,
            role: current.role
          }
        ]);
      }
    } catch (error) {
      console.error("Unable to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCloudRoles = async (username) => {
    const current = getCurrentUser();

    if (!current) {
      alert("Please login again.");
      return;
    }

    // Non-admin users can only view their own roles.
    if (
      current.role !== "Administrator" &&
      username !== current.username
    ) {
      alert("Access denied.");
      return;
    }

    try {
      setRolesLoading(true);

      const response = await fetch(
        `http://127.0.0.1:8000/users/${username}/roles`
      );

      const data = await response.json();

      if (!response.ok) {
        alert("❌ " + (data.detail || "Unable to load roles."));
        return;
      }

      setSelectedUser(data);
      setCloudRoles(data.cloud_roles || []);

    } catch (error) {
      console.error("Unable to load cloud roles:", error);
    } finally {
      setRolesLoading(false);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
      >
        Users & Cloud Roles
      </Typography>

      <Typography
        align="center"
        sx={{ mb: 4 }}
      >
        {currentUser?.role === "Administrator"
          ? "Centralized view of all multi-cloud users and their assigned roles."
          : "Your assigned multi-cloud accounts, subscriptions and roles."}
      </Typography>

      {loading ? (
        <Typography align="center">
          Loading users...
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>User</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Platform Role</strong></TableCell>
                <TableCell><strong>Cloud Access</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip label={user.role} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => loadCloudRoles(user.username)}
                    >
                      View Roles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {rolesLoading && (
        <Typography align="center" sx={{ mt: 4 }}>
          Loading cloud roles...
        </Typography>
      )}

      {selectedUser && !rolesLoading && (
        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h5" gutterBottom>
            User Role Details
          </Typography>

          <Typography sx={{ mb: 2 }}>
            <strong>User:</strong> {selectedUser.username}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Allowed Region:</strong>{" "}
            {selectedUser.allowed_region || "Not specified"}
          </Typography>

          <Typography sx={{ mb: 3 }}>
            <strong>Platform Role:</strong>{" "}
            <Chip
              label={selectedUser.platform_role}
              size="small"
            />
          </Typography>

          <Typography variant="h6" gutterBottom>
            Cloud Access
          </Typography>

          {cloudRoles.map((role, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{ p: 2, mb: 2 }}
            >
              <Typography variant="h6">
                {role.cloud}
              </Typography>

              <Typography>
                <strong>Account / Subscription:</strong>{" "}
                {role.account_name}
              </Typography>

              <Typography>
                <strong>Account ID:</strong>{" "}
                {role.account_id}
              </Typography>

              <Typography>
                <strong>Role:</strong>{" "}
                <Chip
                  label={role.cloud_role}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
            </Paper>
          ))}
        </Paper>
      )}
    </Box>
  );
}

export default UsersRoles;