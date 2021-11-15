import { Grid } from "@mui/material";
import { styled } from "@mui/system";

const AppGrid = styled(Grid)(
  ({ theme }) => `
    justify-content: center;
    ${theme.breakpoints.up("md")}  {
      justify-content: flex-start;
    }
  `
);

export default AppGrid;
