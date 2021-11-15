import React from "react";
import { Alert, Grid } from "@mui/material";
import { convertName, useSnapshotCollectionParam } from "../../utils/product";

import FullPageProgress from "../FullPageProgress/FullPageProgress";
import ProductCard from "../ProductCard/ProductCard";
import Search from "./Search";
import AppGrid from "../MUIComponents/AppGrid";
import useStore from "../../Contexts/Zustand";
import ButtonGroup from "./ButtonGroup";
import MarginTop from "./MarginTop";

export default function ShopTab() {
  const {
    listData: listShop,
    isLoading,
    error,
  } = useSnapshotCollectionParam("product", "shopId");
  let [search, setSearch] = React.useState("");
  const listCart = useStore((state) => state.listProduct);

  function handleSearch(event) {
    let filter = event.target.value;
    setSearch(filter);
  }

  if (error) {
    return (
      <>
        <MarginTop />
        <Alert severity="error">{error}</Alert>
      </>
    );
  }

  if (isLoading) {
    return <FullPageProgress />;
  }

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} xl={5}>
          <Search onSearch={handleSearch} />
        </Grid>
      </Grid>
      <AppGrid container spacing={3} columns={10}>
        {listShop
          .filter((item) => {
            if (!search) return true;
            let name = convertName(item.name);
            return name.includes(convertName(search));
          })
          .map((product) => {
            const productInCart = listCart.filter(
              (item) => item.id === product.id
            );
            return (
              <Grid item xs={9} xl={2} key={product.id}>
                <ProductCard
                  productid={product.id}
                  image={product.image}
                  title={product.name}
                  description={product.description}
                  prices={product.prices}
                  count={productInCart.length ? productInCart[0].count : null}
                >
                  <ButtonGroup
                    isInCart={productInCart.length > 0}
                    product={product}
                  />
                </ProductCard>
              </Grid>
            );
          })}
      </AppGrid>
    </>
  );
}
