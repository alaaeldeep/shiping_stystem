/* react staff */
import { useState } from "react";

/* mui */
import MailIcon from "@mui/icons-material/Mail";
import MessageIcon from "@mui/icons-material/Message";
import Logout from "@mui/icons-material/Logout";
import { Menu, Badge, Divider, MenuItem, ListItemIcon } from "@mui/material";

const messages = [
    "شحنه رقم 1 تمت شحنه رقم 1 تمت شحنه رقم 1 تمت ",
    "شحنه رقم 1 تمت شحنه رقم 1 تمت شحنه رقم 2 تمت ",
    "شحنه رقم 1 تمت شحنه رقم 1 تمت شحنه رقم 3 تمت ",
    "شحنه رقم 1 تمت شحنه رقم 1 تمت شحنه رقم 4 تمت ",
    "شحنه رقم 1 تمت شحنه رقم 1 تمت شحنه رقم 5 تمت ",
    "شحنه رقم 1 تمت شحنه رقم 1 تمت شحنه رقم 6 تمت ",
    "شحنه رقم 1 تمت شحنه رقم 1 تمت شحنه رقم 7 تمت ",
    "شحنه رقم 1 تمت شحنه رقم 1 تمت شحنه رقم 8 تمت ",
    "شحنه رقم 1 تمت شحنه رقم 1 تمت شحنه رقم 9 تمت ",
    "شحنه رقم 1 تمت شحنه رقم 1 تمت شحنه رقم 10 تمت ",
];
const Messages = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div style={{ display: "none" }}>
            <Badge
                onClick={handleClick}
                color="secondary"
                badgeContent={9}
                sx={{ cursor: "pointer" }}
            >
                <MailIcon />
            </Badge>

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
                {messages.map((message, index) => (
                    <MenuItem
                        key={index}
                        onClick={handleClose}
                        sx={{
                            width: 300,
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                        }}
                    >
                        <MessageIcon />
                        <p>{message.slice(0, 27)}..</p>
                    </MenuItem>
                ))}

                <Divider />

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <MessageIcon />
                    </ListItemIcon>
                    مشاهده جميع الرسايل
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Messages;
