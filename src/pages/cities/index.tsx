/* router */
import { Outlet } from "react-router";

/* MUI */
import { Box, Paper } from "@mui/material";

export default function Cities() {
    return (
        <>
            <Box sx={{ width: "100%" }}>
                {" "}
                <Paper sx={{ width: "100%", mb: 2 }}>
                    <Outlet />
                </Paper>
            </Box>
        </>
    );
}
