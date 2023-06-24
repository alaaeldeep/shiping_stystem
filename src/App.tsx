/* react staff */
import { useMemo } from "react";

/*  router */
import { Navigate, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

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

/* pages routing*/
import Layout from "./pages/Layout";

/* login */
import Login from "./pages/login";

/* first page => view orders */
import HomeMainContent from "./pages/home-body";

/* permissions */
import PermissionsPage from "./pages/permissionsPage";
import AddPermissionPage from "./pages/permissionsPage/add/addPermissionPage";
import ViewPermissions from "./pages/permissionsPage/view/viewPermissions";

/* employees */
import EmployeesPage from "./pages/employes";
import ViewEmployees from "./pages/employes/view/viewEmployees";
import AddEmployPage from "./pages/employes/add/addEmployPage";

/* traders */
import TraderPage from "./pages/trader";
import ViewTraders from "./pages/trader/view/viewTrader";
import AddTraderPage from "./pages/trader/add/addTraderPage";

/* Representatives */
import Representative from "./pages/representative";
import ViewRepresentatives from "./pages/representative/view/viewRepresentatives";
import AddRepresentativesPage from "./pages/representative/add/addRepresentativesPage";

/* branches */
import Branches from "./pages/branches";
import ViewBranches from "./pages/branches/view/viewBranches";
import AddBranchesPage from "./pages/branches/add/addBranchesPage";

/* states */
import States from "./pages/states";
import ViewStates from "./pages/states/view/viewStates";
import AddStatesPage from "./pages/states/add/addStatesPage";

/* cities */
import Cities from "./pages/cities";
import ViewCities from "./pages/cities/view/viewCities";
import AddCityPage from "./pages/cities/add/addCityPage";

/* orders */
import ViewOrders from "./pages/orders/view/viewOrders";
import AddOrderPage from "./pages/orders/add/addOrderPage";
import OrdersPage from "./pages/orders";

/* settings */
import ViewWeightSettings from "./pages/weightSetting";

/* reports */
import ReportPage from "./pages/reports";
import ViewReports from "./pages/reports/view/viewReports";

/* Shipping Type Settings */
import ShippingTypeSettings from "./pages/shippingTypeSetting";
import ViewShippingTypes from "./pages/shippingTypeSetting/view/viewBranches";
import AddShippingType from "./pages/shippingTypeSetting/add/addShippingTypePage";

/* not found */
import PageNotFound from "./pages/PageNotFound";

/*  */
const queryClient = new QueryClient();

function App() {
    const mode = useOwnStore((store) => store.mode);
    const logged = useOwnStore((store) => store.user.token);
    const userType = useOwnStore((store) => store.user.userType);
    /* employees Activations */
    const canActivateEmployeeAdd = useOwnStore(
        (store) => store.user.permissions?.Employees?.[0]
    );
    const canActivateEmployeeView = useOwnStore(
        (store) => store.user.permissions?.Employees?.[1]
    );
    /* Traders Activations */
    const canActivateTradersAdd = useOwnStore(
        (store) => store.user.permissions?.Traders?.[0]
    );
    const canActivateTradersView = useOwnStore(
        (store) => store.user.permissions?.Traders?.[1]
    );
    /* Represntative Activations */
    const canActivateRepresentativesAdd = useOwnStore(
        (store) => store.user.permissions?.Representatives?.[0]
    );
    const canActivateRepresentativesView = useOwnStore(
        (store) => store.user.permissions?.Representatives?.[1]
    );
    /* Branches Activations */
    const canActivateBranchesAdd = useOwnStore(
        (store) => store.user.permissions?.Branches?.[0]
    );
    const canActivateBranchesView = useOwnStore(
        (store) => store.user.permissions?.Branches?.[1]
    );
    /* settings Activations */
    const canActivateSettingsAdd = useOwnStore(
        (store) => store.user.permissions?.Settings?.[0]
    );
    const canActivateSettingsView = useOwnStore(
        (store) => store.user.permissions?.Settings?.[1]
    );
    /* order Activations */
    const canActivateOrdersAdd = useOwnStore(
        (store) => store.user.permissions?.Orders?.[0]
    );
    const canActivateOrdersView = useOwnStore(
        (store) => store.user.permissions?.Orders?.[1]
    );
    /* cities Activations */
    const canActivateCitiesAdd = useOwnStore(
        (store) => store.user.permissions?.Cities?.[0]
    );
    const canActivateCitiesView = useOwnStore(
        (store) => store.user.permissions?.Cities?.[1]
    );
    /* states Activations */
    const canActivateStatesAdd = useOwnStore(
        (store) => store.user.permissions?.States?.[0]
    );
    const canActivateStatesView = useOwnStore(
        (store) => store.user.permissions?.States?.[1]
    );
    /* Privileges Activations */
    const canActivatePrivilegesAdd = useOwnStore(
        (store) => store.user.permissions?.Privileges?.[0]
    );
    const canActivatePrivilegesView = useOwnStore(
        (store) => store.user.permissions?.Privileges?.[1]
    );
    /* reports Activations */
    const canActivateOrdersReportsView = useOwnStore(
        (store) => store.user.permissions?.OrdersReports?.[1]
    );

    const theme = useMemo(
        () => createTheme(getDesignTokens(mode as PaletteMode)),
        [mode]
    );
    const routeHandler: boolean = (canActivate: boolean, userType: string) => {
        if (
            canActivate ||
            userType === "Trader" ||
            userType === "Representative"
        )
            return true;
        return false;
    };
    const router = createBrowserRouter([
        {
            path: "/",
            /*  element: <Layout />, */
            element: logged ? <Layout /> : <Navigate to="/login" />,
            children: [
                { path: "", element: <HomeMainContent /> },
                /* Permissions 👍*/
                {
                    path: "Permissions",
                    element: <PermissionsPage />,
                    children: [
                        {
                            path: "",
                            element: canActivatePrivilegesView ? (
                                <ViewPermissions />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                        {
                            path: "add",
                            element: canActivatePrivilegesAdd ? (
                                <AddPermissionPage />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                    ],
                },
                /* employees 👍*/
                {
                    path: "employees",
                    element: <EmployeesPage />,
                    children: [
                        {
                            path: "",
                            element: canActivateEmployeeView ? (
                                <ViewEmployees />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                        {
                            path: "add",
                            element: canActivateEmployeeAdd ? (
                                <AddEmployPage />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                    ],
                },
                /*traders  👍*/
                {
                    path: "traders",
                    element: <TraderPage />,
                    children: [
                        {
                            path: "",
                            element: canActivateTradersView ? (
                                <ViewTraders />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                        {
                            path: "add",
                            element: canActivateTradersAdd ? (
                                <AddTraderPage />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                    ],
                },
                /* representatives 👍*/
                {
                    path: "representatives",
                    element: <Representative />,
                    children: [
                        {
                            path: "",
                            element: canActivateRepresentativesView ? (
                                <ViewRepresentatives />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                        {
                            path: "add",
                            element: canActivateRepresentativesAdd ? (
                                <AddRepresentativesPage />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                    ],
                },
                /* branches 👍*/
                {
                    path: "branches",
                    element: <Branches />,
                    children: [
                        {
                            path: "",
                            element: canActivateBranchesView ? (
                                <ViewBranches />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                        {
                            path: "add",
                            element: canActivateBranchesAdd ? (
                                <AddBranchesPage />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                    ],
                },
                /* shippingType 👍*/
                {
                    path: "shippingType",
                    element: <ShippingTypeSettings />,
                    children: [
                        {
                            path: "",
                            element: canActivateSettingsView ? (
                                <ViewShippingTypes />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                        {
                            path: "add",
                            element: canActivateSettingsAdd ? (
                                <AddShippingType />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                    ],
                },
                /* states 👍*/
                {
                    path: "states",
                    element: <States />,
                    children: [
                        {
                            path: "",
                            element: canActivateStatesView ? (
                                <ViewStates />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                        {
                            path: "add",
                            element: canActivateStatesAdd ? (
                                <AddStatesPage />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                    ],
                },
                /* cities 👍*/
                {
                    path: "cities",
                    element: <Cities />,
                    children: [
                        {
                            path: "",
                            element: canActivateCitiesView ? (
                                <ViewCities />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                        {
                            path: "add",
                            element: canActivateCitiesAdd ? (
                                <AddCityPage />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                    ],
                },
                /* orders 👍*/
                {
                    path: "orders",
                    element: <OrdersPage />,
                    children: [
                        {
                            path: "",
                            element: canActivateOrdersView ? (
                                <ViewOrders />
                            ) : userType === "Trader" ? (
                                <ViewOrders />
                            ) : userType === "Representative" ? (
                                <ViewOrders />
                            ) : (
                                <Navigate to="/" />
                            ),
                            /*  element:
                                userType === ("Trader" || "Representative") ||
                                canActivateOrdersView ? (
                                    <ViewOrders />
                                ) : (
                                    <Navigate to="/" />
                                ), */
                        },
                        {
                            path: ":orderStatus",
                            element: canActivateOrdersView ? (
                                <ViewOrders />
                            ) : userType === "Trader" ? (
                                <ViewOrders />
                            ) : userType === "Representative" ? (
                                <ViewOrders />
                            ) : (
                                <Navigate to="/" />
                            ),
                            /*  element:
                                userType === ("Trader" || "Representative") ||
                                canActivateOrdersView ? (
                                    <ViewOrders />
                                ) : (
                                    <Navigate to="/" />
                                ), */
                        },
                        {
                            path: "add",
                            element:
                                userType === "Trader" ? (
                                    <AddOrderPage />
                                ) : (
                                    <Navigate to="/" />
                                ),
                        },
                    ],
                },
                /* reports 👍*/
                {
                    path: "reports",
                    element: <ReportPage />,
                    children: [
                        {
                            path: "",
                            element: canActivateOrdersReportsView ? (
                                <ViewReports />
                            ) : (
                                <Navigate to="/" />
                            ),
                        },
                    ],
                },
                /* weightSettings 👍*/
                {
                    path: "weightSettings",
                    element: canActivateSettingsView ? (
                        <ViewWeightSettings />
                    ) : (
                        <Navigate to="/" />
                    ),
                },
                /* not Found 👍*/
                {
                    path: "*",
                    element: <PageNotFound />,
                },
            ],
        },
        {
            path: "/login",
            element: !logged ? <Login /> : <Navigate to="/" />,
        },
    ]);
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
