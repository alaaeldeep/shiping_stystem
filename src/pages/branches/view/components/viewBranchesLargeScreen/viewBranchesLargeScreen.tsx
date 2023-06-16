/* MUI */
import { Table, TableBody, TableContainer } from "@mui/material";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";

/* types */
import { HeadCell, BranchesRow } from "../../../../../components/types";
import Row from "./row";

type ViewPermissionsLargeScreenProps = {
    rows: BranchesRow[];
    headCell: HeadCell[];
};

export const ViewBranchesLargeScreen = ({
    rows,
    headCell,
}: ViewPermissionsLargeScreenProps) => {
    /* modal */

    return (
        <>
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
                                    branch={row.branch}
                                    index={index}
                                    id={row.id}
                                    labelId={labelId}
                                    addedDate={row.addedDate}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
