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
    OutlinedInput,
    InputLabel,
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
import UseMutate from "../../../../hooks/branches/useEditMutate";

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";

type EditBrancheProps = {
    open: boolean;
    branch: string;
    id: number;
    status: boolean;
    pageNumber: number;
    handleClose: () => void;
};
const EditBranchesDetails = ({
    open,
    handleClose,
    branch,
    status,
    id,
    pageNumber,
}: EditBrancheProps) => {
    const { mutate, isLoading } = UseMutate();
    const schema = z.object({
        name: z.string().nonempty(" برجاء كتابة اسم الفرع"),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState, setError } =
        useForm<FormValue>({
            /* defaultValues: {
            name: branch,
        }, */
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    /*   🚀 make the request 🚀 */
    const onSubmit = (data: FormValue) => {
        const requestData = { name: data.name, status, id };

        mutate(requestData, {
            onSuccess: () => {
                {
                    handleClose();
                }
            },
            onError: (err: any) => {
                setError("name", {
                    message: "  هذا الفرع موجود بالفعل",
                });
                toast.error("هذا الفرع موجود بالفعل", {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000,
                    theme: "dark",
                });
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
                    تعــديــل بيانات الخاصــة بفرع : {branch}
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
                        <Box sx={{ marginX: "auto", width: "90%" }}>
                            <div style={{ margin: "20px 0" }}>
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
                                        اسم الفرع
                                    </InputLabel>
                                    <OutlinedInput
                                        /*   defaultValue={branch} */
                                        {...register("name")}
                                        color="info"
                                        id={`outlined-adornment-name`}
                                        type={"text"}
                                        label={"اسم الفرع"}
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
                    {/* <DevTool control={control} /> */}
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

export default EditBranchesDetails;
