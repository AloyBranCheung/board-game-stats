import React from "react";
// mui
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
// types/utils
import { MenuItem as Menu } from "src/@types/Generics";

interface PrimarySelectProps {
  listOfBoardGames: Menu[];
  selectedItem: string;
  onSelectChange: (
    // eslint-disable-next-line no-unused-vars
    event: SelectChangeEvent<any>,
    // eslint-disable-next-line no-unused-vars
    child: React.ReactNode
  ) => void;
}

export default function PrimarySelect({
  listOfBoardGames,
  selectedItem,
  onSelectChange,
}: PrimarySelectProps) {
  const menuItems = listOfBoardGames.map((item) => (
    <MenuItem key={item.name} value={item.value}>
      {item.name}
    </MenuItem>
  ));

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="primary-select-label">Select a Board Game</InputLabel>
        <Select
          labelId="primary-select-label"
          value={selectedItem}
          label="Select a Board Game"
          onChange={onSelectChange}
        >
          {menuItems}
        </Select>
      </FormControl>
    </Box>
  );
}
