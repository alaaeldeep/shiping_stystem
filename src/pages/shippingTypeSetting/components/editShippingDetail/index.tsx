/* MUI */
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
    Backdrop,
    CircularProgress,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
} from "@mui/material"; /* rect-form */
import CloseIcon from "@mui/icons-material/Close";

/* toast */
import { toast } from "react-toastify";

/* motion */
import { motion } from "framer-motion";

/* hook form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../../hooks/shippingSetting/useEditMutate";

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";
import NumericInputField from "../../../../components/inputFields/numericInputField";

type EditShippingTypeProps = {
    open: boolean;
    name: string;
    cost: number;
    id: number;

    handleClose: () => void;
};
const EditShippingTypeDetails = ({
    open,
    handleClose,
    name,
    id,
    cost,
}: EditShippingTypeProps) => {
    const { mutate, isLoading } = UseMutate();
    const schema = z.object({
        name: z.string().nonempty(" برجاء كتابة نوع الشحن"),
        cost: z.string().nonempty(" برجاء كتابة تكلفة الشحن"),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState } = useForm<FormValue>({
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;
    /*   🚀 make the request 🚀 */
    const onSubmit = (data: FormValue) => {
        const requestData = { name: data.name, cost: Math.abs(+data.cost), id };

        mutate(requestData, {
            onSuccess: () => {
                {
                    handleClose();
                }
            },
        });
    };
    const onError = () => {
        toast.warn("برجاء اكمال الحقول الفارغة ", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000,
            theme: "dark",
        });
    };
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
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    تعــديــل بيانات الخاصــة بنوع شحن : {name}
                </DialogTitle>
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </motion.div>

            <DialogContent>
                <form
                    onSubmit={handleSubmit(onSubmit, onError)}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                    noValidate
                >
                    <Box
                        sx={{
                            width: "100%",
                            padding: "10px 0px",
                            borderRadius: "25px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            mb: 3,
                        }}
                    >
                        <Box sx={{ marginX: "auto", width: "90%" }}>
                            {/* shipping type */}

                            <div
                                style={{
                                    margin: "20px 0",
                                }}
                            >
                                <FormControl
                                    error={!!errors.name}
                                    fullWidth
                                    sx={{ width: { xs: "90%", md: "90%" } }}
                                    variant="outlined"
                                >
                                    <InputLabel
                                        color="info"
                                        htmlFor="outlined-adornment-password"
                                    >
                                        نوع الشحن
                                    </InputLabel>
                                    <OutlinedInput
                                        defaultValue={name}
                                        {...register("name")}
                                        color="info"
                                        id={`outlined-adornment-name`}
                                        type={"text"}
                                        label={"نوع الشحن"}
                                    />
                                    <FormHelperText
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: "0.1rem",
                                        }}
                                        id="component-helper-text"
                                    >
                                        {errors.name?.message}
                                    </FormHelperText>
                                </FormControl>
                            </div>

                            {/* shipping cost */}
                            <div
                                style={{
                                    margin: "20px 0",
                                }}
                            >
                                <FormControl
                                    error={!!errors.cost}
                                    fullWidth
                                    sx={{
                                        width: {
                                            xs: "90%",
                                            md: "90%",
                                        },
                                    }}
                                    variant="outlined"
                                >
                                    <InputLabel
                                        color="info"
                                        htmlFor="outlined-adornment-password"
                                    >
                                        تكلفة الشحن
                                    </InputLabel>
                                    <OutlinedInput
                                        defaultValue={cost}
                                        {...register("cost")}
                                        color="info"
                                        id={`outlined-adornment-${"cost"}`}
                                        type={"number"}
                                        label="تكلفة الشحن"
                                    />
                                    <FormHelperText
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: "0.1rem",
                                        }}
                                        id="component-helper-text"
                                    >
                                        {errors?.cost?.message}
                                    </FormHelperText>
                                </FormControl>
                            </div>
                        </Box>

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
                </form>{" "}
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </DialogContent>
        </Dialog>
    );
};

export default EditShippingTypeDetails;
