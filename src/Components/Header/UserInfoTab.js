import React from "react";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import {
  MenuItem,
  Menu,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemButton,
  ListItemIcon,
  Typography,
  ListItemText,
} from "@mui/material";
import { useAuth } from "../../Contexts/AuthContext";

export default function UserInfoTab({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  handleSignOut,
}) {
  const { currentUser } = useAuth();

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar
            alt={`Avatar n°${currentUser.displayName}`}
            src={currentUser.photoURL}
          />
        </ListItemAvatar>
        <ListItemText primary={currentUser.displayName} />
      </ListItemButton>
      <Divider />
      <MenuItem onClick={handleSignOut}>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Sign out</Typography>
      </MenuItem>
    </Menu>
  );
}
