import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const AppFullPage = styled("div")(
  ({ theme }) => `
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.palette.background.paper};
`
);

export default function FullPageProgress({ size }) {
  return (
    <AppFullPage>
      <CircularProgress size={size} />
    </AppFullPage>
  );
}
