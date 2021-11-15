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
import {
  deleteFirebaseDoc,
  updateFirebaseDoc,
  useCollectionParamDocId,
} from "../../utils/product";
import MarginTop from "./MarginTop";
import ProductCard from "../ProductCard/ProductCard";
import FullPageProgress from "../FullPageProgress/FullPageProgress";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

const defaultState = {
  name: "",
  image: "",
  description: "",
  prices: 0,
};

export default function EditTab() {
  const {
    listData: listShop,
    isSuccess,
    isLoading,
    error,
  } = useCollectionParamDocId("product", "productId");
  const { productId } = useParams();
  const [productInfo, setProductInfo] = React.useState(defaultState);
  const [isOpenSnackBar, setIsOpenSnackBar] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSuccess) {
      const [firstList] = listShop;
      const newList = {
        name: firstList.name,
        image: firstList.image,
        description: firstList.description,
        prices: firstList.prices,
      };
      setProductInfo(newList);
    }
  }, [isSuccess, listShop]);

  async function handleSubmit(e) {
    e.preventDefault();
    const newProduct = { ...productInfo };
    await updateFirebaseDoc("product", newProduct, productId);
    setIsOpenSnackBar(true);
    navigate("/myShop");
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenSnackBar(false);
  };

  async function handleDelete() {
    try {
      await deleteFirebaseDoc("product", productId);
      navigate("/myShop");
    } catch (error) {
      console.log(error);
    }
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
                    update
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                  >
                    delete
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
