/* router */
import { useNavigate } from "react-router";

/* MUI */
import { Skeleton, Stack, useMediaQuery } from "@mui/material";

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
    /* fetch */
    const { data, isLoading, isError } = UseQuery("/permissionsDetails");

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
                pageName="الصلاحيات"
                btnTitle="اضف صلاحية"
                destination="/Permissions/add"
                addIcon={true}
            />
            {matches ? (
                <ViewPermissionsLargeScreen
                    rows={data?.data}
                    headCell={headCells}
                />
            ) : (
                <ViewPermissionsSmallScreen rows={data?.data} />
            )}
        </>
    );
};

export default ViewPermissions;
