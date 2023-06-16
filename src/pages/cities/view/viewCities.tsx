/* REACT STAFF */
import { useState } from "react";

/* router */
import { useNavigate } from "react-router";

/* MUI */
import { Skeleton, Stack, useMediaQuery, Typography } from "@mui/material";

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
        id: "settings",
        label: "الاعدادات",
    },
];
const ViewCities = () => {
    /* fetch */
    const { data, isLoading, isError } = UseQuery("/cities");

    /* mobile view */
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
            {matches ? (
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
            )}
        </>
    );
};

export default ViewCities;
