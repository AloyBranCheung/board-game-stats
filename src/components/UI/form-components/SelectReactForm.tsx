import * as React from "react";
// mui
import { Select, SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// react-hook-form
import {
  Controller,
  Control,
  FieldValues,
  ControllerProps,
  Path,
  UnPackAsyncDefaultValues,
} from "react-hook-form";
// components
import ErrorMessage from "./ErrorMessage";

interface SelectProps<FV extends FieldValues>
  extends Omit<ControllerProps<FV>, "render" | "name"> {
  name: Path<UnPackAsyncDefaultValues<FV>>; // react hook unique name
  control: Control<FV>;
  children: React.ReactNode; // MenuItems with value props and <>...text</>
  label: string; // label of select
  isError: boolean | undefined;
  errorMessage: string | undefined;
  onSelectChange?: (
    // eslint-disable-next-line no-unused-vars
    e: SelectChangeEvent
  ) => void;
}

export default function SelectReactForm<FV extends FieldValues>({
  name,
  control,
  children,
  label,
  isError,
  errorMessage,
  onSelectChange,
}: SelectProps<FV>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>{label}</InputLabel>
              <Select
                value={value}
                label={label}
                onChange={(e) => {
                  onChange(e);
                  if (onSelectChange) {
                    onSelectChange(e);
                  }
                }}
              >
                {children}
              </Select>
            </FormControl>
          </Box>
          {isError && <ErrorMessage errorMessage={errorMessage} />}
        </>
      )}
    />
  );
}
