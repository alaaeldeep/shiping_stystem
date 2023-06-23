/* MUI */
import { Table, TableBody, TableContainer } from "@mui/material";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";

/* types */
import { EmployeeGET, HeadCell } from "../../../../../components/types";

import RowInLargeScreen from "./row";
type ViewEmployeeLargeScreenProps = {
    rows: EmployeeGET[];
    headCell: HeadCell[];
};

export const ViewEmployeeLargeScreen = ({
    rows,
    headCell,
}: ViewEmployeeLargeScreenProps) => {
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
                            return (
                                <RowInLargeScreen
                                    key={index}
                                    data={row}
                                    index={index}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
