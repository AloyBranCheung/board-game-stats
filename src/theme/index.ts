import { createTheme } from "@mui/material";
//
import PALETTE from "src/theme/palette";
import TYPOGRAPHY from "src/theme/typography";

const theme = createTheme({ ...PALETTE, ...TYPOGRAPHY });

export default theme;
