import { Box, styled } from "@mui/system";

const MarginTop = styled(Box)(
  ({ theme }) => `
        ${theme.breakpoints.up("md")}  {
          margin-top: 50px;
        }
      `
);
export default MarginTop;
