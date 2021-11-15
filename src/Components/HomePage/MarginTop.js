import { Box, styled } from "@mui/system";

const MarginTop = styled(Box)(
  ({ theme }) => `
    height: 10px;
    ${theme.breakpoints.up("md")}  {
      height: 109px;
    }
  `
);
export default MarginTop;
