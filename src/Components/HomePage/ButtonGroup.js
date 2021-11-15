import { Button, Grid, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import useStore from "../../Contexts/Zustand";

const AppIconButton = styled(IconButton)(
  ({ theme }) => `  
    padding: 6px;
    border-radius: 5px;
    background-color: ${theme.palette.success.main};
    color: ${theme.palette.common.white};
    :hover {
      background-color: ${theme.palette.success.light};
    };
  `
);

export default function ButtonGroup({ isInCart, product }) {
  const removeProduct = useStore((state) => state.removeProduct);
  const addProduct = useStore((state) => state.addProduct);
  const minusProduct = useStore((state) => state.minusProduct);

  if (!isInCart) {
    return (
      <Button variant="contained" onClick={() => addProduct(product)}>
        Add
      </Button>
    );
  }
  return (
    <Grid container alignItems="center" columns={13}>
      <Grid item xs={5}>
        <Button
          variant="contained"
          size="medium"
          color="error"
          onClick={() => removeProduct(product)}
        >
          Delete
        </Button>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={3}>
        <AppIconButton onClick={() => addProduct(product)}>
          <AddIcon />
        </AppIconButton>
      </Grid>
      <Grid item xs={3} onClick={() => minusProduct(product)}>
        <AppIconButton>
          <RemoveIcon />
        </AppIconButton>
      </Grid>
    </Grid>
  );
}
