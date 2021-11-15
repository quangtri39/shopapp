import React from "react";
import { Alert, Button, Grid } from "@mui/material";
import { addFirebaseDoc, convertName } from "../../utils/product";

import ProductCard from "../ProductCard/ProductCard";
import Search from "./Search";
import AppGrid from "../MUIComponents/AppGrid";
import useStore from "../../Contexts/Zustand";
import DoneIcon from "@mui/icons-material/Done";
import ButtonGroup from "./ButtonGroup";
import { Box } from "@mui/system";

import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ShopTab() {
  const listProduct = useStore((state) => state.listProduct);
  const clearStorage = useStore((state) => state.clearStorage);
  const { currentUser } = useAuth();
  let [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    let filter = event.target.value;
    setSearch(filter);
  }

  let renderProduct = <Alert severity="info">No item in Cart yet!</Alert>;

  if (listProduct.length) {
    renderProduct = (
      <>
        <AppGrid container spacing={3} columns={10}>
          {listProduct
            .filter((item) => {
              if (!search) return true;
              let name = convertName(item.name);
              return name.includes(convertName(search));
            })
            .map((product) => {
              return (
                <Grid item xs={9} xl={2} key={product.id}>
                  <ProductCard
                    productid={product.id}
                    image={product.image}
                    title={product.name}
                    description={product.description}
                    prices={product.prices}
                    count={product.count}
                  >
                    <ButtonGroup isInCart product={product} />
                  </ProductCard>
                </Grid>
              );
            })}
        </AppGrid>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="success"
            endIcon={<DoneIcon />}
            onClick={handleClick}
          >
            Buy
          </Button>
        </Box>
      </>
    );
  }

  async function handleClick() {
    if (!listProduct.length) {
      return;
    }
    try {
      // get current day
      let today = new Date();
      let dd = today.getDate();

      let mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = mm + "/" + dd + "/" + yyyy;

      const data = {
        userId: currentUser.uid,
        data: listProduct,
        time: today,
      };
      await addFirebaseDoc("receipt", data);
      clearStorage();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} xl={5}>
          <Search onSearch={handleSearch} />
        </Grid>
      </Grid>
      {renderProduct}
    </>
  );
}
