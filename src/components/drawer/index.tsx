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
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SettingsIcon from "@mui/icons-material/Settings";

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

    const mode = useOwnStore((store) => store.mode);
    const drawer = (
        <Box>
            {/*logo here */}
            <div onClick={() => navigate("/")} className={styles.logoContainer}>
                {mode === "dark" ? (
                    <img src="../../../logo.dark.png" />
                ) : (
                    <img src="../../../logo.light.webp" />
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
                <NavLink to="/" style={{ textDecoration: "none" }}>
                    <ListItemButton sx={{ color: "text.primary" }}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="الرئيسية" />
                    </ListItemButton>
                </NavLink>

                {/* employees */}
                <NavLink to="/employees" style={{ textDecoration: "none" }}>
                    <ListItemButton sx={{ color: "text.primary" }}>
                        <ListItemIcon>
                            <LocalMallIcon />
                        </ListItemIcon>
                        <ListItemText primary="الموظفين" />
                    </ListItemButton>
                </NavLink>

                {/* traders */}
                <NavLink to="/traders" style={{ textDecoration: "none" }}>
                    <ListItemButton sx={{ color: "text.primary" }}>
                        <ListItemIcon>
                            <LocalMallIcon />
                        </ListItemIcon>
                        <ListItemText primary="التجار" />
                    </ListItemButton>
                </NavLink>

                {/* representatives */}
                <NavLink
                    to="/representatives"
                    style={{ textDecoration: "none" }}
                >
                    <ListItemButton sx={{ color: "text.primary" }}>
                        <ListItemIcon>
                            <LocalMallIcon />
                        </ListItemIcon>
                        <ListItemText primary="المناديب" />
                    </ListItemButton>
                </NavLink>

                {/* branches */}
                <NavLink to="/branches" style={{ textDecoration: "none" }}>
                    <ListItemButton sx={{ color: "text.primary" }}>
                        <ListItemIcon>
                            <LocalMallIcon />
                        </ListItemIcon>
                        <ListItemText primary="الفروع" />
                    </ListItemButton>
                </NavLink>

                {/* states */}
                <NavLink to="/states" style={{ textDecoration: "none" }}>
                    <ListItemButton sx={{ color: "text.primary" }}>
                        <ListItemIcon>
                            <LocalMallIcon />
                        </ListItemIcon>
                        <ListItemText primary="المحافظات" />
                    </ListItemButton>
                </NavLink>

                {/* cities */}
                <NavLink to="/cities" style={{ textDecoration: "none" }}>
                    <ListItemButton sx={{ color: "text.primary" }}>
                        <ListItemIcon>
                            <LocalMallIcon />
                        </ListItemIcon>
                        <ListItemText primary="المدن" />
                    </ListItemButton>
                </NavLink>

                {/* orders */}
                <NavLink to="/orders" style={{ textDecoration: "none" }}>
                    <ListItemButton sx={{ color: "text.primary" }}>
                        <ListItemIcon>
                            <LocalMallIcon />
                        </ListItemIcon>
                        <ListItemText primary="الطلبات" />
                    </ListItemButton>
                </NavLink>

                <NavLink to="/users" style={{ textDecoration: "none" }}>
                    <ListItemButton sx={{ color: "text.primary" }}>
                        <ListItemIcon>
                            <LocalMallIcon />
                        </ListItemIcon>
                        <ListItemText primary="المستخدمين" />
                    </ListItemButton>
                </NavLink>

                {/* settings */}
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="الاعدادات" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {/* permissions */}
                        <NavLink
                            to="/Permissions"
                            style={{ textDecoration: "none" }}
                        >
                            <ListItemButton
                                sx={{ color: "text.primary", pl: 4 }}
                            >
                                <ListItemIcon>
                                    <LocalMallIcon />
                                </ListItemIcon>
                                <ListItemText primary="الصلاحيات" />
                            </ListItemButton>
                        </NavLink>

                        {/* weight */}
                        <NavLink
                            to="/weightSettings"
                            style={{ textDecoration: "none" }}
                        >
                            <ListItemButton
                                sx={{ color: "text.primary", pl: 4 }}
                            >
                                <ListItemIcon>
                                    <LocalMallIcon />
                                </ListItemIcon>
                                <ListItemText primary="الوزن" />
                            </ListItemButton>
                        </NavLink>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="اعداد 2" />
                        </ListItemButton>

                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="اعداد 3" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>

            <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
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
