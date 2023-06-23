/* MUI */
import {
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogTitle,
} from "@mui/material";

/* motion */
import { motion } from "framer-motion";

/* react query */
import { UseMutateStatus } from "../../../../hooks/empoyees/useEditMutate";

/*  */
import { EmployeeGET } from "../../../../components/types";

type props = {
    data: EmployeeGET;
    openStatusHandler: boolean;
    handleClose: () => void;
};
const ChangeStatusHandler = ({
    data,
    openStatusHandler,
    handleClose,
}: props) => {
    const { mutate, isLoading } = UseMutateStatus();

    const handelChangeStatusSubmit = () => {
        mutate(
            { id: data.id, status: !data.status },
            {
                onSuccess: () => {
                    handleClose();
                },
            }
        );
    };
    return (
        <Dialog
            fullWidth={true}
            open={openStatusHandler}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.3,
                }}
            >
                <DialogTitle
                    id="alert-dialog-title"
                    width={{ xs: "230px", sm: "auto" }}
                >
                    {data.status ? (
                        <span>
                            هل متاكد من{" "}
                            <span style={{ color: "#E74646" }}>تقييد</span>{" "}
                            الموظف : {data.userName}
                        </span>
                    ) : (
                        <span>
                            هل متاكد من اعادة{" "}
                            <span style={{ color: "#65C466" }}>تنشيط</span>{" "}
                            الموظف : {data.userName}
                        </span>
                    )}
                </DialogTitle>
            </motion.div>
            <DialogActions>
                <Button
                    onClick={handelChangeStatusSubmit}
                    autoFocus
                    sx={
                        data.status
                            ? {
                                  backgroundColor: "#FFACAC",
                                  color: "#B70404",
                              }
                            : {
                                  backgroundColor: "#98D8AA",
                                  color: "#41644A",
                              }
                    }
                >
                    نعم, {data.status ? "قيد" : "نشط"}
                </Button>
                <Button
                    onClick={handleClose}
                    sx={{
                        backgroundColor: "#BAD7E9",
                        color: "#001253",
                    }}
                >
                    الغاء
                </Button>
            </DialogActions>{" "}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Dialog>
    );
};

export default ChangeStatusHandler;
