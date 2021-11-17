import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router";
import useStore from "../Contexts/Zustand";

function useListMenuItem() {
  const navigate = useNavigate();

  const productCount = useStore((state) => state.productCount);
  return [
    {
      title: "Cart",
      ariaLabel: "show cart",
      badgeContent: productCount,
      icon: <ShoppingCartIcon />,
      onClick: () => navigate("/cart"),
    },
    {
      title: "My shop",
      ariaLabel: "show shop",
      badgeContent: 1,
      icon: <StoreIcon />,
      onClick: () => navigate("/myShop"),
    },
  ];
}

export { useListMenuItem };
