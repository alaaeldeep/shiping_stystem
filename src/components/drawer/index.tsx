/* react staff */
import { useState } from "react";

/* router */
import { NavLink, useNavigate } from "react-router-dom";

/* MUI */
import {
    Box,
    Collapse,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import ScaleIcon from "@mui/icons-material/Scale";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

/* store */
import { useOwnStore } from "../../store";

/* styles */
import styles from "./styles.module.css";

interface Props {
    window?: () => Window;
    drawerWidth: number;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

const DrawerComponent = ({
    drawerWidth,
    window,
    mobileOpen,
    handleDrawerToggle,
}: Props) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        setOpen(!open);
    };
    const [openTraderCollapse, setOpenTraderCollapse] = useState(false);
    const handleClickTraderCollapse = () => {
        setOpenTraderCollapse(!openTraderCollapse);
    };
    /* orders */
    const userType = useOwnStore.getState().user.userType;
    const canActivateOrdersView = useOwnStore(
        (store) => store.user.permissions?.Orders?.[1]
    );
    /* trader */
    const canActivateTradersAdd = useOwnStore(
        (store) => store.user.permissions?.Traders?.[0]
    );
    const canActivateTradersView = useOwnStore(
        (store) => store.user.permissions?.Traders?.[1]
    );

    /* employee */
    const canActivateEmployeeAdd = useOwnStore(
        (store) => store.user.permissions?.Employees?.[0]
    );
    const canActivateEmployeeView = useOwnStore(
        (store) => store.user.permissions?.Employees?.[1]
    );

    /* representative */
    const canActivateRepresentativesAdd = useOwnStore(
        (store) => store.user.permissions?.Representatives?.[0]
    );
    const canActivateRepresentativesView = useOwnStore(
        (store) => store.user.permissions?.Representatives?.[1]
    );
    /* Branches */
    const canActivateBranchesAdd = useOwnStore(
        (store) => store.user.permissions?.Branches?.[0]
    );
    const canActivateBranchesView = useOwnStore(
        (store) => store.user.permissions?.Branches?.[1]
    );
    /* Settings */
    const canActivateSettingsView = useOwnStore(
        (store) => store.user.permissions?.Settings?.[1]
    );
    const canActivateSettingsAdd = useOwnStore(
        (store) => store.user.permissions?.Settings?.[0]
    );
    /* cities */
    const canActivateCitiesAdd = useOwnStore(
        (store) => store.user.permissions?.Cities?.[0]
    );
    const canActivateCitiesView = useOwnStore(
        (store) => store.user.permissions?.Cities?.[1]
    );
    /* states */
    const canActivateStatesAdd = useOwnStore(
        (store) => store.user.permissions?.States?.[0]
    );
    const canActivateStatesView = useOwnStore(
        (store) => store.user.permissions?.States?.[1]
    );
    /* Privileges */
    const canActivatePrivilegesAdd = useOwnStore(
        (store) => store.user.permissions?.Privileges?.[0]
    );
    const canActivatePrivilegesView = useOwnStore(
        (store) => store.user.permissions?.Privileges?.[1]
    );
    /* Reports */
    const canActivateOrdersReportsView = useOwnStore(
        (store) => store.user.permissions?.OrdersReports?.[1]
    );

    /* mode */
    const mode = useOwnStore((store) => store.mode);
    const drawer = (
        <Box>
            {/*logo here */}
            <div onClick={() => navigate("/")} className={styles.logoContainer}>
                {mode === "dark" ? (
                    <img
                        src="../../../logo.dark.png"
                        alt="pioneers logo in dark mode"
                    />
                ) : (
                    <img
                        src="../../../logo.light.webp"
                        alt="pioneers logo in light mode"
                    />
                )}
            </div>
            {/*end logo here */}

            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "primary",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {/* home */}
                <div style={{}}>
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                        <ListItemButton
                            sx={{ color: "text.primary", fontWeight: "bold" }}
                        >
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="الرئـيسية"
                                sx={{
                                    fontWeight: "bold",
                                }}
                            />
                        </ListItemButton>
                    </NavLink>
                </div>
                {/* orders */}
                {canActivateOrdersView ? (
                    <NavLink to="/orders" style={{ textDecoration: "none" }}>
                        <ListItemButton sx={{ color: "text.primary" }}>
                            <ListItemIcon>
                                <LocalMallIcon />
                            </ListItemIcon>
                            <ListItemText primary="الطلـبات" />
                        </ListItemButton>
                    </NavLink>
                ) : userType === "Trader" ? (
                    <NavLink to="/orders" style={{ textDecoration: "none" }}>
                        <ListItemButton sx={{ color: "text.primary" }}>
                            <ListItemIcon>
                                <LocalMallIcon />
                            </ListItemIcon>
                            <ListItemText primary="الطلـبات" />
                        </ListItemButton>
                    </NavLink>
                ) : userType === "Representative" ? (
                    <NavLink to="/orders" style={{ textDecoration: "none" }}>
                        <ListItemButton sx={{ color: "text.primary" }}>
                            <ListItemIcon>
                                <LocalMallIcon />
                            </ListItemIcon>
                            <ListItemText primary="الطلـبات" />
                        </ListItemButton>
                    </NavLink>
                ) : null}

                {/* <NavLink to="/orders" style={{ textDecoration: "none" }}>
                    <ListItemButton sx={{ color: "text.primary" }}>
                        <ListItemIcon>
                            <LocalMallIcon />
                        </ListItemIcon>
                        <ListItemText primary="الطلـبات" />
                    </ListItemButton>
                </NavLink> */}
                {/*  {(userType === ("Trader" || "Representative") ||
                    canActivateOrdersView) && (
                    <NavLink to="/orders" style={{ textDecoration: "none" }}>
                        <ListItemButton sx={{ color: "text.primary" }}>
                            <ListItemIcon>
                                <LocalMallIcon />
                            </ListItemIcon>
                            <ListItemText primary="الطلـبات" />
                        </ListItemButton>
                    </NavLink>
                )} */}
                {/* reports */}
                {canActivateOrdersReportsView && (
                    <NavLink to="/reports" style={{ textDecoration: "none" }}>
                        <ListItemButton sx={{ color: "text.primary" }}>
                            <ListItemIcon>
                                {/*      <LocalMallIcon /> */}
                                <AssessmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="التقارير" />
                        </ListItemButton>
                    </NavLink>
                )}
                {/* employees */}
                {canActivateEmployeeView ? (
                    <NavLink to="/employees" style={{ textDecoration: "none" }}>
                        <ListItemButton sx={{ color: "text.primary" }}>
                            <ListItemIcon>
                                {/*  <LocalMallIcon /> */}
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="الموظفين" />
                        </ListItemButton>
                    </NavLink>
                ) : (
                    canActivateEmployeeAdd && (
                        <NavLink
                            to="/employees/add"
                            style={{ textDecoration: "none" }}
                        >
                            <ListItemButton sx={{ color: "text.primary" }}>
                                <ListItemIcon>
                                    {/*  <LocalMallIcon /> */}
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="اضف موظف" />
                            </ListItemButton>
                        </NavLink>
                    )
                )}
                {/* traders */}
                {canActivateTradersView ? (
                    <NavLink to="/traders" style={{ textDecoration: "none" }}>
                        <ListItemButton sx={{ color: "text.primary" }}>
                            <ListItemIcon>
                                {/* <LocalMallIcon /> */}
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="التجــار" />
                        </ListItemButton>
                    </NavLink>
                ) : (
                    canActivateTradersAdd && (
                        <NavLink
                            to="/traders/add   "
                            style={{ textDecoration: "none" }}
                        >
                            <ListItemButton sx={{ color: "text.primary" }}>
                                <ListItemIcon>
                                    {/* <LocalMallIcon /> */}
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="اضف تاجر" />
                            </ListItemButton>
                        </NavLink>
                    )
                )}
                {/* representative */}
                {canActivateRepresentativesView ? (
                    <NavLink
                        to="/representatives"
                        style={{ textDecoration: "none" }}
                    >
                        <ListItemButton sx={{ color: "text.primary" }}>
                            <ListItemIcon>
                                {/* <LocalMallIcon /> */}
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="المناديب" />
                        </ListItemButton>
                    </NavLink>
                ) : (
                    canActivateRepresentativesAdd && (
                        <NavLink
                            to="/representatives/add   "
                            style={{ textDecoration: "none" }}
                        >
                            <ListItemButton sx={{ color: "text.primary" }}>
                                <ListItemIcon>
                                    {/*  <LocalMallIcon /> */}
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="اضف مندوب" />
                            </ListItemButton>
                        </NavLink>
                    )
                )}
                <Divider />
                {/* branches */}
                {canActivateBranchesView ? (
                    <NavLink to="/branches" style={{ textDecoration: "none" }}>
                        <ListItemButton sx={{ color: "text.primary" }}>
                            <ListItemIcon>
                                {/*  <LocalMallIcon /> */}
                                <AddLocationAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="الفروع" />
                        </ListItemButton>
                    </NavLink>
                ) : (
                    canActivateBranchesAdd && (
                        <NavLink
                            to="/branches/add"
                            style={{ textDecoration: "none" }}
                        >
                            <ListItemButton sx={{ color: "text.primary" }}>
                                <ListItemIcon>
                                    {/*  <LocalMallIcon /> */}
                                    <AddLocationAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="اضف فرع" />
                            </ListItemButton>
                        </NavLink>
                    )
                )}
                {/* states */}
                {canActivateStatesView ? (
                    <NavLink to="/states" style={{ textDecoration: "none" }}>
                        <ListItemButton sx={{ color: "text.primary" }}>
                            <ListItemIcon>
                                {/*  <LocalMallIcon /> */}
                                <AddLocationAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="المحافظات" />
                        </ListItemButton>
                    </NavLink>
                ) : (
                    canActivateStatesAdd && (
                        <NavLink
                            to="/states/add"
                            style={{ textDecoration: "none" }}
                        >
                            <ListItemButton sx={{ color: "text.primary" }}>
                                <ListItemIcon>
                                    {/*  <LocalMallIcon /> */}
                                    <AddLocationAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="اضف محافظة" />
                            </ListItemButton>
                        </NavLink>
                    )
                )}
                {/* cities */}
                {canActivateCitiesView ? (
                    <NavLink to="/cities" style={{ textDecoration: "none" }}>
                        <ListItemButton sx={{ color: "text.primary" }}>
                            <ListItemIcon>
                                {/*   <LocalMallIcon /> */}
                                <AddLocationAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="الـمــدن" />
                        </ListItemButton>
                    </NavLink>
                ) : (
                    canActivateCitiesAdd && (
                        <NavLink
                            to="/cities/add"
                            style={{ textDecoration: "none" }}
                        >
                            <ListItemButton sx={{ color: "text.primary" }}>
                                <ListItemIcon>
                                    {/*   <LocalMallIcon /> */}
                                    <AddLocationAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="اضف مدينة" />
                            </ListItemButton>
                        </NavLink>
                    )
                )}
                {/* users */}
                {/* <NavLink to="/users" style={{ textDecoration: "none" }}>
                    <ListItemButton sx={{ color: "text.primary" }}>
                        <ListItemIcon>
                            <LocalMallIcon />
                        </ListItemIcon>
                        <ListItemText primary="المستخدمين" />
                    </ListItemButton>
                </NavLink>
                <Divider /> */}
                {/* permissions */}
                {canActivatePrivilegesView ? (
                    <NavLink
                        to="/Permissions"
                        style={{ textDecoration: "none" }}
                    >
                        <ListItemButton sx={{ color: "text.primary" }}>
                            <ListItemIcon>
                                <LockPersonIcon />
                                {/*  <LocalMallIcon /> */}
                            </ListItemIcon>
                            <ListItemText primary="الصلاحيات" />
                        </ListItemButton>
                    </NavLink>
                ) : (
                    canActivatePrivilegesAdd && (
                        <NavLink
                            to="/Permissions/add"
                            style={{ textDecoration: "none" }}
                        >
                            <ListItemButton sx={{ color: "text.primary" }}>
                                <ListItemIcon>
                                    <LockPersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="اضف صلاحية" />
                            </ListItemButton>
                        </NavLink>
                    )
                )}
                {/* settings */}
                {canActivateSettingsView ? (
                    <>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="الاعدادات" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {/* weight */}
                                <NavLink
                                    to="/weightSettings"
                                    style={{ textDecoration: "none" }}
                                >
                                    <ListItemButton
                                        sx={{ color: "text.primary", pl: 4 }}
                                    >
                                        <ListItemIcon>
                                            <ScaleIcon />
                                            {/*  <LocalMallIcon /> */}
                                        </ListItemIcon>
                                        <ListItemText primary="الـوزن" />
                                    </ListItemButton>
                                </NavLink>

                                {/* shipping type */}
                                <NavLink
                                    to="/shippingType"
                                    style={{ textDecoration: "none" }}
                                >
                                    <ListItemButton
                                        sx={{ color: "text.primary", pl: 4 }}
                                    >
                                        <ListItemIcon>
                                            <LocalShippingIcon />
                                            {/* <LocalMallIcon /> */}
                                        </ListItemIcon>
                                        <ListItemText primary="نوع الشحن" />
                                    </ListItemButton>
                                </NavLink>
                            </List>
                        </Collapse>
                    </>
                ) : (
                    canActivateSettingsAdd && (
                        <NavLink
                            to="/shippingType/add"
                            style={{ textDecoration: "none" }}
                        >
                            <ListItemButton sx={{ color: "text.primary" }}>
                                <ListItemIcon>
                                    {/* <LocalMallIcon /> */}
                                    <LocalShippingIcon />
                                </ListItemIcon>
                                <ListItemText primary="اضف نوع شحن" />
                            </ListItemButton>
                        </NavLink>
                    )
                )}
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="mailbox folders"
        >
            {mobileOpen === true ? (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            backgroundColor: "secondary.main",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            backgroundColor: "secondary.main",
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            )}
        </Box>
    );
};

export default DrawerComponent;
