/* MUI */
import { Box, Paper } from "@mui/material";

/* router */
import { Outlet } from "react-router";

export default function ShippingTypeSettings() {
    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                    <Outlet />
                </Paper>
            </Box>
        </>
    );
}
