/* router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Box,
    Paper,
    Skeleton,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";

/* react query */
import UseQuery from "../../hooks/serverState/useQuery";

/* components */
import { ViewWeightSettingLargeScreen } from "./components/ViewWeightSettingLargeScreen/ViewWeightSettingLargeScreen";
import { ViewWeightSettingSmallScreen } from "./components/ViewWeightSettingSmallScreen/ViewWeightSettingSmallScreen";

const ViewWeightSettings = () => {
    /* fetch */
    const { data, isLoading, isError } = UseQuery("/GetSettings");

    /* mobile view */
    const matches = useMediaQuery("(min-width:1070px)");

    const navigate = useNavigate();

    if (isLoading) {
        return (
            <Stack spacing={1}>
                <Skeleton variant="rounded" width={"100%"} height={70} />
                <Skeleton variant="rounded" width={"100%"} height={500} />
            </Stack>
        );
    }
    if (isError) {
        setTimeout(() => navigate("/home"), 2000);
        return <Stack spacing={2} sx={{ width: "100%" }}></Stack>;
    }
    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                    }}
                >
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        اعدادات الوزن
                    </Typography>
                </Toolbar>
                {matches ? (
                    <ViewWeightSettingLargeScreen data={data?.data} />
                ) : (
                    <ViewWeightSettingSmallScreen data={data?.data} />
                )}
            </Paper>
        </Box>
    );
};

export default ViewWeightSettings;
