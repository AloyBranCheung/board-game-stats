import { Typography } from "@mui/material";

interface ErrorMessageProps {
  errorMessage: string | undefined;
}

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  return <Typography sx={{ color: "error.main" }}>{errorMessage}</Typography>;
}
