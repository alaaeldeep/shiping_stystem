/* MUI */
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

/* components */
import ToggleTheme from "../toggle-theme";
import Search from "./../search/index";
import Messages from "../messages";
import AccountChip from "../account-chip";

/* styles */
import style from "./styles.module.css";

type props = { drawerWidth: number; handleDrawerToggle: () => void };

const NavBar = ({ drawerWidth, handleDrawerToggle }: props) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
            }}
        >
            <Toolbar
                sx={{
                    backgroundColor: "primary.light",
                    borderRadius: "15px",
                    m: 1.5,
                    border: "2px solid #9ba4b5b7",
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                <div className={style.navContainer}>
                    {/* search field */}
                    <Search />

                    {/* left side */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: { xs: "10px", md: "16px" },
                        }}
                    >
                        {/* account */}
                        <AccountChip />

                        {/* messages */}
                        <Messages />

                        {/* theme button */}
                        <ToggleTheme />
                    </Box>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
