/* MUI */
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

/* types */
import { HeadCell } from "../../types";

type Props = { headCell: HeadCell[] };

const CustomTableHead = ({ headCell }: Props) => {
    return (
        <TableHead>
            <TableRow>
                {headCell?.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={"center"}
                        /*  padding={headCell.disablePadding ? "none" : "normal"} */
                    >
                        <TableSortLabel>{headCell.label}</TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default CustomTableHead;
