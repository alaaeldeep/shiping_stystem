/* react staff */
import { useState } from "react";

/* router */
import { useNavigate, useParams } from "react-router-dom";

/* MUI */
import {
    useMediaQuery,
    Skeleton,
    Stack,
    Typography,
    Pagination,
    Box,
} from "@mui/material";

/* react query */
import UseOrderQuery from "../../../hooks/orders/useGetQuery";

/* store */
import { useOwnStore } from "../../../store";

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
        id: "assignToRepresentative",
        label: "اسناد لمندوب",
    },
    {
        id: "settings",
        label: "الاعدادات",
    },
];

const ViewOrders = () => {
    const { orderStatus } = useParams();

    /* pagination */
    const [pageNumber, setPageNumber] = useState(1);
    const handlePageNumber = (value: number) => {
        setPageNumber(value);
    };
    const mode = useOwnStore((store) => store.mode);
    const navigate = useNavigate();

    /* fetch */
    const { data, isLoading, isError } = UseOrderQuery(pageNumber, orderStatus);
    console.log(data?.data);
    /* store */
    const canActivateOrdersAdd = useOwnStore(
        (store) => store.user.permissions?.Orders?.[0]
    );
    const canActivateOrdersView = useOwnStore(
        (store) => store.user.permissions?.Orders?.[1]
    );

    const matches = useMediaQuery("(min-width:1070px)");

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
                addBtn={!!canActivateOrdersAdd && !!canActivateOrdersView}
            />
            {isLoading ? (
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={500} />
                </Stack>
            ) : matches ? (
                <ViewOrderLargeScreen
                    rows={data?.data.data}
                    headCell={headCells}
                />
            ) : (
                <ViewOrderSmallScreen rows={data?.data.data} />
            )}{" "}
            {/* pagination */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: " 20px",
                }}
            >
                {data?.data.totalPages > 1 && (
                    <Pagination
                        count={data?.data.totalPages}
                        size={matches ? "large" : "small"}
                        page={pageNumber}
                        onChange={(_e, value) => handlePageNumber(value)}
                    />
                )}
            </Box>
            {data?.data.data.length === 0 && (
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
