import { StateCreator } from "zustand";

export interface ThemeSlice {
    mode: string;
    changeMode: () => void;
}
const initialState = window.matchMedia("(prefers-color-scheme: dark)").matches;

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
    mode: initialState ? "dark" : "light",
    changeMode: () =>
        set((state) => ({
            mode: state.mode === "dark" ? "light" : "dark",
        })),
});
