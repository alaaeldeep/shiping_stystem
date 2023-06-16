/* router */
import { useNavigate } from "react-router-dom";

/* MUI */
import { useMediaQuery, Skeleton, Stack, Typography } from "@mui/material";

/* react query */
import UseQuery from "../../../hooks/serverState/useQuery";

/* components */
import { ViewRepresentativesLargeScreen } from "./components/viewRepresentativesLargeScreen/viewRepresentativesLargeScreen";
import { ViewRepresentativesSmallScreen } from "./components/viewRepresentativesSmallScreen/viewRepresentativesSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

const headCells = [
    {
        id: "id",
        label: "الرقم",
    },
    {
        id: "name",

        label: "الاسم",
    },

    {
        id: "phone",

        label: "رقم الهاتف",
    },
    {
        id: "branch",

        label: "الفرع",
    },

    {
        id: "status",
        label: "الحالة",
    },
    {
        id: "settings",
        label: "الاعدادات",
    },
];

const ViewRepresentatives = () => {
    const { data, isLoading, isError } = UseQuery("/representatives");
    const { data: branches } = UseQuery("/branches");
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
        return null;
    }
    return (
        <>
            <TableToolbar
                pageName="المناديب"
                btnTitle="اضف مندوب"
                destination="/representatives/add"
                addIcon={true}
            />
            {matches ? (
                <ViewRepresentativesLargeScreen
                    rows={data?.data}
                    headCell={headCells}
                />
            ) : (
                <ViewRepresentativesSmallScreen rows={data?.data} />
            )}
            {data?.data.length === 0 && (
                <Typography
                    height={"150px"}
                    sx={{
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    لم يتم اضافة مناديب حتي الان
                </Typography>
            )}
        </>
    );
};

export default ViewRepresentatives;
