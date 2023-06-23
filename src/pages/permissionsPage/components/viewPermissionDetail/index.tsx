/* MUI */
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* motion */
import { motion } from "framer-motion";

/* components */
import { AddPermissionLargeScreen } from "../../add/addPermissionLargeScreen";

/* types */

import { headCells } from "../../add/addPermissionPage";

import { useForm } from "react-hook-form";
import { AddPermissionSmallScreen } from "../../add/addPermissionSmallScreen";
/* zod */
import { z } from "zod";

type PermissionDetailsProps = {
    open: boolean;
    roleName: string;
    id: string | undefined;
    selectedPermissions: any;
    handleClose: () => void;
};

const ViewPermissionDetails = ({
    open,
    handleClose,
    roleName,
    selectedPermissions,
}: PermissionDetailsProps) => {
    const matches = useMediaQuery("(min-width:1070px)");

    const schema = z.object({
        roleName: z.string().nonempty("برجاء كتابة اسم الصلاحية"),
        Permissions: z.record(z.string(), z.array(z.string())),
    });
    type FormValue = z.infer<typeof schema>;
    const { register } = useForm<FormValue>({});
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
                    عـرض الصـــلاحـيــات الخاصــة بــــ : {roleName}
                </DialogTitle>{" "}
                {/* close btn */}
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </motion.div>

            {/* content=> view permissions */}
            <DialogContent>
                {matches ? (
                    <AddPermissionLargeScreen
                        register={register}
                        selected={selectedPermissions}
                        headCell={headCells}
                    />
                ) : (
                    <AddPermissionSmallScreen
                        register={register}
                        selected={selectedPermissions}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ViewPermissionDetails;
