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
import { ViewEmployeeLargeScreen } from "./components/viewEmployeeLargeScreen/viewEmployeeLargeScreen";
import { ViewEmployeeSmallScreen } from "./components/viewEmployeeSmallScreen/viewEmployeeSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* react staff */
import { useState } from "react";

/* store */
import { useOwnStore } from "../../../store";

const headCells: any = [
    {
        id: "id",
        label: "الرقم",
    },
    {
        id: "name",

        label: "الاسم",
    },

    {
        id: "branch",

        label: "الفرع",
    },
    {
        id: "role",

        label: "الصلاحيات",
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

const ViewEmployees = () => {
    /* pagination */
    const [pageNumber, setPageNumber] = useState(1);
    const handlePageNumber = (value: number) => {
        setPageNumber(value);
    };
    const navigate = useNavigate();
    const { data, isLoading, isError } = UseQuery("/Employees");

    const canActivateEmployeeAdd = useOwnStore(
        (store) => store.user.permissions?.Employees?.[0]
    );
    const canActivateEmployeeView = useOwnStore(
        (store) => store.user.permissions?.Employees?.[1]
    );

    const matches = useMediaQuery("(min-width:1070px)");

    if (isError) {
        setTimeout(() => navigate("/home"), 2000);
        return <div></div>;
    }

    return (
        <>
            <TableToolbar
                pageName="الموظفين"
                btnTitle="اضف موظف"
                destination="/employees/add"
                addIcon={true}
                addBtn={!!canActivateEmployeeAdd && !!canActivateEmployeeView}
            />

            {isLoading ? (
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={500} />
                </Stack>
            ) : matches ? (
                <ViewEmployeeLargeScreen
                    rows={data?.data}
                    headCell={headCells}
                />
            ) : (
                <ViewEmployeeSmallScreen rows={data?.data} />
            )}
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
                    count={10}
                    size={matches ? "large" : "small"}
                    page={pageNumber}
                    onChange={(_e, value) => handlePageNumber(value)}
                />
            </Box>
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
                    لم يتم اضافة موظفين حتي الان
                </Typography>
            )}
        </>
    );
};

export default ViewEmployees;
