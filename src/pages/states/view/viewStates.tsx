/* REACT STAFF */
import { useState } from "react";

/* router */
import { useNavigate } from "react-router";

/* MUI */
import { Skeleton, Stack, useMediaQuery, Typography } from "@mui/material";

/* react query */
import UseQuery from "../../../hooks/serverState/useQuery";

/* components */
import { ViewStatesLargeScreen } from "./components/viewStatesLargeScreen/viewStatesLargeScreen";
import { ViewStatesSmallScreen } from "./components/viewStatesSmallScreen/viewStatesSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* types */
import { HeadCell } from "../../../components/types";

const statesHeadCells: HeadCell[] = [
    {
        id: "id",
        label: "الرقم",
    },
    {
        id: "name",
        label: "المحافظه",
    },

    {
        id: "status",
        label: "الحاله",
    },
    {
        id: "settings",
        label: "الاعدادات",
    },
];
const ViewStates = () => {
    /* fetch */
    const { data, isLoading, isError } = UseQuery("/states");

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
        return (
            <Stack spacing={2} sx={{ width: "100%" }}>
                ]
            </Stack>
        );
    }
    return (
        <>
            <TableToolbar
                pageName="المحافظات"
                btnTitle="اضف محافظه"
                destination="/states/add"
                addIcon={true}
            />
            {matches ? (
                <ViewStatesLargeScreen
                    rows={data?.data}
                    headCell={statesHeadCells}
                />
            ) : (
                <ViewStatesSmallScreen rows={data?.data} />
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
                    لم يتم اضافة محافظات حتي الان
                </Typography>
            )}
        </>
    );
};

export default ViewStates;
