import React from "react";
import { Alert, Grid, Paper, Typography } from "@mui/material";

import { useSnapshotCollectionUID } from "../../utils/product";
import FullPageProgress from "../FullPageProgress/FullPageProgress";
import AppGrid from "../MUIComponents/AppGrid";
import ProductCard from "../ProductCard/ProductCard";
import MarginTop from "./MarginTop";

export default function HistoryTab() {
  const {
    listData: receipts,
    isLoading,
    error,
  } = useSnapshotCollectionUID("receipt", "userId");
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
      <MarginTop />
      <AppGrid container spacing={3} columns={10}>
        {receipts.map((receipt) => {
          return (
            <Grid item xs={12} key={receipt.id}>
              <Paper elevation={6} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom component="h3">
                  Time: {receipt.time}
                </Typography>
                <AppGrid container spacing={3} columns={10}>
                  {receipt.data.map((product) => {
                    return (
                      <Grid item xs={9} xl={2} key={product.id}>
                        <ProductCard
                          image={product.image}
                          title={product.name}
                          description={product.description}
                          prices={product.prices}
                          count={product.count}
                        ></ProductCard>
                      </Grid>
                    );
                  })}
                </AppGrid>
              </Paper>
            </Grid>
          );
        })}
      </AppGrid>
    </>
  );
}
