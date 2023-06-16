import { PaletteMode } from "@mui/material";

import { arEG } from "@mui/material/locale";

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

export const getDesignTokens = (mode: PaletteMode) => ({
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
                      light: tokens.background.light,
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
    typography: { fontFamily: ["sans-serif"] },
    arEG,
    direction: "rtl",
});
/* export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  // palette values for light mode
                  primary: { main: "#fff" },
                  secondary: { main: "#DDE6ED" },
                  info: { main: "#222831" },

                  text: {
                      primary: "#27374D",
                      secondary: grey[800],
                  },
                  background: {
                      default: "#fff ",
                      paper: "#fff",
                  },
              }
            : {
                  // palette values for dark mode
                  primary: { main: "#222831" },
                  secondary: { main: "#393E46" },
                  info: { main: "#DDE6ED" },
                  background: {
                      default: "#222831 ",
                      paper: "#222831",
                  },
                  text: {
                      primary: "#fff",
                      secondary: grey[500],
                  },
              }),
    },
    typography: { fontFamily: ["sans-serif"] },
    arEG,
    direction: "rtl",
}); */
