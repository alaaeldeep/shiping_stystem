/* MUI */
import { Table, TableBody, TableContainer } from "@mui/material";

/* components  */
import CustomTableHead from "../../../../../components/table/tableHead";
import Row from "./row";

/* types */
import { HeadCell, CityRow } from "../../../../../components/types";

type ViewCitiesLargeScreenProps = {
    rows: CityRow[];
    headCell: HeadCell[];
};

export const ViewCitiesLargeScreen = ({
    rows,
    headCell,
}: ViewCitiesLargeScreenProps) => {
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
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                            <Row
                                key={index}
                                index={index}
                                id={row.id}
                                labelId={labelId}
                                city={row.city}
                                state={row.state}
                                shippingCost={row.shippingCost}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
