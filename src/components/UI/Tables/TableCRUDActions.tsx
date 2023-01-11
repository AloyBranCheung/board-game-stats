import React from "react";
// mui
import { Tooltip, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// types
import { MRT_Row, MRT_TableInstance } from "material-react-table";

interface TableCRUDActionsProps<T extends Record<string, any>> {
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
  // eslint-disable-next-line no-unused-vars
  handleDeleteRow: (row: MRT_Row<T>) => void;
}

export default function TableCRUDActions<T extends Record<string, any>>({
  row,
  table,
  handleDeleteRow,
}: TableCRUDActionsProps<T>) {
  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip arrow placement="left" title="Edit">
        <IconButton onClick={() => table.setEditingRow(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip arrow placement="right" title="Delete">
        <IconButton color="error" onClick={() => handleDeleteRow(row)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
