/* react staff */
import { useState } from "react";

/* router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Skeleton,
    Stack,
    useMediaQuery,
    Pagination,
    Box,
    Typography,
} from "@mui/material";

/* react query */
import UseQuery from "../../../hooks/serverState/useQuery";

/* components */
import { ViewPermissionsLargeScreen } from "./components/viewPermissionsLargeScreen/viewPermissionsLargeScreen";
import { ViewPermissionsSmallScreen } from "./components/viewPermissionsSmallScreen/viewPermissionsSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

const headCells: any = [
    {
        id: "id",

        label: "الرقم",
    },
    {
        id: "name",

        label: "اسم الصلاحية",
    },
    {
        id: "addedDate",

        label: "تاريخ الاضافة",
    },
    {
        id: "settings",

        label: "الأعدادات",
    },
];
const ViewPermissions = () => {
    /* pagination */
    const [pageNumber, setPageNumber] = useState(1);
    const handlePageNumber = (value: number) => {
        setPageNumber(value);
    };

    /* fetch */
    const { data, isLoading, isError } = UseQuery("/RolesPrivileges");

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
                pageName="الصلاحيات"
                btnTitle="اضف صلاحية"
                destination="/Permissions/add"
                addIcon={true}
            />
            {isLoading ? (
                <Skeleton variant="rounded" width={"100%"} height={500} />
            ) : matches ? (
                <ViewPermissionsLargeScreen
                    rows={data?.data}
                    headCell={headCells}
                />
            ) : (
                <ViewPermissionsSmallScreen rows={data?.data} />
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
            </Box>{" "}
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
                    لم يتم اضافة صلاحيات حتي الان
                </Typography>
            )}
        </>
    );
};

export default ViewPermissions;
