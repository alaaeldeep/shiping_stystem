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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* types */
import { RepresentativeRow } from "../../../../components/types";

type RepresentativeDetailsProps = {
    open: boolean;
    data: RepresentativeRow;

    handleClose: () => void;
};
const ViewRepresentativeDetails = ({
    open,
    handleClose,
    data,
}: RepresentativeDetailsProps) => {
    const matches = useMediaQuery("(min-width:1070px)");

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
                    عـرض البيانات الخاصــة بالمندوب : {data.userName}
                </DialogTitle>{" "}
                {/* close btn */}
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </div>

            {/* content=> view RepresentativeDetails */}
            <DialogContent>
                <Box
                    sx={{
                        paddingX: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <Typography>الاسم بالكامل : {data.fullName}</Typography>
                    <Typography>اسم المستخدم : {data.userName}</Typography>

                    <Typography>البريد الالكتروني : {data.email}</Typography>
                    <Typography>رقم الهاتف : {data.phoneNumber}</Typography>

                    <Typography>العنوان : {data.address}</Typography>
                    <Typography>اسم المستخدم : {data.userName}</Typography>
                    <Typography> الفرع : {data.branch.branch}</Typography>
                    <div>
                        {" "}
                        المحافظات :{" "}
                        <ul style={{ listStyle: "none", marginRight: "5rem" }}>
                            {data.states.map((state) => (
                                <li key={state.id}> 📌 {state.state}</li>
                            ))}
                        </ul>
                    </div>

                    <Typography>
                        نسبة الشركه من الطلب : {data.companyOrderRatio} %
                    </Typography>
                    <Typography>
                        نوع الخصم :{" "}
                        {data.discountType === "0" ? "رقم ثابت" : "نسبة مئوية"}
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ViewRepresentativeDetails;
