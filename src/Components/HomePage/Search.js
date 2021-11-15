import React from "react";
import { Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";

const AppSearch = styled(Paper)(
  ({ theme }) => `
  padding: 1rem;
  padding-top:0.5rem;
  background-color: ${theme.palette.background.default};
  border-radius: 17px;
  margin: 20px;
  display: "flex";
  justify-content="center"
  align-items: "flex-end";
`
);

const AppSearchIcon = styled(SearchIcon)(
  ({ theme }) => `
  color: ${theme.palette.action.active};
  padding-right: 15px;
`
);

export default function Search({ onSearch }) {
  return (
    <AppSearch
      elevation={6}
      sx={{
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <AppSearchIcon />
      <TextField
        fullWidth
        id="standard-basic"
        label="Search"
        variant="standard"
        size="small"
        onChange={onSearch}
      />
    </AppSearch>
  );
}
