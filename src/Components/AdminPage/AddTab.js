import React from "react";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  Paper,
  Snackbar,
} from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import { useAuth } from "../../Contexts/AuthContext";
import { addFirebaseDoc } from "../../utils/product";
import MarginTop from "./MarginTop";

const defaultState = {
  name: "Product name",
  image: "",
  description: "",
  prices: 0,
};
export default function AddTab() {
  const { currentUser } = useAuth();
  const [productInfo, setProductInfo] = React.useState(defaultState);
  const [isOpenSnackBar, setIsOpenSnackBar] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const newProduct = {
      ...productInfo,
      shopId: currentUser.uid,
    };
    await addFirebaseDoc("product", newProduct);
    setProductInfo(defaultState);
    setIsOpenSnackBar(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpenSnackBar(false);
  };

  return (
    <>
      <MarginTop />
      <Grid container spacing={2} columns={14}>
        <Grid item xl={4} xs>
          <Paper
            elevation={6}
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <List>
              <ListItem>
                <ListItemText
                  primary="Create product"
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                />
              </ListItem>
              <form onSubmit={handleSubmit}>
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="product-name">name</InputLabel>
                    <OutlinedInput
                      id="product-name"
                      value={productInfo.name}
                      onChange={(e) => {
                        setProductInfo({
                          ...productInfo,
                          name: e.target.value,
                        });
                      }}
                      label="Name"
                    />
                  </FormControl>
                </ListItem>
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="product-image">Image</InputLabel>
                    <OutlinedInput
                      id="product-image"
                      value={productInfo.image}
                      onChange={(e) => {
                        setProductInfo({
                          ...productInfo,
                          image: e.target.value,
                        });
                      }}
                      label="Name"
                    />
                  </FormControl>
                </ListItem>
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="product-price">price</InputLabel>
                    <OutlinedInput
                      id="product-price"
                      value={productInfo.prices}
                      type="number"
                      onChange={(e) => {
                        setProductInfo({
                          ...productInfo,
                          prices: Number(e.target.value),
                        });
                      }}
                      label="Name"
                    />
                  </FormControl>
                </ListItem>
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="product-description">
                      description
                    </InputLabel>
                    <OutlinedInput
                      id="product-description"
                      value={productInfo.description}
                      onChange={(e) => {
                        setProductInfo({
                          ...productInfo,
                          description: e.target.value,
                        });
                      }}
                      label="Name"
                    />
                  </FormControl>
                </ListItem>
                <ListItem>
                  <Button variant="contained" type="submit">
                    Create
                  </Button>
                </ListItem>
              </form>
            </List>
          </Paper>
        </Grid>
        <Grid item xl={3} xs={12} sx={{ margin: "0 auto" }}>
          <ProductCard
            image={productInfo.image}
            title={productInfo.name}
            description={productInfo.description}
            prices={productInfo.prices}
            handleClick={() => {}}
          />
        </Grid>
        <Snackbar
          open={isOpenSnackBar}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Add product success!
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
}
