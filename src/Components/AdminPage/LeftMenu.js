import React from "react";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "../LeftSidebar/LeftSidebar";

export default function LeftMenu() {
  const navigate = useNavigate();

  const listMenu = [
    {
      name: "List product",
      icon: <ListAltIcon />,
      onClick: () => navigate("/myShop"),
    },
    {
      name: "Add product",
      icon: <AddBoxIcon />,
      onClick: () => navigate("add"),
    },
    {
      name: "Shop info",
      icon: <BuildCircleIcon />,
      onClick: () => navigate("info"),
    },
  ];

  return (
    <LeftSidebar title="Menu">
      {listMenu.map((menu) => {
        return (
          <ListItemButton
            key={menu.name}
            selected={false}
            onClick={menu.onClick}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.name} />
          </ListItemButton>
        );
      })}
    </LeftSidebar>
  );
}
