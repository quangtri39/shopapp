import React from "react";
import { Alert, Grid } from "@mui/material";
import { useAuth } from "../../Contexts/AuthContext";
import { convertName, useSnapshotCollection } from "../../utils/product";
import FullPageProgress from "../FullPageProgress/FullPageProgress";
import Search from "../HomePage/Search";
import MarginTop from "./MarginTop";
import TableInfo from "./TableInfo";

export default function HomeTab() {
  const { currentUser } = useAuth();
  const {
    listData: listProduct,
    isLoading,
    error,
  } = useSnapshotCollection("product", "shopId", currentUser.uid);
  let [search, setSearch] = React.useState("");
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

  const productTable = listProduct.filter((item) => {
    if (!search) return true;
    let name = convertName(item.name);
    return name.includes(convertName(search));
  });

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} xl={5}>
          <Search onSearch={handleSearch} />
        </Grid>
      </Grid>
      <TableInfo rows={productTable} />
    </>
  );
}
