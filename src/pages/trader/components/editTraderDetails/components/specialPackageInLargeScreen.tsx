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
import { SpecialPackage } from "../../../../../components/types";

type props = {
    SpecialPackage: SpecialPackage[];
    setSpecialPackage: any;
};
const SpecialPackageInLargeScreen = ({
    SpecialPackage,
    setSpecialPackage,
}: props) => {
    const handelDeleteSpecialPackage = (row: SpecialPackage) => {
        setSpecialPackage((prev: SpecialPackage) =>
            prev.filter(
                (oldPackage: SpecialPackage) => oldPackage.id !== row.id
            )
        );
    };
    console.log(SpecialPackage);
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
                        (row: SpecialPackage, index: number) => (
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
                                    {row.state.name
                                        ? row.state.name
                                        : row.state}
                                </TableCell>
                                <TableCell align="center">
                                    {row.city.name ? row.city.name : row.city}
                                </TableCell>
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
