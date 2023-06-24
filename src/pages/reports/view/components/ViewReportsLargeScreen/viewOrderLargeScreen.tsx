/* MUI */
import { Table, TableBody, TableContainer } from "@mui/material";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";

/* types */
import { ReportRow } from "../../../../../components/types";

import RowInLargeScreen from "./row";
type ViewEmployeeLargeScreenProps = {
    rows: ReportRow[];
    headCell: any;
};

export const ViewReportsLargeScreen = ({
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
                        {rows?.map((row, index) => {
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
