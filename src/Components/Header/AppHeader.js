import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import AppMenuIcon from "./AppMenuIcon";

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function AppHeader() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component={NavLink} to="/">
            APPSHOP
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <AppMenuIcon />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
