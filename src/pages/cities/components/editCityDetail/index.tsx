/* MUI */
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
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

/* hook form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../../hooks/cities/useEditMutate";
import UseQuery from "../../../../hooks/serverState/useQuery";

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";

/* toast */
import { toast } from "react-toastify";

/* react staff */
import { useState } from "react";

/* types */
import { CityRow } from "../../../../components/types";
import NumericInputField from "../../../../components/inputFields/numericInputField";

type EditCityProps = {
    open: boolean;
    data: CityRow;
    handleClose: () => void;
};
const EditCityDetails = ({ open, handleClose, data }: EditCityProps) => {
    const { data: availableStates } = UseQuery("/states/active");
    const { mutate, isLoading } = UseMutate();

    /* states */
    const [state, setState] = useState<string>(data.state.id + "");
    const handelStateChange = (event: SelectChangeEvent) => {
        setState(event.target.value as string);
    };

    const schema = z.object({
        stateId: z.string().nonempty(" برجاء كتابة اسم المحافظه"),
        name: z.string().nonempty(" برجاء كتابة اسم المدينة"),

        shippingCost: z.string().nonempty(" برجاء ادخال قيمة الشحن"),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState, getValues, setError } =
        useForm<FormValue>({
            defaultValues: {
                stateId: data.state.id + "",
                name: data.name,
                shippingCost: data.shippingCost + "",
            },
            mode: "onChange",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    /* 🚀 make the request 🚀  */
    const onSubmit = (requestDate: FormValue) => {
        mutate(
            {
                name: requestDate.name,
                shippingCost: Math.abs(+requestDate.shippingCost),
                stateId: +state,
                id: data.id,
                status: data.status,
            },
            {
                onSuccess: () => {
                    {
                        handleClose();
                    }
                },
                onError: (err: any) => {
                    if (err.message.includes("already existed")) {
                        setError("name", {
                            message: "  هذه المدينة موجوده بالفعل",
                        });
                        toast.error("هذه المدينة موجوده بالفعل", {
                            position: toast.POSITION.BOTTOM_LEFT,
                            autoClose: 2000,
                            theme: "dark",
                        });
                    }
                },
            }
        );
    };
    const onError = () => {
        toast.warn("برجاء اكمال الحقول الفارغة ", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000,
            theme: "dark",
        });
    };
    return (
        <>
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
                        تعــديــل البيانات الخاصــة بمدينة : {data.name}
                    </DialogTitle>
                    <DialogActions>
                        <IconButton onClick={handleClose}>
                            <CloseIcon
                                sx={{ color: "red", fontSize: "1.7rem" }}
                            />
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
                                {/* state name */}
                                <div style={{ margin: "20px 0" }}>
                                    <FormControl
                                        sx={{
                                            width: "90%",
                                        }}
                                    >
                                        <InputLabel
                                            error={!!errors.stateId}
                                            color="info"
                                            id="demo-simple-select-helper-label"
                                        >
                                            اسم المحافظة
                                        </InputLabel>
                                        <Select
                                            {...register("stateId")}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={state}
                                            label="اسم المحافظة"
                                            color="info"
                                            onChange={handelStateChange}
                                        >
                                            {availableStates?.data.map(
                                                (state: {
                                                    id: number;
                                                    name: string;
                                                }) => (
                                                    <MenuItem
                                                        key={state.id}
                                                        value={state.id.toString()}
                                                    >
                                                        {state.name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        <FormHelperText
                                            error={!!errors.stateId}
                                        >
                                            {errors?.stateId?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </div>

                                {/* city */}
                                <div style={{ margin: "20px 0" }}>
                                    <InputField
                                        register={register}
                                        errors={errors.name}
                                        fieldName="name"
                                        label=" اسم المدينة "
                                        largeWidth="90%"
                                        smallWidth="90%"
                                    />
                                </div>

                                {/* shipping Cost */}
                                <div style={{ margin: "20px 0" }}>
                                    <NumericInputField
                                        register={register}
                                        errors={errors.shippingCost}
                                        fieldName="shippingCost"
                                        label="تكلفة الشحن العادية"
                                        largeWidth="90%"
                                        smallWidth="90%"
                                    />
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
                    </form>
                </DialogContent>
            </Dialog>{" "}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default EditCityDetails;
