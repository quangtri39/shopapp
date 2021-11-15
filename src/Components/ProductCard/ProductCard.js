import React from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";

import "./ProductCard.css";
import { IconButton } from "@mui/material";
import useLocalStorageState from "../../utils/useLocalStorageState";
export default function ProductCard({
  image,
  productid,
  title = "title",
  prices,
  description,
  children,
  count,
}) {
  const [favoriteList, setFavoriteList] = useLocalStorageState(
    "shop-app-favorite",
    []
  );
  const isFavorite = favoriteList.includes(productid);

  function handleFavorite(productid) {
    if (favoriteList.includes(productid)) {
      const newArray = favoriteList.filter((item) => {
        return item !== productid;
      });
      setFavoriteList(newArray);
    } else {
      setFavoriteList([...favoriteList, productid]);
    }
  }

  return (
    <div className="card" style={{ backgroundImage: `url(${image})` }}>
      {count && <p className="product-count">x{count}</p>}
      {productid && (
        <div className="product-heart">
          <IconButton
            color={isFavorite ? "error" : "default"}
            aria-label="add to favorite"
            onClick={() => handleFavorite(productid)}
          >
            <FavoriteIcon sx={{ height: "50px", width: "50px" }} />
          </IconButton>
        </div>
      )}

      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="product-prices">Giá: ${prices}</p>
        <p className="product-description">{description}</p>
        <div className="product-info">{children}</div>
      </div>
    </div>
  );
}
