/* MUI */
import { Table, TableBody, TableContainer } from "@mui/material";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";
import RowInLargeScreen from "./row";

/* types */
import { TraderRow, HeadCell } from "../../../../../components/types";
type ViewEmployeeLargeScreenProps = {
    rows: TraderRow[];
    headCell: HeadCell[];
};

export const ViewTraderLargeScreen = ({
    rows,
    headCell,
}: ViewEmployeeLargeScreenProps) => {
    return (
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
                                index={index}
                                data={row}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
