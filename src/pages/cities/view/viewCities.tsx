/* react staff */
import { useRef, useState } from "react";

/* router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Skeleton,
    Stack,
    useMediaQuery,
    Typography,
    Box,
    Pagination,
} from "@mui/material";

/* react query */
import UseQuery from "../../../hooks/serverState/useQuery";

/* store */
import { useOwnStore } from "../../../store";

/* components */
import { ViewCitiesLargeScreen } from "./components/viewViewCitiesLargeScreen/viewCitiesLargeScreen";
import { ViewCitiesSmallScreen } from "./components/viewCitiesSmallScreen/viewCitiesSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

const ViewCities = () => {
    const changePageNumberCities = useOwnStore(
        (store) => store.changePageNumberCities
    );
    const CitiesBageNumber = useRef<number | undefined>();
    /* pagination */
    const [pageNumber, setPageNumber] = useState(1);
    const handlePageNumber = (value: number) => {
        setPageNumber(value);
        CitiesBageNumber.current = value;
        changePageNumberCities(CitiesBageNumber.current);
    };

    /* fetch */
    const { data, isLoading, isError } = UseQuery(
        `Cities/paginate?pageNumber=${pageNumber}&pageSize=5`
    );
    /* store */
    const canActivateCitiesAdd = useOwnStore(
        (store) => store.user.permissions?.Cities?.[0]
    );
    const canActivateCitiesView = useOwnStore(
        (store) => store.user.permissions?.Cities?.[1]
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
                pageName="المدن"
                btnTitle="اضف مدينة"
                destination="/cities/add"
                addIcon={true}
                addBtn={!!canActivateCitiesView && !!canActivateCitiesAdd}
            />
            {isLoading ? (
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={500} />
                </Stack>
            ) : matches ? (
                <ViewCitiesLargeScreen rows={data?.data.data} />
            ) : (
                <ViewCitiesSmallScreen rows={data?.data.data} />
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
                    لم يتم اضافة مدن حتي الان
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

export default ViewCities;
