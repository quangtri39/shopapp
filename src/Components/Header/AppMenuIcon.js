import React from "react";
import { useAuth } from "../../Contexts/AuthContext";
import DesktopMenuIcon from "./DesktopMenuIcon";
import MobileMenuIcon from "./MobileMenuIcon";

import UserInfoTab from "./UserInfoTab";

export default function AppMenuIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const { signOut } = useAuth();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSignOut = () => {
    signOut();
    handleMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <>
      <DesktopMenuIcon handleProfileMenuOpen={handleProfileMenuOpen} />
      <MobileMenuIcon
        handleProfileMenuOpen={handleProfileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        handleMobileMenuOpen={handleMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
      />
      <UserInfoTab
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        handleSignOut={handleSignOut}
      />
    </>
  );
}
