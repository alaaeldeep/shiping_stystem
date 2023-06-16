import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createThemeSlice, ThemeSlice } from "./themeSlice";

export const useOwnStore = create<ThemeSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...createThemeSlice(...a),
            }),
            {
                name: "store",
            }
        )
    )
);
