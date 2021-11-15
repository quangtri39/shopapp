import React from "react";

import { Alert, Container, Grid } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import LeftMenu from "../Components/AdminPage/LeftMenu";
import { useSnapshotCollectionUID } from "../utils/product";
import FullPageProgress from "../Components/FullPageProgress/FullPageProgress";
import MarginTop from "../Components/AdminPage/MarginTop";

export default function HomePage() {
  const {
    listData: ListShop,
    isLoading,
    error,
  } = useSnapshotCollectionUID("shop", "shopId");

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
  // if shop exist that mean ListShop have item
  const [firstShopMatch] = ListShop;
  if (!firstShopMatch) {
    return <Navigate replace to="/createShop" />;
  }
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} xl={3}>
          <MarginTop />
          <LeftMenu />
        </Grid>
        <Grid item xs={12} xl={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
}
