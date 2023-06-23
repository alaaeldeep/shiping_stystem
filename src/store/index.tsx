import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { createThemeSlice, ThemeSlice } from "./themeSlice/themeSlice";

import { createAuthSlice, AuthState } from "./authSlice/authSlice";

import { createPageNumber, PageSlice } from "./pageNumber/pageNumber";

export const useOwnStore = create<ThemeSlice & AuthState & PageSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...createThemeSlice(...a),
                ...createAuthSlice(...a),
                ...createPageNumber(...a),
            }),
            {
                name: "store",
            }
        )
    )
);
/* 
export const useOwnStore = create<ThemeSlice & CartSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...createThemeSlice(...a),
                ...createCartSlice(...a),
            }),
            {
                name: "store",
            }
        )
    )
);



*/
