/* MUI */
import { Table, TableBody, TableContainer } from "@mui/material";

/* store */
import { useOwnStore } from "../../../../../store";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";
import Row from "./row";
/* types */
import { BranchesRow } from "../../../../../components/types";

type ViewPermissionsLargeScreenProps = {
    pageNumber: number;
    rows: BranchesRow[];
};
const headCells1: any = [
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
const headCells2: any = [
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
];
export const ViewBranchesLargeScreen = ({
    rows,
    pageNumber,
}: ViewPermissionsLargeScreenProps) => {
    /* store */
    const canActivateBranchesEdit = useOwnStore(
        (store) => store.user.permissions?.Branches?.[2]
    );
    const canActivateBranchesDelete = useOwnStore(
        (store) => store.user.permissions?.Branches?.[3]
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
                            !!canActivateBranchesEdit ||
                            !!canActivateBranchesDelete
                                ? headCells1
                                : headCells2
                        }
                    />
                    <TableBody>
                        {rows.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <Row
                                    key={index}
                                    index={index}
                                    labelId={labelId}
                                    data={row}
                                    pageNumber={pageNumber}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
