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
import { SpecialPackagePost } from "../../../../../components/types";

type props = {
    SpecialPackage: SpecialPackagePost[];
    setSpecialPackage: any;
};
const SpecialPackageInLargeScreen = ({
    SpecialPackage,
    setSpecialPackage,
}: props) => {
    const handelDeleteSpecialPackage = (row: SpecialPackagePost) => {
        setSpecialPackage((prev: SpecialPackagePost[]) =>
            prev.filter(
                (oldPackage: SpecialPackagePost) => oldPackage.id !== row.id
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
                        (row: SpecialPackagePost, index: number) => (
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
