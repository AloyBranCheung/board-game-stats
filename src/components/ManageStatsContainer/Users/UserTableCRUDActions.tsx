import React from "react";
// mui
import { Tooltip, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// types
import { User } from "src/@types/UserTypes";
import { MRT_Row, MRT_TableInstance } from "material-react-table";

interface TableCRUDActionsProps {
  row: MRT_Row<User>;
  table: MRT_TableInstance<User>;
  // eslint-disable-next-line no-unused-vars
  handleDeleteRow: (row: MRT_Row<User>) => void;
}

export default function UserTableCRUDActions({
  row,
  table,
  handleDeleteRow,
}: TableCRUDActionsProps) {
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
