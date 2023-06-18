/* MUI */
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

type Props = { headCell: any };

const CustomTableHead = ({ headCell }: Props) => {
    return (
        <TableHead>
            <TableRow>
                {headCell?.map((headCell: any) => (
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
