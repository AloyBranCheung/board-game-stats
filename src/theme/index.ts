import { createTheme } from "@mui/material";
//
import PALETTE from "src/theme/palette";
import TYPOGRAPHY from "src/theme/typography";
import COMPONENTS from "./components";

const theme = createTheme({ ...PALETTE, ...TYPOGRAPHY, ...COMPONENTS });

export default theme;
