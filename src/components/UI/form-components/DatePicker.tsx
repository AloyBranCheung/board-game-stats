// react-hook-form
import {
  Controller,
  FieldValues,
  ControllerProps,
  UnPackAsyncDefaultValues,
  Path,
  Control,
} from "react-hook-form";
// date-picker
import { TextField, Typography } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

interface DatePickerProps<FV extends FieldValues>
  extends Omit<ControllerProps<FV>, "render" | "name"> {
  name: Path<UnPackAsyncDefaultValues<FV>>;
  control: Control<FV>;
  isError?: boolean;
  errorMessage?: string;
}

export default function DatePicker<FV extends FieldValues>({
  name,
  control,
  isError,
  errorMessage,
}: DatePickerProps<FV>) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <MobileDatePicker
            label="Date mobile"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
      {isError && (
        <Typography sx={{ color: "error.main" }}>{errorMessage}</Typography>
      )}
    </>
  );
}
