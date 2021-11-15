import { Button, Grid } from "@mui/material";
import React from "react";
import { useAuth } from "../../Contexts/AuthContext";

export default function UnauthenticatedApp() {
  const { signIn } = useAuth();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Button variant="contained" onClick={signIn}>
        Sign In
      </Button>
    </Grid>
  );
}
