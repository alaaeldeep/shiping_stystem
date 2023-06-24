/* react staff */
import { useRef, useState } from "react";

/* router */
import { useNavigate } from "react-router-dom";

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
import UseQuery from "../../../hooks/serverState/useQuery";

/* store */
import { useOwnStore } from "../../../store";

/* components */
import { ViewTraderLargeScreen } from "./components/viewTraderLargeScreen/viewTraderLargeScreen";
import { ViewTraderSmallScreen } from "./components/viewTraderSmallScreen/viewTraderSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

const headCells: any = [
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
    /* pagination */

    const changePageNumberTraders = useOwnStore(
        (store) => store.changePageNumberTraders
    );
    const TradersBageNumber = useRef<number | undefined>();
    /* pagination */

    const [pageNumber, setPageNumber] = useState(1);
    const handlePageNumber = (value: number) => {
        setPageNumber(value);
        TradersBageNumber.current = value;
        changePageNumberTraders(TradersBageNumber.current);
    };
    const { data, isLoading, isError } = UseQuery(
        `/Traders/paginate?pageNumber=${pageNumber}&pageSize=5`
    );

    const canActivateTradersAdd = useOwnStore(
        (store) => store.user.permissions?.Traders?.[0]
    );
    const canActivateTradersView = useOwnStore(
        (store) => store.user.permissions?.Traders?.[1]
    );
    const matches = useMediaQuery("(min-width:1070px)");
    const navigate = useNavigate();

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
                addBtn={!!canActivateTradersAdd && !!canActivateTradersView}
            />

            <>
                {isLoading ? (
                    <Stack spacing={1}>
                        <Skeleton
                            variant="rounded"
                            width={"100%"}
                            height={500}
                        />
                    </Stack>
                ) : matches ? (
                    <ViewTraderLargeScreen
                        rows={data?.data.data}
                        headCell={headCells}
                    />
                ) : (
                    <ViewTraderSmallScreen rows={data?.data.data} />
                )}
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
                        لم يتم اضافة تجار حتي الان
                    </Typography>
                )}
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
            </>
        </>
    );
};

export default ViewTraders;
