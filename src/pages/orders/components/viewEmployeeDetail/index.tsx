/* MUI */
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    useMediaQuery,
    Box,
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* types */
import { OrderRow, Product } from "../../../../components/types";

type OrderDetailsProps = {
    open: boolean;
    data: OrderRow;

    handleClose: () => void;
};
const ViewOrderDetails = ({ open, handleClose, data }: OrderDetailsProps) => {
    const matches = useMediaQuery("(min-width:1070px)");

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
        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            open={open}
            onClose={handleClose}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* id */}
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    عـرض البيانات الخاصــة بالطلب : {data.id}
                </DialogTitle>{" "}
                {/* close btn */}
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </div>

            {/* content=> view OrderDetails */}
            <DialogContent>
                <Box
                    sx={{
                        paddingX: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <Typography>الرقم التسلسلي : {data.id}</Typography>
                    <Typography>
                        تاريخ اضافة الطلب : {data.addedDate}
                    </Typography>
                    <Typography>
                        حالة الطلب : {checkStatus(data.OrderStatus)}
                    </Typography>
                    <Typography>
                        نوع الدفع :{" "}
                        {data.PaymentType === 0 ? "واجبة التحصيل" : null}
                        {data.PaymentType === 1 ? "دقع مقدم" : null}
                        {data.PaymentType === 2 ? "طرد مقابل طرد" : null}
                    </Typography>
                    <Typography>
                        نوع الشحن : {data.ShippingTypeId.type}
                    </Typography>
                    <Typography>
                        {" "}
                        تكلفة الطلب : {data.OrderCost} جـنيه مــصري
                    </Typography>

                    <Typography>اسم العميل : {data.ClientName}</Typography>
                    <Typography>البريد الالكتروني : {data.Email}</Typography>
                    <Typography>
                        رقم الهاتف الخاص بالعميل : {data.Phone1}
                    </Typography>
                    <Typography>
                        رقم الهاتف الاضافي الخاص بالعميل : {data.Phone2}
                    </Typography>
                    <Typography> الفرع : {data.BranchId.branch}</Typography>
                    <Typography> المحافظة : {data.StateId.state}</Typography>
                    <Typography> المدينة : {data.CityId.city}</Typography>
                    <Typography>
                        نوع التسلم :{" "}
                        {data.OrderType === 0
                            ? "التسليم في الفرع"
                            : "التسليم اونلاين"}
                    </Typography>

                    <Typography
                        fontWeight={"bold"}
                        width={"100%"}
                        textAlign={"center"}
                        p={"12px"}
                    >
                        تفاصيل منتجات الطلب
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        اسم المنتج
                                    </TableCell>
                                    <TableCell align="center">الكمية</TableCell>
                                    <TableCell align="center">الوزن</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.OrderItem.map(
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
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ViewOrderDetails;
