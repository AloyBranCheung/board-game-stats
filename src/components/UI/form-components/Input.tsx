import React from "react";
// MUI
import { TextField } from "@mui/material";
// react-hook-form
import {
  Controller,
  Control,
  FieldValues,
  ControllerProps,
  Path,
  UnPackAsyncDefaultValues,
} from "react-hook-form";

interface InputProps<FV extends FieldValues>
  extends Omit<ControllerProps<FV>, "render" | "name"> {
  name: Path<UnPackAsyncDefaultValues<FV>>;
  control: Control<FV>;
  label: string;
  isError?: boolean;
  errorMessage?: string;
  inputType?: "password";
}

export default function Input<FV extends FieldValues>({
  name,
  control,
  label,
  inputType,
  isError,
  errorMessage,
}: InputProps<FV>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          {...(isError && { helperText: errorMessage, error: true })}
          type={inputType}
          onChange={onChange}
          value={value}
          label={label}
        />
      )}
    />
  );
}
