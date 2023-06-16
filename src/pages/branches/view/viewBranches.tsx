/* REACT STAFF */
import { useState } from "react";

/* router */
import { useNavigate } from "react-router";

/* MUI */
import { Skeleton, Stack, useMediaQuery, Typography } from "@mui/material";

/* react query */
import UseQuery from "../../../hooks/serverState/useQuery";

/* components */
import { ViewBranchesLargeScreen } from "./components/viewBranchesLargeScreen/viewBranchesLargeScreen";
import { ViewBranchesSmallScreen } from "./components/viewBranchesSmallScreen/viewBranchesSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* types */
import { HeadCell } from "../../../components/types";

const headCells: HeadCell[] = [
    {
        id: "id",
        label: "الرقم",
    },
    {
        id: "name",
        label: "اسم الفرع",
    },
    {
        id: "addedDate",
        label: "تاريخ الاضافة",
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
const ViewBranches = () => {
    /* fetch */
    const { data, isLoading, isError } = UseQuery("/branches");

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
                pageName="الفروع"
                btnTitle="اضف فرع"
                destination="/branches/add"
                addIcon={true}
            />{" "}
            {matches ? (
                <ViewBranchesLargeScreen
                    rows={data?.data}
                    headCell={headCells}
                />
            ) : (
                <ViewBranchesSmallScreen rows={data?.data} />
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
                    لم يتم اضافة فروع حتي الان
                </Typography>
            )}
        </>
    );
};

export default ViewBranches;
