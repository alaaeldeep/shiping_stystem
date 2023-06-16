/* react staff */
import { useState } from "react";

/* MUI */
import { Box, Toolbar } from "@mui/material";

/* components */
import NavBar from "../../components/nav-bar";
import HomeMainContent from "../home-body";
import DrawerComponent from "../../components/drawer";
import { Outlet } from "react-router";

const drawerWidth = 220;

const Layout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            {/* nav-bar */}
            <NavBar
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
            />

            {/* drawer */}
            <DrawerComponent
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />

            {/* content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    margin: "2.2rem 1rem",
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                {" "}
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
