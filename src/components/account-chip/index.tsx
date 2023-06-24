/* react staff */
import { useState } from "react";

/* router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Chip,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

/* toast */
import { toast } from "react-toastify";

/* store */
import { useOwnStore } from "../../store";

const AccountChip = () => {
    const userName = useOwnStore((store) => store.user.userName);
    const logout = useOwnStore((store) => store.logout);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    /* router */
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {" "}
            <Chip
                onClick={handleClick}
                avatar={<Avatar />}
                label={`مرحبا , ${userName}`}
                variant="outlined"
                sx={{
                    cursor: "pointer",
                    /*   width: { xs: "100px", md: "180px" }, */
                    fontWeight: "bold",
                }}
            />
            {/* Menu */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    sx: {
                        backgroundColor: "secondary.main",
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            mr: 2,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: 25 }}
            >
                {/* <MenuItem onClick={handleClose}>
                    <Avatar /> الحساب الشخصي
                </MenuItem> */}

                {/* <Divider /> */}

                {/*  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    الاعدادات
                </MenuItem> */}
                <MenuItem
                    onClick={() => {
                        logout();
                        navigate("/login");
                        toast.info("تم تسجيل الخروج", {
                            position: toast.POSITION.BOTTOM_LEFT,
                            autoClose: 2000,
                            theme: "dark",
                        });
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    تسجيل الخروج
                </MenuItem>
            </Menu>
        </>
    );
};

export default AccountChip;
