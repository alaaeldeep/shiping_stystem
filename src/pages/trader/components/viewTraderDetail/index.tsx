/* MUI */
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    useMediaQuery,
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

/* types */
import { SpecialPackage, TraderType } from "../../../../components/types";

type TraderDetailsProps = {
    open: boolean;
    data: TraderType;

    handleClose: () => void;
};
const ViewTraderDetails = ({ open, handleClose, data }: TraderDetailsProps) => {
    const matches = useMediaQuery("(min-width:1070px)");

    function handelDeleteSpecialPackage(row: SpecialPackage): void {
        throw new Error("Function not implemented.");
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            open={open}
            onClose={handleClose}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* title */}
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    عـرض البيانات الخاصــة بالتاجر : {data.traderData.userName}
                </DialogTitle>{" "}
                {/* close btn */}
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </div>

            {/* content=> view trderDetails */}
            <DialogContent>
                <Box
                    sx={{
                        paddingX: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <Typography>
                        الاسم بالكامل : {data.traderData.fullName}
                    </Typography>
                    <Typography>
                        اسم المستخدم : {data.traderData.userName}
                    </Typography>
                    <Typography>
                        اسم المتجر : {data.traderData.storeName}
                    </Typography>
                    <Typography>
                        البريد الالكتروني : {data.traderData.email}
                    </Typography>
                    <Typography>
                        رقم الهاتف : {data.traderData.phoneNumber}
                    </Typography>
                    <Typography> الفرع : {data.traderData.branchId}</Typography>
                    <Typography>
                        {" "}
                        المحافظة : {data.traderData.stateId}
                    </Typography>
                    <Typography> المدينة : {data.traderData.cityId}</Typography>
                    <Typography>العنوان : {data.traderData.address}</Typography>
                    <Typography>
                        نسبة تحمل التاجر من قيمة شحن الطلبات المرفوضة :
                        {data.traderData.rejectionOrderLossRatio}%
                    </Typography>
                </Box>

                <Typography
                    fontWeight={"bold"}
                    width={"100%"}
                    textAlign={"center"}
                    p={"12px"}
                >
                    باقات مميزه لبعض المدن
                </Typography>
                {data.SpecialPackage.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        اسم المحافظه
                                    </TableCell>
                                    <TableCell align="center">
                                        المدينه
                                    </TableCell>
                                    <TableCell align="center">
                                        سعر الشحن
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.SpecialPackage.map(
                                    (row: SpecialPackage, index: number) => (
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
                                                {row.stateId}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.cityId}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.shippingCost}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography width={"100%"} textAlign={"center"}>
                        لا يوجد باقات مميزة لاي مدن
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ViewTraderDetails;
