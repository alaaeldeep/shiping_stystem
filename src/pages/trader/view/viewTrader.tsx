/* router */
import { useNavigate } from "react-router-dom";

/* MUI */
import { useMediaQuery, Skeleton, Stack, Typography } from "@mui/material";

/* react query */
import UseQuery from "../../../hooks/serverState/useQuery";

/* components */
import { ViewTraderLargeScreen } from "./components/viewTraderLargeScreen/viewTraderLargeScreen";
import { ViewTraderSmallScreen } from "./components/viewTraderSmallScreen/viewTraderSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* types */
import { HeadCell } from "../../../components/types";

const headCells: HeadCell[] = [
    {
        id: "id",
        label: "الرقم",
    },
    {
        id: "name",
        label: "الاسم",
    },
    {
        id: "name",
        label: "اسم المتجر",
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

const ViewTraders = () => {
    const { data, isLoading, isError } = UseQuery("/traders");
    const matches = useMediaQuery("(min-width:1070px)");
    const navigate = useNavigate();
    console.log(data?.data);
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
                pageName="التجار"
                btnTitle="اضف تاجر"
                destination="/traders/add"
                addIcon={true}
            />
            {matches ? (
                <ViewTraderLargeScreen rows={data?.data} headCell={headCells} />
            ) : (
                <ViewTraderSmallScreen rows={data?.data} />
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
                    لم يتم اضافة تجار حتي الان
                </Typography>
            )}
        </>
    );
};

export default ViewTraders;
