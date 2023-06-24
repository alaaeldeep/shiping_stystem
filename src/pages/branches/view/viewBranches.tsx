/* router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Skeleton,
    Stack,
    useMediaQuery,
    Typography,
    Pagination,
    Box,
} from "@mui/material";

/* react query */
import UseQuery from "../../../hooks/serverState/useQuery";

/* store */
import { useOwnStore } from "../../../store";

/* components */
import { ViewBranchesLargeScreen } from "./components/viewBranchesLargeScreen/viewBranchesLargeScreen";
import { ViewBranchesSmallScreen } from "./components/viewBranchesSmallScreen/viewBranchesSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* types */
import { useRef, useState } from "react";

const ViewBranches = () => {
    const changePageNumberBranch = useOwnStore(
        (store) => store.changePageNumberBranch
    );
    /* pagination */
    const BranchesBageNumber = useRef<number | undefined>();
    const [pageNumber, setPageNumber] = useState(1);
    const handlePageNumber = (value: number) => {
        setPageNumber(value);
        BranchesBageNumber.current = value;
        changePageNumberBranch(BranchesBageNumber.current);
    };

    const { data, isLoading, isError } = UseQuery(
        `/Branches/paginate?pageNumber=${pageNumber}&pageSize=5`
    );

    const canActivateBranchesAdd = useOwnStore(
        (store) => store.user.permissions?.Branches?.[0]
    );
    const canActivateBranchesView = useOwnStore(
        (store) => store.user.permissions?.Branches?.[1]
    );
    /* mobile view */
    const matches = useMediaQuery("(min-width:1070px)");

    const navigate = useNavigate();

    if (isError) {
        setTimeout(() => navigate("/home"), 2000);
        return <Stack spacing={2} sx={{ width: "100%" }}></Stack>;
    }

    return (
        <>
            <TableToolbar
                pageName="الفروع"
                btnTitle="اضف فرع"
                destination="/branches/add"
                addIcon={true}
                addBtn={!!canActivateBranchesAdd && !!canActivateBranchesView}
            />
            {isLoading ? (
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={500} />
                </Stack>
            ) : matches ? (
                <ViewBranchesLargeScreen
                    rows={data?.data.data}
                    pageNumber={pageNumber}
                />
            ) : (
                <ViewBranchesSmallScreen
                    rows={data?.data.data}
                    pageNumber={pageNumber}
                />
            )}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: " 20px",
                }}
            >
                {/* **CHECK FIRST IF TOTAL_PAGES > 1 SHOW THE PAGINATIOn */}
                {data?.data.totalPages > 1 && (
                    <Pagination
                        /*   count={data?.data.totalPages} */
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
                    لم يتم اضافة فروع حتي الان
                </Typography>
            )}
        </>
    );
};

export default ViewBranches;
