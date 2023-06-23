/* react staff */
import { useState } from "react";

/* MUI */
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
    Button,
    FormHelperText,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* motion */
import { motion } from "framer-motion";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* toast */
import { toast } from "react-toastify";

/* types */
import { OrderRow, Data } from "../../../../components/types";

/* react query */
import UseQuery from "../../../../hooks/serverState/useQuery";
import { UseMutateOrderAssign } from "../../../../hooks/orders/useEditMutate";

type OrderDetailsProps = {
    open: boolean;
    data: OrderRow;
    handleClose: () => void;
};

const AssignToRepresentative = ({
    open,
    handleClose,
    data,
}: OrderDetailsProps) => {
    const { data: availableRepresentative } = UseQuery(
        `/Representatives/state/${data.state.id}`
    );

    const { mutate, isLoading } = UseMutateOrderAssign();

    const [status, setStatus] = useState<string>();
    const handelStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };
    const schema = z.object({
        representativeID: z
            .string()
            .nonempty({ message: "برجاء تحديد حالة الطلب" }),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState } = useForm<FormValue>({
        defaultValues: {},
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;

    /* 🚀 make the request 🚀  */
    const onSubmit = (requestData: FormValue) => {
        mutate(
            {
                id: data.id,
                representativeID: requestData.representativeID,
            },
            {
                onSuccess: () => {
                    {
                        handleClose();
                    }
                },
            }
        );
    };

    const onError = () => {
        toast.warn("برجاء اختيار حالة الطلب ", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000,
            theme: "dark",
        });
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"md"}
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
                {/* id */}
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    اسناد الطلب رقم {data.id} الي مندوب
                </DialogTitle>{" "}
                {/* close btn */}
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </motion.div>

            {/* content=> view OrderDetails */}
            <DialogContent sx={{ height: "300px" }}>
                <Box
                    sx={{
                        marginX: "20px",
                        paddingX: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        mb: 2,
                        borderRadius: "25px",
                        boxShadow:
                            "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                    }}
                >
                    <form
                        onSubmit={handleSubmit(onSubmit, onError)}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            /*  padding: "50px", */
                        }}
                        noValidate
                    >
                        <Box
                            sx={{
                                width: "100%",
                                /*    backgroundColor: "secondary.main", */
                                padding: "10px 0px",
                                borderRadius: "25px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                mb: 3,
                            }}
                        >
                            {/* status */}
                            <Box sx={{ marginX: "auto", width: "90%" }}>
                                <div style={{ margin: "20px 0" }}>
                                    <FormControl
                                        sx={{
                                            width: "90%",
                                        }}
                                    >
                                        <InputLabel
                                            error={!!errors.representativeID}
                                            color="info"
                                            id="demo-simple-select-helper-label"
                                        >
                                            اسم المندوب
                                        </InputLabel>
                                        <Select
                                            {...register("representativeID")}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={status}
                                            label="اسم المندوب"
                                            color="info"
                                            onChange={handelStatusChange}
                                        >
                                            {availableRepresentative?.data.map(
                                                (representative: {
                                                    id: string;
                                                    fullName: string;
                                                }) => (
                                                    <MenuItem
                                                        key={representative.id}
                                                        value={
                                                            representative.id
                                                        }
                                                    >
                                                        {
                                                            representative.fullName
                                                        }
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        <FormHelperText
                                            error={!!errors.representativeID}
                                        >
                                            {errors?.representativeID?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </div>
                            </Box>

                            {/* update btn */}
                            <Button
                                type="submit"
                                sx={{
                                    width: "80%",
                                    marginX: "auto",
                                    height: "40px",
                                    fontWeight: "bold",
                                }}
                                variant="contained"
                            >
                                تحديث
                            </Button>
                        </Box>
                        <DevTool control={control} />
                        <Backdrop
                            sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open={isLoading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </form>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AssignToRepresentative;
