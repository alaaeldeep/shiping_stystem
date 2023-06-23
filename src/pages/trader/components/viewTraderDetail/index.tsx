/* MUI */
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Paper,
    Divider,
    Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* date formatter */
import moment from "moment";
import "moment/dist/locale/ar";

/* motion */
import { motion } from "framer-motion";

/* types */
import { SpecialPackageGET, TraderRow } from "../../../../components/types";

type TraderDetailsProps = {
    open: boolean;
    data: TraderRow;

    handleClose: () => void;
};

const ViewTraderDetails = ({ open, handleClose, data }: TraderDetailsProps) => {
    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            open={open}
            onClose={handleClose}
        >
            <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.3,
                }}
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                {/* title */}
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    عـرض البيانات الخاصــة بالتاجر : {data.userName}
                </DialogTitle>{" "}
                {/* close btn */}
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </motion.div>

            {/* content=> view trderDetails */}
            <DialogContent>
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
                    <Divider>
                        <Chip
                            label="بيانات التاجر"
                            sx={{ fontWeight: "bold", padding: "20px" }}
                        />
                    </Divider>
                    <Typography>
                        <span style={{ fontWeight: "600" }}>
                            الاسم بالكامل :
                        </span>{" "}
                        {data.fullName}
                    </Typography>

                    <Typography>
                        <span style={{ fontWeight: "600" }}>
                            اسم المستخدم :
                        </span>{" "}
                        {data.userName}
                    </Typography>

                    <Typography>
                        <span style={{ fontWeight: "600" }}>
                            البريد الالكتروني :
                        </span>{" "}
                        {data.email}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: "600" }}>رقم الهاتف :</span>{" "}
                        {data.phoneNumber}
                    </Typography>

                    <Typography>
                        <span style={{ fontWeight: "600" }}>العنوان : </span>{" "}
                        {data.address}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: "600" }}>اسم الفرع :</span>{" "}
                        {data.branch.name}{" "}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: "600" }}>اسم المتجر :</span>{" "}
                        {data.storeName}{" "}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: "600" }}>المحافظة :</span>{" "}
                        {data.state.name}{" "}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: "600" }}>اسم المدينة :</span>{" "}
                        {data.city.name}{" "}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: "600" }}>
                            تاريخ الاضافة :
                        </span>{" "}
                        {moment(data.date).locale("ar").format("LLLL")}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: "600" }}>
                            نسبة تحمل التاجر من قيمة شحن الطلبات المرفوضة :
                        </span>{" "}
                        {data.rejectedOrderlossRatio} %{" "}
                    </Typography>

                    {/* **************************** */}
                </Box>
                <Divider>
                    <Chip
                        label="    باقات مميزه لبعض المدن"
                        sx={{
                            fontWeight: "bold",
                            padding: "20px",
                            margin: "20px",
                        }}
                    />
                </Divider>
                {/*                 <Typography
                    fontWeight={"bold"}
                    width={"100%"}
                    textAlign={"center"}
                    sx={{
                        padding: "20px",
                        boxShadow:
                            "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                    }}
                >
                    باقات مميزه لبعض المدن
                </Typography> */}
                {data.specialPackages.length > 0 ? (
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
                                {data.specialPackages.map(
                                    (row: SpecialPackageGET, index: number) => (
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
                                                {row.state}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.city}
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
