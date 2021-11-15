import React from "react";

import { Box, IconButton, Badge, MenuItem, Menu } from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useListMenuItem } from "../../utils/menu-item";
import SwitchTheme from "./SwitchTheme";

export default function MobileMenuIcon({
  handleProfileMenuOpen,
  handleMobileMenuOpen,
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
}) {
  const listMenuItem = useListMenuItem();

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {listMenuItem.map((item) => {
        return (
          <MenuItem key={item.title} onClick={item.onClick}>
            <IconButton
              size="large"
              aria-label={item.ariaLabel}
              color="inherit"
            >
              <Badge badgeContent={item.badgeContent} color="error">
                {item.icon}
              </Badge>
            </IconButton>
            <p>{item.title}</p>
          </MenuItem>
        );
      })}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
        <SwitchTheme />
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      {renderMobileMenu}
    </>
  );
}
