/* import { StateCreator } from "zustand";

export type State = {
    token: string;
    userName: string;
    userId: string;
    permissions: any[];
};
export type Actions = {
    login: (newState: State) => void;
    logout: () => void;
};
const initialState: State = {
    token: "",
    userName: "",
    userId: "",
    permissions: [],
};

export const createAuthSlice: StateCreator<State & Actions> = (set) => ({
    token: "",
    userName: "",
    userId: "",
    permissions: [],
    login: (state) =>
        set((state) => ({
            userId: state.userId,
            userName: state.userName,
            permissions: state.permissions,
            token: state.token,
        })),
    logout: () =>
        set((state) => ({
            userId: "",
            userName: "",
            token: "",
            permissions: [],
        })),
});*/
import { StateCreator } from "zustand";
type User = {
    token: string;
    userName: string;
    userId: string;
    userType: string;
    permissions:
        | {
              Banks?: [boolean, boolean, boolean, boolean];
              Branches?: [boolean, boolean, boolean, boolean];
              Calculations?: [boolean, boolean, boolean, boolean];
              Cities?: [boolean, boolean, boolean, boolean];
              Employees?: [boolean, boolean, boolean, boolean];
              Orders?: [boolean, boolean, boolean, boolean];
              OrdersReports?: [boolean, boolean, boolean, boolean];
              Privileges?: [boolean, boolean, boolean, boolean];
              Representatives?: [boolean, boolean, boolean, boolean];
              Settings?: [boolean, boolean, boolean, boolean];
              States?: [boolean, boolean, boolean, boolean];
              Traders?: [boolean, boolean, boolean, boolean];
              safes?: [boolean, boolean, boolean, boolean];
          }
        | undefined;
};

export type AuthState = {
    user: User;
    login: (userData: User) => void;
    logout: () => void;
};

/* export type Actions = {
    
}; */
const initialState = {
    token: "",
    userName: "",
    userId: "",
    userType: "",
    permissions: undefined,
};

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
    user: initialState,
    login: (userData: User) =>
        set(() => {
            return { user: userData };
        }),
    logout: () =>
        set(() => ({
            user: initialState,
        })),
});
