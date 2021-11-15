import React from "react";
import { useAuth } from "../../Contexts/AuthContext";
import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { updateShopInfo } from "../../utils/product";
import { useNavigate } from "react-router-dom";
import MarginTop from "./MarginTop";

export default function InfoTab({
  title = "Shop info",
  btnText = "Update",
  initShopInfo = {
    image: "",
    name: "",
  },
}) {
  const [shopInfo, setShopInfo] = React.useState(initShopInfo);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const newShopInfo = {
      ...shopInfo,
      shopId: currentUser.uid,
    };
    await updateShopInfo(newShopInfo);
    navigate("/myShop");
  }

  return (
    <>
      <MarginTop />
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
              primary={title}
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
                  onChange={(e) => {
                    setShopInfo({ ...shopInfo, name: e.target.value });
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
                  onChange={(e) => {
                    setShopInfo({ ...shopInfo, image: e.target.value });
                  }}
                  label="Name"
                />
              </FormControl>
            </ListItem>

            <ListItem sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button variant="contained" type="submit" size="large">
                {btnText}
              </Button>
            </ListItem>
          </form>
        </List>
      </Paper>
    </>
  );
}
