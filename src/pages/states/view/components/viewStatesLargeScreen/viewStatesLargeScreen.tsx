/* MUI */
import { Table, TableBody, TableContainer } from "@mui/material";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";
import Row from "./row";

/* types */
import { HeadCell, StateRow } from "../../../../../components/types";

/* store */
import { useOwnStore } from "../../../../../store";
import { headCells } from "../../../../permissionsPage/add/addPermissionPage";

type ViewStatesLargeScreenProps = {
    rows: StateRow[];
};
const statesHeadCells1 = [
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
const statesHeadCells2 = [
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
];
export const ViewStatesLargeScreen = ({ rows }: ViewStatesLargeScreenProps) => {
    const canActivateStatesEdit = useOwnStore(
        (store) => store.user.permissions?.States?.[2]
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
                            canActivateStatesEdit
                                ? statesHeadCells1
                                : statesHeadCells2
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
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
