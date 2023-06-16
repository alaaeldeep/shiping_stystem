/* router */
import { useNavigate } from "react-router-dom";

/* MUI */
import { useMediaQuery, Skeleton, Stack, Typography } from "@mui/material";

/* react query */
import UseQuery from "../../../hooks/serverState/useQuery";

/* components */
import { ViewOrderLargeScreen } from "./components/viewOrderLargeScreen/viewOrderLargeScreen";
import { ViewOrderSmallScreen } from "./components/viewOrderSmallScreen/viewOrderSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* types */

const headCells: any = [
    {
        id: "id",
        label: "الرقم التسلسلي",
    },
    {
        id: "addedDate",
        label: "التاريخ",
    },

    {
        id: "state",

        label: "المحافظة",
    },
    {
        id: "orderCost",

        label: "تكلفة الطلب",
    },
    {
        id: "changeStatus",
        label: "تغيير الحالة",
    },
    {
        id: "settings",
        label: "الاعدادات",
    },

    {
        id: "print",
        label: "طباعه",
    },
];

const ViewOrders = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError } = UseQuery("/GETorders");

    const matches = useMediaQuery("(min-width:1070px)");

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
        return <div></div>;
    }

    return (
        <>
            <TableToolbar
                pageName="الطلبات"
                btnTitle="اضف طلب"
                destination="/orders/add"
                addIcon={true}
            />
            {matches ? (
                <ViewOrderLargeScreen rows={data?.data} headCell={headCells} />
            ) : (
                <ViewOrderSmallScreen rows={data?.data} />
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
                    لم يتم اضافة طلبات حتي الان
                </Typography>
            )}
        </>
    );
};

export default ViewOrders;
