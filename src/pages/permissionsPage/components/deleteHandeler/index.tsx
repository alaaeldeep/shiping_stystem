/* MUI */
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

/* motion */
import { motion } from "framer-motion";

/* react query */
import UseMutate from "../../../../hooks/permissions/useDeleteMutate";
import { toast } from "react-toastify";

type props = {
    id: string;
    openDeleteHandler: boolean;
    handleDeleteHandlerClose: () => void;
};
const DeleteHandler = ({
    id,
    openDeleteHandler,
    handleDeleteHandlerClose,
}: props) => {
    const { mutate } = UseMutate();
    const handelDeleteSubmit = () => {
        mutate(id, {
            onSuccess: () => {
                handleDeleteHandlerClose();
            },
            onError: () => {
                toast.warn("لا يمكن حذف هذه الصلاحية", {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000,
                    theme: "dark",
                });
            },
        });
    };
    return (
        <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ x: 50, scale: 1, opacity: 1 }}
            transition={{
                duration: 2,
            }}
        >
            <Dialog
                fullWidth={true}
                open={openDeleteHandler}
                onClose={handleDeleteHandlerClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {" "}
                <motion.div
                    initial={{ x: -20, scale: 0.4, opacity: 0 }}
                    animate={{ x: 0, scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.2,
                    }}
                >
                    <DialogTitle
                        id="alert-dialog-title"
                        width={{ xs: "230px", sm: "auto" }}
                    >
                        هل متاكد من حذف هذه الصلاحية ؟
                    </DialogTitle>
                </motion.div>
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
                </DialogActions>
            </Dialog>
        </motion.div>
    );
};

export default DeleteHandler;
