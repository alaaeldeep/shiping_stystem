/* MUI */
import { Table, TableBody, TableContainer } from "@mui/material";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";

/* types */
import { OrderRow } from "../../../../../components/types";

import RowInLargeScreen from "./row";
import { useOwnStore } from "../../../../../store";
type ViewEmployeeLargeScreenProps = {
    rows: OrderRow[];
};

/* employee */
const headCells1: any = [
    {
        id: "id",
        label: "الرقم التسلسلي",
    },
    {
        id: "addedDate",
        label: "التاريخ",
    },

    {
        id: "state",

        label: "المحافظة",
    },
    {
        id: "orderCost",

        label: "تكلفة الطلب",
    },
    {
        id: "changeStatus",
        label: "تغيير الحالة",
    },
    {
        id: "assignToRepresentative",
        label: "اسناد لمندوب",
    },
    {
        id: "settings",
        label: "الاعدادات",
    },
];
/* trader */
const headCells3: any = [
    {
        id: "id",
        label: "الرقم التسلسلي",
    },
    {
        id: "addedDate",
        label: "التاريخ",
    },

    {
        id: "state",

        label: "المحافظة",
    },
    {
        id: "orderCost",

        label: "تكلفة الطلب",
    },
    {
        id: "settings",
        label: "الاعدادات",
    },
];
const headCells2: any = [
    {
        id: "id",
        label: "الرقم التسلسلي",
    },
    {
        id: "addedDate",
        label: "التاريخ",
    },

    {
        id: "state",

        label: "المحافظة",
    },
    {
        id: "orderCost",

        label: "تكلفة الطلب",
    },
    {
        id: "changeStatus",
        label: "تغيير الحالة",
    },

    {
        id: "settings",
        label: "الاعدادات",
    },
];
export const ViewOrderLargeScreen = ({
    rows,
}: ViewEmployeeLargeScreenProps) => {
    const userType = useOwnStore.getState().user.userType;
    const canActivateOrdersEdit = useOwnStore(
        (store) => store.user.permissions?.Orders?.[2]
    );

    return (
        <>
            {" "}
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}
                >
                    <CustomTableHead
                        headCell={
                            canActivateOrdersEdit
                                ? headCells1
                                : userType === "Trader"
                                ? headCells3
                                : headCells2
                        }
                    />
                    <TableBody>
                        {rows.map((row, index) => {
                            return (
                                <RowInLargeScreen
                                    data={row}
                                    index={index}
                                    key={index}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
