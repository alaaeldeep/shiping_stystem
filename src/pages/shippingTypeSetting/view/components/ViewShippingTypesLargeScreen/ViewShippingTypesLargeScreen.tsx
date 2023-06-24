/* MUI */
import { Table, TableBody, TableContainer, Pagination } from "@mui/material";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";

/* types */
import { HeadCell, ShippingTypeRow } from "../../../../../components/types";
import Row from "./row";
import { useOwnStore } from "../../../../../store";

type ViewPermissionsLargeScreenProps = {
    rows: ShippingTypeRow[];
};

const headCells1: any = [
    {
        id: "id",
        label: "الرقم",
    },
    {
        id: "name",
        label: " نوع الشحن",
    },
    {
        id: "shhipingCost",
        label: " تكلفه الشحن",
    },

    {
        id: "settings",
        label: "الاعدادات",
    },
];
const headCells2: any = [
    {
        id: "id",
        label: "الرقم",
    },
    {
        id: "name",
        label: " نوع الشحن",
    },
    {
        id: "shhipingCost",
        label: " تكلفه الشحن",
    },
];

export const ViewBranchesLargeScreen = ({
    rows,
}: ViewPermissionsLargeScreenProps) => {
    const canActivateSettingsEdit = useOwnStore(
        (store) => store.user.permissions?.Settings?.[2]
    );
    const canActivateSettingsDelete = useOwnStore(
        (store) => store.user.permissions?.Settings?.[3]
    );

    return (
        <>
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}
                >
                    <CustomTableHead
                        headCell={
                            canActivateSettingsDelete || canActivateSettingsEdit
                                ? headCells1
                                : headCells2
                        }
                    />
                    <TableBody>
                        {rows?.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <Row
                                    key={index}
                                    index={index}
                                    labelId={labelId}
                                    data={row}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
