import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  const params = useParams();
  const path = location.pathname;
  
  // Get context information based on current route
  let contextInfo = "";
  if (path.includes('/users/') && params.userId) {
    const user = models.userModel(params.userId);
    if (user) {
      contextInfo = `${user.first_name} ${user.last_name}`;
    }
  } else if (path.includes('/photos/') && params.userId) {
    const user = models.userModel(params.userId);
    if (user) {
      contextInfo = `Photos of ${user.first_name} ${user.last_name}`;
    }
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
          John Doe's PhotoApp
        </Typography>
        {contextInfo && (
          <Box>
            <Typography variant="h6" color="inherit">
              {contextInfo}
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
