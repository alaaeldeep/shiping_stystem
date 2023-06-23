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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* toast */
import { toast } from "react-toastify";

/* react router */
import { useNavigate } from "react-router";

/* utils */
import { statuses } from "../../../../utils/converter";

/* types */
import { OrderRow } from "../../../../components/types";

type OrderDetailsProps = {
    open: boolean;
    data: OrderRow;
    handleClose: () => void;
};

const ChangeOrderStatus = ({ open, handleClose, data }: OrderDetailsProps) => {
    const navigate = useNavigate();

    //const { mutate } = UseMutate();

    const [status, setStatus] = useState<string>();
    const handelStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };
    const schema = z.object({
        orderStatus: z.string().nonempty({ message: "برجاء تحديد حالة الطلب" }),
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
        handleClose();
        /*  mutate(getValues(), {
            onSuccess: () => {
                {
                    navigate("/status");
                }
            },
        }); */
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* id */}
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    تغيير الحالة الخاصــة بالطلب : {data.id}
                </DialogTitle>{" "}
                {/* close btn */}
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </div>

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
                                            error={!!errors.orderStatus}
                                            color="info"
                                            id="demo-simple-select-helper-label"
                                        >
                                            اسم الحالة
                                        </InputLabel>
                                        <Select
                                            {...register("orderStatus")}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={status}
                                            label="اسم الحالة"
                                            color="info"
                                            onChange={handelStatusChange}
                                        >
                                            {statuses.map(
                                                (status: {
                                                    id: number;
                                                    status: string;
                                                }) => (
                                                    <MenuItem
                                                        key={status.id}
                                                        value={status.id.toString()}
                                                    >
                                                        {status.status}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        <FormHelperText
                                            error={!!errors.orderStatus}
                                        >
                                            {errors?.orderStatus?.message}
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
                    </form>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeOrderStatus;
