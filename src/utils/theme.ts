import { PaletteMode } from "@mui/material";
import { arEG } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
const tokens = {
    secondary: {
        100: "#f0f0f3",
        200: "#e1e2e7",
        300: "#d1d3da",
        400: "#c2c5ce",
        500: "#b3b6c2",
        600: "#8f929b",
        700: "#6b6d74",
        800: "#48494e",
        900: "#242427",
    },
    tertiary: {
        // purple
        500: "#8884d8",
    },
    background: {
        light: "#2d2d34",
        main: "#1f2026",
    },
};

export const getDesignTokens = (mode: PaletteMode) =>
    createTheme({
        palette: {
            mode,
            ...(mode === "light"
                ? {
                      // palette values for light mode
                      primary: {
                          main: "#C4DFDF",
                      },
                      secondary: {
                          main: "#C4DFDF",
                      },
                      tertiary: "#242427",
                      background: {
                          default: "#F8F6F4",
                          /*   light: tokens.background.light, */
                          paper: "#E3F4F4",
                      },
                      Text: "red",
                  }
                : /* for dark */
                  {
                      primary: {
                          main: "#242427",
                      },
                      secondary: {
                          main: tokens.background.light,
                      },
                      tertiary: "#f0f0f3",

                      background: {
                          default: tokens.background.main,

                          paper: tokens.background.main,
                      },
                  }),
        },
        typography: { fontFamily: ["Alexandria", "sans-serif"].join(",") },
        /*  arEG, */
        direction: "rtl",
    });
