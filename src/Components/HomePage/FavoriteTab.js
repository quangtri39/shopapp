import { Alert, Grid } from "@mui/material";
import React from "react";
import { convertName, useSnapshotCollectionDocId } from "../../utils/product";
import useLocalStorageState from "../../utils/useLocalStorageState";
import FullPageProgress from "../FullPageProgress/FullPageProgress";
import AppGrid from "../MUIComponents/AppGrid";
import ProductCard from "../ProductCard/ProductCard";
import Search from "./Search";
import MarginTop from "./MarginTop";

export default function FavoriteTab() {
  let [search, setSearch] = React.useState("");
  const [favoriteList] = useLocalStorageState("shop-app-favorite", []);
  const {
    listData: listProduct,
    isLoading,
    error,
  } = useSnapshotCollectionDocId("product", favoriteList);

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
                  //   handleClick={() => addCartItem(product)}
                ></ProductCard>
              </Grid>
            );
          })}
      </AppGrid>
    </>
  );
}
