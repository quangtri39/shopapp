import {
  Paper,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  Stack,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TableInfo({ rows }) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Prices</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  src={row.image}
                  alt={row.name}
                  loading="lazy"
                  width="50"
                  height="50"
                  style={{ objectFit: "cover" }}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.prices}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`${row.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => navigate(`${row.id}`)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
