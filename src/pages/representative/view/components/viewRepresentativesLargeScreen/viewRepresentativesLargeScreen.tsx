/* MUI */
import { Table, TableBody, TableContainer } from "@mui/material";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";
import RowInLargeScreen from "./row";

/* types */
import { RepresentativeRow } from "../../../../../components/types";
type ViewEmployeeLargeScreenProps = {
    rows: RepresentativeRow[];
    headCell: any;
};

export const ViewRepresentativesLargeScreen = ({
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
                                index={index}
                                key={index}
                                data={row}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
