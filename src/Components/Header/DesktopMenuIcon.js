import React from "react";

import { Box, IconButton, Badge } from "@mui/material";
import { useListMenuItem } from "../../utils/menu-item";

import AccountCircle from "@mui/icons-material/AccountCircle";
import SwitchTheme from "./SwitchTheme";

export default function DesktopMenuIcon({ handleProfileMenuOpen }) {
  const listMenuItem = useListMenuItem();

  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
      <SwitchTheme />
      {listMenuItem.map((item) => {
        return (
          <IconButton
            key={item.title}
            size="large"
            aria-label={item.ariaLabel}
            color="inherit"
            onClick={item.onClick}
          >
            <Badge badgeContent={item.badgeContent} color="error">
              {item.icon}
            </Badge>
          </IconButton>
        );
      })}

      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </Box>
  );
}
