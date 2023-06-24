import { StateCreator } from "zustand";

export interface PageSlice {
    BranchPageNumber: number | undefined; //👍
    CitiesPageNumber: number | undefined; //👍
    EmployeesPageNumber: number | undefined; //👍
    OrdersPageNumber: number | undefined;
    RepresentativesPageNumber: number | undefined; //👍
    PreveligesPageNumber: number | undefined; //👍
    StatesPageNumber: number | undefined; //👍
    TradersPageNumber: number | undefined; //👍
    changePageNumberBranch: (page: number | undefined) => void;
    changePageNumberCities: (page: number | undefined) => void;
    changePageNumberOrders: (page: number | undefined) => void;
    changePageNumberEmployees: (page: number | undefined) => void;
    changePageNumberRepresentatives: (page: number | undefined) => void;
    changePageNumberPreveliges: (page: number | undefined) => void;
    changePageNumberStates: (page: number | undefined) => void;
    changePageNumberTraders: (page: number | undefined) => void;
}

export const createPageNumber: StateCreator<PageSlice> = (set) => ({
    BranchPageNumber: 1,
    changePageNumberBranch: (page: number | undefined) =>
        set((state) => ({
            BranchPageNumber: page,
        })),
    CitiesPageNumber: 1,
    changePageNumberCities: (page: number | undefined) =>
        set((state) => ({
            CitiesPageNumber: page,
        })),
    EmployeesPageNumber: 1,
    changePageNumberEmployees: (page: number | undefined) =>
        set((state) => ({
            EmployeesPageNumber: page,
        })),
    OrdersPageNumber: 1,
    changePageNumberOrders: (page: number | undefined) =>
        set((state) => ({
            OrdersPageNumber: page,
        })),
    RepresentativesPageNumber: 1,
    changePageNumberRepresentatives: (page: number | undefined) =>
        set((state) => ({
            RepresentativesPageNumber: page,
        })),
    PreveligesPageNumber: 1,
    changePageNumberPreveliges: (page: number | undefined) =>
        set((state) => ({
            PreveligesPageNumber: page,
        })),
    StatesPageNumber: 1,
    changePageNumberStates: (page: number | undefined) =>
        set((state) => ({
            StatesPageNumber: page,
        })),
    TradersPageNumber: 1,
    changePageNumberTraders: (page: number | undefined) =>
        set((state) => ({
            TradersPageNumber: page,
        })),
});
