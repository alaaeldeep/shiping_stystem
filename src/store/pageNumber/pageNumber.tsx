import { StateCreator } from "zustand";

export interface PageSlice {
    BranchPageNumber: number | undefined;
    changePageNumberBranch: (page: number | undefined) => void;
}

export const createPageNumber: StateCreator<PageSlice> = (set) => ({
    BranchPageNumber: 1,
    changePageNumberBranch: (page: number | undefined) =>
        set((state) => ({
            BranchPageNumber: page,
        })),
});
