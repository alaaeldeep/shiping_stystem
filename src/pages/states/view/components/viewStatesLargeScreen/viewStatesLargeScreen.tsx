/* MUI */
import { Table, TableBody, TableContainer } from "@mui/material";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";
import Row from "./row";

/* types */
import { HeadCell, StateRow } from "../../../../../components/types";

type ViewStatesLargeScreenProps = {
    rows: StateRow[];
    headCell: HeadCell[];
};

export const ViewStatesLargeScreen = ({
    rows,
    headCell,
}: ViewStatesLargeScreenProps) => {
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
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <Row
                                    key={index}
                                    index={index}
                                    id={row.id}
                                    labelId={labelId}
                                    state={row.state}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
