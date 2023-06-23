import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

/* types */
import { SpecialPackageView } from "../../../../components/types";

type props = {
    SpecialPackage: SpecialPackageView[];
    setSpecialPackage: any;
};
const SpecialPackageInLargeScreen = ({
    SpecialPackage,
    setSpecialPackage,
}: props) => {
    const handelDeleteSpecialPackage = (row: SpecialPackageView) => {
        setSpecialPackage((prev: SpecialPackageView[]) =>
            prev.filter(
                (oldPackage: SpecialPackageView) => oldPackage.id !== row.id
            )
        );
    };
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">اسم المحافظه</TableCell>
                        <TableCell align="center">المدينه</TableCell>
                        <TableCell align="center">سعر الشحن</TableCell>
                        <TableCell align="center">ازاله</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {SpecialPackage.map(
                        (row: SpecialPackageView, index: number) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                >
                                    {row.state}
                                </TableCell>
                                <TableCell align="center">{row.city}</TableCell>
                                <TableCell align="center">
                                    {row.shippingCost}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    onClick={() =>
                                        handelDeleteSpecialPackage(row)
                                    }
                                >
                                    {/* <IconButton>
    <EditIcon /><
</IconButton> */}
                                    <IconButton>
                                        <DeleteForeverIcon
                                            style={{
                                                color: "#DF2E38",
                                            }}
                                        />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default SpecialPackageInLargeScreen;
