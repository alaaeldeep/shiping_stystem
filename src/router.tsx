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
        ],
    },
    { path: "/login", element: <Login /> },
]);
