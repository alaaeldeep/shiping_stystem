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

/* components */
import { ViewRepresentativesLargeScreen } from "./components/viewRepresentativesLargeScreen/viewRepresentativesLargeScreen";
import { ViewRepresentativesSmallScreen } from "./components/viewRepresentativesSmallScreen/viewRepresentativesSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* store */
import { useOwnStore } from "../../../store";

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
    const canActivateRepresentativesAdd = useOwnStore(
        (store) => store.user.permissions?.Representatives?.[0]
    );
    const canActivateRepresentativesView = useOwnStore(
        (store) => store.user.permissions?.Representatives?.[1]
    );

    const changePageNumberRepresentatives = useOwnStore(
        (store) => store.changePageNumberRepresentatives
    );
    const RepresentativesPageNumber = useRef<number | undefined>();

    /* pagination */
    const [pageNumber, setPageNumber] = useState(1);
    const handlePageNumber = (value: number) => {
        setPageNumber(value);
        RepresentativesPageNumber.current = value;
        changePageNumberRepresentatives(RepresentativesPageNumber.current);
    };

    const { data, isLoading, isError } = UseQuery(
        `/Representatives/paginate?pageNumber=${pageNumber}&pageSize=5`
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
                pageName="المناديب"
                btnTitle="اضف مندوب"
                destination="/representatives/add"
                addIcon={true}
                addBtn={
                    !!canActivateRepresentativesAdd &&
                    !!canActivateRepresentativesView
                }
            />
            {isLoading ? (
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={500} />
                </Stack>
            ) : matches ? (
                <ViewRepresentativesLargeScreen
                    rows={data?.data.data}
                    headCell={headCells}
                />
            ) : (
                <ViewRepresentativesSmallScreen rows={data?.data.data} />
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
                    لم يتم اضافة مناديب حتي الان
                </Typography>
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
        </>
    );
};

export default ViewRepresentatives;
