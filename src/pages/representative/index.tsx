/* router */
import { Outlet } from "react-router";

/* MUI */
import { Box, Paper } from "@mui/material";

const Representative = () => {
    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                    <Outlet />
                </Paper>
            </Box>
        </>
    );
};

export default Representative;
