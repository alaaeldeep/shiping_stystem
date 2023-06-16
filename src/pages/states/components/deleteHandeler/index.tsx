/* MUI */
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

/* react query */
import UseMutate from "../../../../hooks/states/useDeleteMutate";

type props = {
    id: number;
    state: string;
    openDeleteHandler: boolean;
    handleDeleteHandlerClose: () => void;
};
const DeleteHandler = ({
    id,
    state,
    openDeleteHandler,
    handleDeleteHandlerClose,
}: props) => {
    const { mutate } = UseMutate();
    const handelDeleteSubmit = () => {
        mutate(id);
        handleDeleteHandlerClose();
    };
    return (
        <Dialog
            fullWidth={true}
            open={openDeleteHandler}
            onClose={handleDeleteHandlerClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                id="alert-dialog-title"
                width={{ xs: "230px", sm: "auto" }}
            >
                هل متاكد من حذف محافظة {state} ؟
            </DialogTitle>

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
    );
};

export default DeleteHandler;
