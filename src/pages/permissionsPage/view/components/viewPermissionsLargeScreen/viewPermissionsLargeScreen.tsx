/* MUI */
import { Table, TableBody, TableContainer } from "@mui/material";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";
import Row from "./row";

/* types */
import { PermissionGET } from "../../../../../components/types";

type ViewPermissionsLargeScreenProps = {
    rows: PermissionGET[];
    headCell: any;
};

export const ViewPermissionsLargeScreen = ({
    rows,
    headCell,
}: ViewPermissionsLargeScreenProps) => {
    /* modal */

    return (
        <>
            {" "}
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}
                >
                    <CustomTableHead headCell={headCell} />
                    <TableBody>
                        {rows.map((row, index) => {
                            return <Row key={index} index={index} data={row} />;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
