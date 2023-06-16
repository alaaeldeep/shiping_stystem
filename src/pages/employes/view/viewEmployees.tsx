/* router */
import { useNavigate } from "react-router-dom";

/* MUI */
import { useMediaQuery, Skeleton, Stack, Typography } from "@mui/material";

/* react query */
import UseQuery from "../../../hooks/serverState/useQuery";

/* components */
import { ViewEmployeeLargeScreen } from "./components/viewEmployeeLargeScreen/viewEmployeeLargeScreen";
import { ViewEmployeeSmallScreen } from "./components/viewEmployeeSmallScreen/viewEmployeeSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

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
    const navigate = useNavigate();
    const { data, isLoading, isError } = UseQuery("/employees");

    const matches = useMediaQuery("(min-width:1070px)");

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
        return <div></div>;
    }

    return (
        <>
            <TableToolbar
                pageName="الموظفين"
                btnTitle="اضف موظف"
                destination="/employees/add"
                addIcon={true}
            />
            {matches ? (
                <ViewEmployeeLargeScreen
                    rows={data?.data}
                    headCell={headCells}
                />
            ) : (
                <ViewEmployeeSmallScreen rows={data?.data} />
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

export default ViewEmployees;
/* { (
    
) : 
)} */
