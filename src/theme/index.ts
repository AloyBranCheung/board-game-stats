import { createTheme, responsiveFontSizes } from "@mui/material";
//
import PALETTE from "src/theme/palette";
import TYPOGRAPHY from "src/theme/typography";
import COMPONENTS from "./components";
import BREAKPOINTS from "./breakpoints";

const theme = responsiveFontSizes(
  createTheme({ ...PALETTE, ...TYPOGRAPHY, ...COMPONENTS, ...BREAKPOINTS })
);

export default theme;
