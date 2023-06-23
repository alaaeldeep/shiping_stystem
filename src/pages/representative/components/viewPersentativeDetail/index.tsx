/* MUI */
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
    Typography,
    Divider,
    Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* motion */
import { motion } from "framer-motion";

/* types */
import { RepresentativeGET } from "../../../../components/types";

type RepresentativeDetailsProps = {
    open: boolean;
    data: RepresentativeGET;

    handleClose: () => void;
};
const ViewRepresentativeDetails = ({
    open,
    handleClose,
    data,
}: RepresentativeDetailsProps) => {
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
                    عـرض البيانات الخاصــة بالمندوب : {data.userName}
                </DialogTitle>{" "}
                {/* close btn */}
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </motion.div>

            {/* content=> view RepresentativeDetails */}
            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        /* border: "1px solid #9ba4b5b7", */
                        padding: "25px",
                        borderRadius: "25px",
                        boxShadow:
                            "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                    }}
                >
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
                        {data.branch.name}
                    </Typography>

                    <Typography>
                        <span style={{ fontWeight: "600" }}>
                            نسبة الشركة من الطلب :
                        </span>{" "}
                        {data.companyOrderRatio}{" "}
                        {data.discountType.toString() === "0" ? "جنية" : "%"}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: "600" }}> نوع الخصم :</span>{" "}
                        {data.discountType.toString() === "0"
                            ? "رقم ثابت"
                            : "نسبة مئوية"}
                    </Typography>

                    <div>
                        <Divider>
                            <Chip
                                label="المحافظات "
                                sx={{ fontWeight: "bold", padding: "20px" }}
                            />
                        </Divider>
                        <ul
                            style={{ listStyle: "none", marginRight: "5.5rem" }}
                        >
                            {data.states.map((state, index) => (
                                <li key={index}>
                                    {" "}
                                    {index + 1} - {state.state}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ViewRepresentativeDetails;
