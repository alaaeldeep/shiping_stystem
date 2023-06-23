import { createBrowserRouter } from "react-router-dom";

/* pages */
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
import Reports from "./pages/reports";
import ViewReports from "./pages/reports/view/viewReports";

import { useOwnStore } from "./store";
//const logged = useOwnStore((store) => store.user);
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <HomeMainContent /> },
            {
                path: "Permissions",
                element: <PermissionsPage />,
                children: [
                    { path: "", element: <ViewPermissions /> },
                    { path: "add", element: <AddPermissionPage /> },
                ],
            },
            {
                path: "employees",
                element: <EmployeesPage />,
                children: [
                    { path: "", element: <ViewEmployees /> },
                    { path: "add", element: <AddEmployPage /> },
                ],
            },
            {
                path: "traders",
                element: <TraderPage />,
                children: [
                    { path: "", element: <ViewTraders /> },
                    { path: "add", element: <AddTraderPage /> },
                ],
            },
            {
                path: "representatives",
                element: <Representative />,
                children: [
                    { path: "", element: <ViewRepresentatives /> },
                    { path: "add", element: <AddRepresentativesPage /> },
                ],
            },
            {
                path: "branches",
                element: <Branches />,
                children: [
                    { path: "", element: <ViewBranches /> },
                    { path: "add", element: <AddBranchesPage /> },
                ],
            },
            {
                path: "states",
                element: <States />,
                children: [
                    { path: "", element: <ViewStates /> },
                    { path: "add", element: <AddStatesPage /> },
                ],
            },
            {
                path: "cities",
                element: <Cities />,
                children: [
                    { path: "", element: <ViewCities /> },
                    { path: "add", element: <AddCityPage /> },
                ],
            },
            {
                path: "orders",
                element: <OrdersPage />,
                children: [
                    { path: "", element: <ViewOrders /> },
                    { path: "add", element: <AddOrderPage /> },
                ],
            },
            {
                path: "reports",
                element: <Reports />,
                children: [{ path: "", element: <ViewReports /> }],
            },
            {
                path: "weightSettings",
                element: <ViewWeightSettings />,
            },
        ],
    },
    { path: "/login", element: <Login /> },
]);
////////////////
/* const canActivateEmployeeAdd = useOwnStore(
    (store) => store.user.permissions?.Employees?.[0]
);
const canActivateEmployeeView = useOwnStore(
    (store) => store.user.permissions?.Employees?.[1]
);
const canActivateEmployeeEdit = useOwnStore(
    (store) => store.user.permissions?.Employees?.[2]
);
const canActivateEmployeeDelete = useOwnStore(
    (store) => store.user.permissions?.Employees?.[3]
);
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
const canActivateBanksAdd = useOwnStore(
    (store) => store.user.permissions?.Banks?.[0]
);
const canActivateBanksView = useOwnStore(
    (store) => store.user.permissions?.Banks?.[1]
);
const canActivateBanksEdit = useOwnStore(
    (store) => store.user.permissions?.Banks?.[2]
);
const canActivateBanksDelete = useOwnStore(
    (store) => store.user.permissions?.Banks?.[3]
);
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
const canActivateBranchesAdd = useOwnStore(
    (store) => store.user.permissions?.Branches?.[0]
);
const canActivateBranchesView = useOwnStore(
    (store) => store.user.permissions?.Branches?.[1]
);
const canActivateBranchesEdit = useOwnStore(
    (store) => store.user.permissions?.Branches?.[2]
);
const canActivateBranchesDelete = useOwnStore(
    (store) => store.user.permissions?.Branches?.[3]
);
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
const canActivateCalculationsAdd = useOwnStore(
    (store) => store.user.permissions?.Calculations?.[0]
);
const canActivateCalculationsView = useOwnStore(
    (store) => store.user.permissions?.Calculations?.[1]
);
const canActivateCalculationsEdit = useOwnStore(
    (store) => store.user.permissions?.Calculations?.[2]
);
const canActivateCalculationsDelete = useOwnStore(
    (store) => store.user.permissions?.Calculations?.[3]
);
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
const canActivateCitiesAdd = useOwnStore(
    (store) => store.user.permissions?.Cities?.[0]
);
const canActivateCitiesView = useOwnStore(
    (store) => store.user.permissions?.Cities?.[1]
);
const canActivateCitiesEdit = useOwnStore(
    (store) => store.user.permissions?.Cities?.[2]
);
const canActivateCitiesDelete = useOwnStore(
    (store) => store.user.permissions?.Cities?.[3]
);
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
const canActivateOrdersAdd = useOwnStore(
    (store) => store.user.permissions?.Orders?.[0]
);
const canActivateOrdersView = useOwnStore(
    (store) => store.user.permissions?.Orders?.[1]
);
const canActivateOrdersEdit = useOwnStore(
    (store) => store.user.permissions?.Orders?.[2]
);
const canActivateOrdersDelete = useOwnStore(
    (store) => store.user.permissions?.Orders?.[3]
);
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
const canActivateOrdersReportsAdd = useOwnStore(
    (store) => store.user.permissions?.OrdersReports?.[0]
);
const canActivateOrdersReportsView = useOwnStore(
    (store) => store.user.permissions?.OrdersReports?.[1]
);
const canActivateOrdersReportsEdit = useOwnStore(
    (store) => store.user.permissions?.OrdersReports?.[2]
);
const canActivateOrdersReportsDelete = useOwnStore(
    (store) => store.user.permissions?.OrdersReports?.[3]
);
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
const canActivatePrivilegesAdd = useOwnStore(
    (store) => store.user.permissions?.Privileges?.[0]
);
const canActivatePrivilegesView = useOwnStore(
    (store) => store.user.permissions?.Privileges?.[1]
);
const canActivatePrivilegesEdit = useOwnStore(
    (store) => store.user.permissions?.Privileges?.[2]
);
const canActivatePrivilegesDelete = useOwnStore(
    (store) => store.user.permissions?.Privileges?.[3]
);
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
const canActivateRepresentativesAdd = useOwnStore(
    (store) => store.user.permissions?.Representatives?.[0]
);
const canActivateRepresentativesView = useOwnStore(
    (store) => store.user.permissions?.Representatives?.[1]
);
const canActivateRepresentativesEdit = useOwnStore(
    (store) => store.user.permissions?.Representatives?.[2]
);
const canActivateRepresentativesDelete = useOwnStore(
    (store) => store.user.permissions?.Representatives?.[3]
);
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
const canActivateSettingsAdd = useOwnStore(
    (store) => store.user.permissions?.Settings?.[0]
);
const canActivateSettingsView = useOwnStore(
    (store) => store.user.permissions?.Settings?.[1]
);
const canActivateSettingsEdit = useOwnStore(
    (store) => store.user.permissions?.Settings?.[2]
);
const canActivateSettingsDelete = useOwnStore(
    (store) => store.user.permissions?.Settings?.[3]
);
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
const canActivateStatesAdd = useOwnStore(
    (store) => store.user.permissions?.States?.[0]
);
const canActivateStatesView = useOwnStore(
    (store) => store.user.permissions?.States?.[1]
);
const canActivateStatesEdit = useOwnStore(
    (store) => store.user.permissions?.States?.[2]
);
const canActivateStatesDelete = useOwnStore(
    (store) => store.user.permissions?.States?.[3]
);
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
const canActivateTradersAdd = useOwnStore(
    (store) => store.user.permissions?.Traders?.[0]
);
const canActivateTradersView = useOwnStore(
    (store) => store.user.permissions?.Traders?.[1]
);
const canActivateTradersEdit = useOwnStore(
    (store) => store.user.permissions?.Traders?.[2]
);
const canActivateTradersDelete = useOwnStore(
    (store) => store.user.permissions?.Traders?.[3]
);
////////////////
////////////////
////////////////
////////////////
////////////////
////////////////
const canActivatesafesAdd = useOwnStore(
    (store) => store.user.permissions?.safes?.[0]
);
const canActivatesafesView = useOwnStore(
    (store) => store.user.permissions?.safes?.[1]
);
const canActivatesafesEdit = useOwnStore(
    (store) => store.user.permissions?.safes?.[2]
);
const canActivatesafesDelete = useOwnStore(
    (store) => store.user.permissions?.safes?.[3]
); */
