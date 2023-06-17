/* react staff */
import { useState } from "react";

import {
    Button,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* types */
import { Product } from "../../../../../components/types";

type props = {
    products: Product[];
    setProducts: any;
    handleOpenModal: () => void;
};
const ProductsInSmallScreen = ({
    products,
    setProducts,
    handleOpenModal,
}: props) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handelDeleteProduct = (row: Product) => {
        setProducts((prev: Product[]) =>
            prev.filter((oldProduct: Product) => oldProduct.id !== row.id)
        );
    };

    return (
        <>
            {" "}
            <Paper>
                {" "}
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
            </Paper>
            <Paper sx={{ width: "100%" }}>
                {products.map((row: Product, index: number) => (
                    <Accordion
                        key={index}
                        sx={{ px: 5 }}
                        expanded={expanded === index.toString()}
                        onChange={handleChange(index.toString())}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            {/* id */}
                            <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                {index + 1}
                            </Typography>

                            {/* city name */}
                            <Typography sx={{ color: "text.secondary" }}>
                                {row.productName.slice(0, 5)}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            {/* id */}
                            <Typography>الرقم : {index + 1}</Typography>

                            {/* product name */}
                            <Typography>
                                {" "}
                                اسم المنتج : {row.productName}
                            </Typography>
                            {/* quantity  */}
                            <Typography>
                                {" "}
                                المحافظة : {row.productQuantity}
                            </Typography>
                            {/*product Price */}

                            <Typography> السعر : {row.productPrice}</Typography>

                            {/*produc tWeight  */}
                            <Typography>
                                {" "}
                                السعر : {row.productWeight}
                            </Typography>

                            {/* settings */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Typography>ازالة : </Typography>
                                <Box>
                                    <IconButton
                                        onClick={() => handelDeleteProduct(row)}
                                    >
                                        <DeleteForeverIcon
                                            style={{
                                                color: "#DF2E38",
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Paper>
        </>
    );
};
export default ProductsInSmallScreen;
