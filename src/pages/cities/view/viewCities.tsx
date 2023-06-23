/* react staff */
import { useState } from "react";

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

/* components */
import { ViewCitiesLargeScreen } from "./components/viewViewCitiesLargeScreen/viewCitiesLargeScreen";
import { ViewCitiesSmallScreen } from "./components/viewCitiesSmallScreen/viewCitiesSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* types */
import { HeadCell } from "../../../components/types";

const citiesHeadCells: HeadCell[] = [
    {
        id: "id",
        label: "الرقم",
    },
    {
        id: "name",
        label: "المدينة",
    },
    {
        id: "name",
        label: "المحافظه",
    },
    {
        id: "name",
        label: "تكلفة الشحن العادية",
    },
    {
        id: "name",
        label: "الحالة  ",
    },

    {
        id: "settings",
        label: "الاعدادات",
    },
];
const ViewCities = () => {
    /* pagination */
    const [pageNumber, setPageNumber] = useState(1);
    const handlePageNumber = (value: number) => {
        setPageNumber(value);
    };

    /* fetch */
    const { data, isLoading, isError } = UseQuery(
        "/Cities/GetCitiesWithShippingCost"
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
            />
            {isLoading ? (
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={500} />
                </Stack>
            ) : matches ? (
                <ViewCitiesLargeScreen
                    rows={data?.data}
                    headCell={citiesHeadCells}
                />
            ) : (
                <ViewCitiesSmallScreen rows={data?.data} />
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
                    لم يتم اضافة مدن حتي الان
                </Typography>
            )}{" "}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: " 20px",
                }}
            >
                {/* **CHECK FIRST IF TOTAL_PAGES > 1 SHOW THE PAGINATIOn */}
                <Pagination
                    /*   count={data?.data.totalPages} */
                    count={1}
                    size={matches ? "large" : "small"}
                    page={pageNumber}
                    onChange={(_e, value) => handlePageNumber(value)}
                />
            </Box>
        </>
    );
};

export default ViewCities;
