import React from "react";

import { Container, Grid } from "@mui/material";
import LeftMenu from "../Components/HomePage/LeftMenu";
import { Outlet } from "react-router-dom";
import MarginTop from "../Components/HomePage/MarginTop";
// import RightSidebar from "../components/RightSidebar/RightSidebar";

export default function HomePage() {
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
