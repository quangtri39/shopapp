import React from "react";

import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useMatch, useNavigate } from "react-router-dom";

export default function ShopItem({
  image = "https://picsum.photos/200/300",
  name = "shop name",
  shopId,
}) {
  const navigate = useNavigate();
  const match = useMatch("/:shopId");
  return (
    <ListItemButton
      selected={match?.params.shopId === shopId}
      onClick={() => navigate(`/${shopId}`)}
    >
      <ListItemAvatar>
        <Avatar alt={`Avatar n°${name}`} src={image} />
      </ListItemAvatar>
      <ListItemText primary={name} />
    </ListItemButton>
  );
}
