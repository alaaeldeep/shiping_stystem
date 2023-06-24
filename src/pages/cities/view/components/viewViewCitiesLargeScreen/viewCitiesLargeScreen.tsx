/* MUI */
import { Table, TableBody, TableContainer } from "@mui/material";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";
import Row from "./row";

/* types */
import { HeadCell, CityRow } from "../../../../../components/types";

/* store */
import { useOwnStore } from "../../../../../store";
import { headCells } from "../../../../permissionsPage/components/editPermissionDetail/largeScreen";

type ViewCitiesLargeScreenProps = {
    rows: CityRow[];
};
const headCells1 = [
    {
        id: "id",
        label: "الرقم",
    },
    {
        id: "name",
        label: "المدينة",
    },
    {
        id: "name",
        label: "المحافظه",
    },
    {
        id: "name",
        label: "تكلفة الشحن العادية",
    },
    {
        id: "name",
        label: "الحالة  ",
    },

    {
        id: "settings",
        label: "الاعدادات",
    },
];
const headCells2 = [
    {
        id: "id",
        label: "الرقم",
    },
    {
        id: "name",
        label: "المدينة",
    },
    {
        id: "name",
        label: "المحافظه",
    },
    {
        id: "name",
        label: "تكلفة الشحن العادية",
    },
    {
        id: "name",
        label: "الحالة  ",
    },
];
export const ViewCitiesLargeScreen = ({ rows }: ViewCitiesLargeScreenProps) => {
    const canActivateCitiesEdit = useOwnStore(
        (store) => store.user.permissions?.Cities?.[2]
    );
    return (
        <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
            >
                <CustomTableHead
                    headCell={canActivateCitiesEdit ? headCells1 : headCells2}
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
    );
};
