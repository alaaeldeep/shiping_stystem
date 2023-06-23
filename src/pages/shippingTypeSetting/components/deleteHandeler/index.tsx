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
import UseMutate from "../../../../hooks/shippingSetting/useDeleteMutate";

/* toast */
import { toast } from "react-toastify";

type props = {
    id: number;
    openDeleteHandler: boolean;
    name: string;
    handleDeleteHandlerClose: () => void;
};
const DeleteHandler = ({
    id,
    openDeleteHandler,
    handleDeleteHandlerClose,
    name,
}: props) => {
    const { mutate, isLoading } = UseMutate();
    const handelDeleteSubmit = () => {
        mutate(id, {
            onSuccess: () => {
                handleDeleteHandlerClose();
            },
        });
    };
    return (
        <Dialog
            fullWidth={true}
            open={openDeleteHandler}
            onClose={handleDeleteHandlerClose}
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
                {" "}
                <DialogTitle
                    id="alert-dialog-title"
                    width={{ xs: "230px", sm: "auto" }}
                >
                    هل متاكد من حذف نوع الشحن : {name}
                </DialogTitle>
            </motion.div>{" "}
            <DialogActions>
                <Button
                    onClick={handelDeleteSubmit}
                    autoFocus
                    sx={{
                        backgroundColor: "#FFACAC",
                        color: "#B70404",
                    }}
                >
                    نعم, احــذف
                </Button>
                <Button
                    onClick={handleDeleteHandlerClose}
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

export default DeleteHandler;
