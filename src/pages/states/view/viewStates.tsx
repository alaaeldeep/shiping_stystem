/* REACT STAFF */
import { useRef, useState } from "react";

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

/* components */
import { ViewStatesLargeScreen } from "./components/viewStatesLargeScreen/viewStatesLargeScreen";
import { ViewStatesSmallScreen } from "./components/viewStatesSmallScreen/viewStatesSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* store */
import { useOwnStore } from "../../../store";

const ViewStates = () => {
    const canActivateStatesAdd = useOwnStore(
        (store) => store.user.permissions?.States?.[0]
    );
    const canActivateStatesView = useOwnStore(
        (store) => store.user.permissions?.States?.[1]
    );
    const changePageNumberStates = useOwnStore(
        (store) => store.changePageNumberStates
    );
    const StatesBageNumber = useRef<number | undefined>();
    /* pagination */

    const [pageNumber, setPageNumber] = useState(1);
    const handlePageNumber = (value: number) => {
        setPageNumber(value);
        StatesBageNumber.current = value;
        changePageNumberStates(StatesBageNumber.current);
    };

    /* fetch */
    const { data, isLoading, isError } = UseQuery(
        `/states/paginate?pageNumber=${pageNumber}&pageSize=5`
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
                pageName="المحافظات"
                btnTitle="اضف محافظه"
                destination="/states/add"
                addIcon={true}
                addBtn={!!canActivateStatesAdd && !!canActivateStatesView}
            />
            {isLoading ? (
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={500} />
                </Stack>
            ) : matches ? (
                <ViewStatesLargeScreen rows={data?.data.data} />
            ) : (
                <ViewStatesSmallScreen rows={data?.data.data} />
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
                    لم يتم اضافة محافظات حتي الان
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
    );
};

export default ViewStates;
