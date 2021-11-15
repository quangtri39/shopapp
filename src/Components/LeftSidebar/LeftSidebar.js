import { Divider, List, ListItem, ListItemText, Paper } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const AppPaper = styled(Paper)`
  border-radius: 12px;
  overflow: hidden;
  padding: 0 12px;
`;

export default function LeftSidebar({ title, children }) {
  return (
    <AppPaper elevation={6}>
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
        <Divider />
        {children}
      </List>
    </AppPaper>
  );
}
