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

/* motion */
import { motion } from "framer-motion";

/* react query */
import UseQuery from "../../hooks/serverState/useQuery";

/* components */
import { ViewWeightSettingLargeScreen } from "./components/ViewWeightSettingLargeScreen/ViewWeightSettingLargeScreen";
import { ViewWeightSettingSmallScreen } from "./components/ViewWeightSettingSmallScreen/ViewWeightSettingSmallScreen";

const ViewWeightSettings = () => {
    /* fetch */
    const { data, isLoading, isError } = UseQuery("/Settings");

    /* mobile view */
    const matches = useMediaQuery("(min-width:1070px)");

    const navigate = useNavigate();

    if (isError) {
        setTimeout(() => navigate("/home"), 2000);
        return <Stack spacing={2} sx={{ width: "100%" }}></Stack>;
    }
    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ x: 0, scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.3,
                    }}
                >
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
                </motion.div>
                {isLoading ? (
                    <Stack spacing={1}>
                        <Skeleton
                            variant="rounded"
                            width={"100%"}
                            height={100}
                        />
                    </Stack>
                ) : matches ? (
                    <ViewWeightSettingLargeScreen data={data?.data} />
                ) : (
                    <ViewWeightSettingSmallScreen data={data?.data} />
                )}
            </Paper>{" "}
        </Box>
    );
};

export default ViewWeightSettings;
