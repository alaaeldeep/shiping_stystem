/* react  */
import { useMemo } from "react";

/*  router */
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

/* MUI & theme */
import {
    createTheme,
    CssBaseline,
    PaletteMode,
    ThemeProvider,
} from "@mui/material";
import { getDesignTokens } from "./utils/theme";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

/* server state management */
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

/* store => client state management */
import { useOwnStore } from "./store";

/* toast */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create rtl cache
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
});

/*  */

/*  */
const queryClient = new QueryClient();

function App() {
    const mode = useOwnStore((store) => store.mode);

    const theme = useMemo(
        () => createTheme(getDesignTokens(mode as PaletteMode)),
        [mode]
    );
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <RouterProvider router={router} />
                    <ToastContainer rtl />
                </ThemeProvider>
            </CacheProvider>
        </QueryClientProvider>
    );
}

export default App;
