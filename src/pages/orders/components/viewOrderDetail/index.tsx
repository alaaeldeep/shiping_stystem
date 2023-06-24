/* react staff */
import { useRef } from "react";

/* react print */
import { useReactToPrint } from "react-to-print";

/* MUI */
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Divider,
    Chip,
    Fab,
    Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";

/* motion */
import { motion } from "framer-motion";

/* types */
import { OrderRow, Product } from "../../../../components/types";
import { useOwnStore } from "../../../../store";

type OrderDetailsProps = {
    open: boolean;
    data: OrderRow;

    handleClose: () => void;
};
const ViewOrderDetails = ({ open, handleClose, data }: OrderDetailsProps) => {
    const mode = useOwnStore((store) => store.mode);
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: `{ { display: "block",backgroundColor:"red  }`,
    });

    const checkStatus = (status: number) => {
        switch (status) {
            case 0:
                return "جديد";
                break;
            case 1:
                return "قيد الانتظار";
                break;
            case 2:
                return "تم التسليم للمندوب";
                break;
            case 3:
                return "تم التسليم ";
                break;
            case 4:
                return "لا يمكن الوصول ";
                break;
            case 5:
                return "تم التأجيل";
                break;
            case 6:
                return "تم التسليم جزئيا";
                break;
            case 7:
                return "تم التأجيل";
                break;
            case 8:
                return "تم الالغاء من قبل المستلم ";
                break;
            case 9:
                return "تم الرفض مع الدفع";
                break;
            case 10:
                return "رفض  مع سداد جزء ";
                break;
            case 11:
                return "رفض  ولم يتم الدفع ";
                break;
            default:
            // code block
        }
    };

    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={open}
                onClose={handleClose}
                sx={{}}
            >
                <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ x: 0, scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.3,
                    }}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    {/* id */}
                    <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                        عـرض البيانات الخاصــة بالطلب : {data.id}
                    </DialogTitle>{" "}
                    {/* close btn */}
                    <DialogActions>
                        <IconButton onClick={handleClose}>
                            <CloseIcon
                                sx={{ color: "red", fontSize: "1.7rem" }}
                            />
                        </IconButton>
                    </DialogActions>
                </motion.div>
                {/* content=> view OrderDetails */}
                <DialogContent ref={componentRef}>
                    <Box
                        sx={{
                            borderRadius: "25px",
                            boxShadow:
                                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                            display: "flex",
                            flexDirection: "column",
                            padding: "25px",
                            gap: "1rem",
                        }}
                    >
                        <Box
                            className="logoPrint"
                            sx={{
                                justifyContent: "space-between",
                            }}
                        >
                            <img
                                src="./iti-logo.png"
                                height={55}
                                alt="iti logo in print screen"
                            />
                            <h1>TEAM 4 </h1>
                            <img
                                src="./iconLogo.png"
                                height={55}
                                alt="iti logo in print screen"
                            />
                        </Box>
                        {/* order data */}
                        <Divider>
                            <Chip
                                label="بيانات الطلب"
                                sx={{ fontWeight: "bold", padding: "20px" }}
                            />
                        </Divider>
                        <Typography>
                            {" "}
                            <span style={{ fontWeight: "600" }}>
                                الرقم التسلسلي :
                            </span>{" "}
                            {data.id}
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                تاريخ اضافة الطلب :
                            </span>{" "}
                            {data.date}
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                حالة الطلب :
                            </span>{" "}
                            {checkStatus(data.orderStatus)}
                        </Typography>
                        {data.representative ? (
                            <Typography>
                                <span style={{ fontWeight: "600" }}>
                                    اسم المندوب :
                                </span>{" "}
                                {data.representative.fullName}
                            </Typography>
                        ) : null}
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                نوع الدفع :
                            </span>{" "}
                            {data.paymentType === 0 ? "واجبة التحصيل" : null}
                            {data.paymentType === 1 ? "دفع  مقدم" : null}
                            {data.paymentType === 2 ? "طرد مقابل طرد" : null}
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                نوع الشحن :
                            </span>{" "}
                            {data.shippingType.name}
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                تكلفة الطلب :
                            </span>{" "}
                            {data.orderCost} جـنيه مــصري
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                تكلفة الشحن :
                            </span>{" "}
                            {data.orderShipingCost} جـنيه مــصري
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                التكلفه الاجمالية :
                            </span>{" "}
                            {data.totalCost} جـنيه مــصري
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                الوزن الاجمالي :
                            </span>{" "}
                            {data.totalWeight} كجـــم
                        </Typography>
                        {/* client data */}
                        <Divider
                        /* sx={{
                                ":before": {
                                    borderTop: "thin solid red",
                                },
                                ":after": {
                                    borderTop: "thin solid red",
                                },
                            }} */
                        >
                            <Chip
                                label="بيانات العميل"
                                sx={{ fontWeight: "bold", padding: "20px" }}
                            />
                        </Divider>
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                {" "}
                                اسم العميل :
                            </span>{" "}
                            {data.clientName}
                        </Typography>
                        <Typography>
                            {" "}
                            <span style={{ fontWeight: "600" }}>
                                {" "}
                                البريد الالكتروني :
                            </span>{" "}
                            {data.email}
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                {" "}
                                رقم الهاتف :
                            </span>{" "}
                            {data.phone1}
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                {" "}
                                رقم الهاتف الاضافي :
                            </span>{" "}
                            {data.phone2}
                        </Typography>
                        <Typography>
                            {" "}
                            <span style={{ fontWeight: "600" }}>
                                {" "}
                                اسم الفرع :
                            </span>{" "}
                            {data.branch.name}
                        </Typography>
                        <Typography>
                            {" "}
                            <span style={{ fontWeight: "600" }}>
                                {" "}
                                المحافظة :
                            </span>{" "}
                            {data.state.name}
                        </Typography>
                        <Typography>
                            {" "}
                            <span style={{ fontWeight: "600" }}>
                                {" "}
                                اسم المدينة :
                            </span>{" "}
                            {data.city.name}
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                {" "}
                                نوع الاستلام :
                            </span>{" "}
                            {data.orderType === 0
                                ? "التسليم في الفرع"
                                : "التسليم اونلاين"}
                        </Typography>
                        {/* trader data */}
                        <Divider>
                            <Chip
                                label="بيانات   التاجر"
                                sx={{
                                    fontWeight: "bold",
                                    padding: "20px",
                                }}
                            />
                        </Divider>{" "}
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                {" "}
                                اسم المتجر :
                            </span>{" "}
                            {data.trader.fullName}
                        </Typography>
                        <Typography>
                            <span style={{ fontWeight: "600" }}>
                                {" "}
                                رقم الهاتف :
                            </span>{" "}
                            {data.trader.phoneNumber}
                        </Typography>
                        {/* products data */}
                        {/* <Typography
                            fontWeight={"bold"}
                            width={"100%"}
                            textAlign={"center"}
                            p={"12px"}
                        >
                            تفاصيل منتجات الطلب
                        </Typography> */}
                        <Divider>
                            <Chip
                                label="تفاصيل منتجات الطلب"
                                sx={{
                                    fontWeight: "bold",
                                    padding: "20px",
                                }}
                            />
                        </Divider>
                        <TableContainer
                            component={Paper}
                            className="tablePrint"
                        >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            اسم المنتج
                                        </TableCell>
                                        <TableCell align="center">
                                            الكمية
                                        </TableCell>
                                        <TableCell align="center">
                                            الوزن
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.orderItems.map(
                                        (row: Product, index: number) => (
                                            <TableRow
                                                key={index}
                                                sx={{
                                                    "&:last-child td, &:last-child th":
                                                        {
                                                            border: 0,
                                                        },
                                                }}
                                            >
                                                <TableCell
                                                    align="center"
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {row.productName}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.productQuantity} قطعة
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.productWeight} كجــم
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>{" "}
                </DialogContent>

                {/* print */}
                <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ x: 0, scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.3,
                    }}
                >
                    {" "}
                    <Fab
                        color="secondary"
                        onClick={handlePrint}
                        sx={{
                            position: "absolute",
                            right: 50,
                            bottom: 60,
                        }}
                    >
                        <Tooltip title="طباعة" onClick={handlePrint}>
                            <IconButton>
                                <PrintIcon
                                    sx={
                                        mode === "dark"
                                            ? {
                                                  color: "#ACDCEE",
                                              }
                                            : {
                                                  color: "#475063",
                                              }
                                    }
                                />
                            </IconButton>
                        </Tooltip>{" "}
                    </Fab>
                </motion.div>
            </Dialog>
        </>
    );
};

export default ViewOrderDetails;
