import {
  Avatar,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSnapshotCollection } from "../../utils/product";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import ShopItem from "../LeftSidebar/ShopItem";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const skeletonItem = (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Box sx={{ margin: 1 }}>
      <Skeleton variant="circular">
        <Avatar />
      </Skeleton>
    </Box>
    <Box sx={{ width: "100%" }}>
      <Skeleton width="100%">
        <Typography>.</Typography>
      </Skeleton>
    </Box>
  </Box>
);

export default function LeftMenu() {
  const {
    listData: listShop,
    isLoading,
    error,
  } = useSnapshotCollection("shop");
  const navigate = useNavigate();

  if (error) {
    return error;
  }

  if (isLoading) {
    return (
      <LeftSidebar title="Menu">
        {skeletonItem}
        {skeletonItem}
        {skeletonItem}
        {skeletonItem}
      </LeftSidebar>
    );
  }

  const listMenu = [
    {
      name: "Home",
      icon: <HomeIcon />,
      onClick: () => navigate("/"),
    },
    {
      name: "Favorite",
      icon: <FavoriteIcon />,
      onClick: () => navigate("/favorite"),
    },
    {
      name: "History",
      icon: <HistoryIcon />,
      onClick: () => navigate("history"),
    },
    {
      name: "Cart",
      icon: <ShoppingCartIcon />,
      onClick: () => navigate("cart"),
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
      <Divider />

      <ListItem>
        <ListItemText
          primary="List Shop"
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        />
      </ListItem>
      <Divider />
      {listShop.map((shop) => (
        <ShopItem
          key={shop.id}
          shopId={shop.shopId}
          image={shop.image}
          name={shop.name}
        />
      ))}
    </LeftSidebar>
  );
}
