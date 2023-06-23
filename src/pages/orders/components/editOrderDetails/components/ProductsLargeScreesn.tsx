import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

/* types */
import { Product } from "../../../../../components/types";

type props = {
    products: Product[];
    setProducts: any;
    handleOpenModal: () => void;
};
const ProductsInLargeScreen = ({
    products,
    setProducts,
    handleOpenModal,
}: props) => {
    const handelDeleteSpecialPackage = (row: Product) => {
        setProducts((prev: Product[]) =>
            prev.filter((oldProduct: Product) => oldProduct.id !== row.id)
        );
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">اسم المنتج</TableCell>
                        <TableCell align="center">الكمية</TableCell>

                        <TableCell align="center">الوزن (كجم)</TableCell>
                        <TableCell sx={{ width: "50px" }} align="center">
                            حذف
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((row, index: number) => (
                        <TableRow
                            key={index}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell
                                sx={{
                                    maxWidth: "90px",
                                    overflowWrap: "break-word",
                                }}
                                align="center"
                                component="th"
                                scope="row"
                            >
                                {row.productName}
                            </TableCell>
                            <TableCell align="center">
                                {row.productQuantity}
                            </TableCell>
                            <TableCell align="center">
                                {row.productWeight}
                            </TableCell>

                            <TableCell align="center">
                                <IconButton
                                    onClick={() =>
                                        handelDeleteSpecialPackage(row)
                                    }
                                >
                                    <DeleteForeverIcon
                                        style={{
                                            color: "#DF2E38",
                                        }}
                                    />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>{" "}
            </Table>
            {products.length === 0 && (
                <Typography textAlign={"center"} p={6}>
                    ⚠️ لم تقم باضافه منتجات بعد, قم باضافه منتجات وستظهر هنا
                    <Button
                        color="info"
                        onClick={handleOpenModal}
                        sx={{
                            marginX: "auto",
                            height: "40px",
                            fontWeight: "bold",
                        }}
                    >
                        اضافه منـتـج ؟
                    </Button>
                </Typography>
            )}
        </TableContainer>
    );
};
export default ProductsInLargeScreen;
