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
    TextField,
    Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* rect-form */

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

/* utils */
import { convertStateToID, states } from "../../../../utils/converter";

/* toast */
import { toast } from "react-toastify";
import { useState } from "react";

type EditCityProps = {
    open: boolean;
    state: string;
    id: number;
    city: string;
    shippingCost: number;
    handleClose: () => void;
};
const EditCityDetails = ({
    open,
    handleClose,
    id,
    state,
    city,
    shippingCost,
}: EditCityProps) => {
    const { data: availableStates } = UseQuery("/states");
    const { mutate } = UseMutate();

    const [selectedState, setSelectedState] = useState<string | null>(state);
    const handelStateChange = (value: string | null) => {
        setSelectedState(value);
    };

    const schema = z.object({
        state: z.string().nonempty(" برجاء كتابة اسم المحافظه"),
        city: z.string().nonempty(" برجاء كتابة اسم المدينة"),
        shippingCost: z.preprocess(
            (a) => parseInt(z.string().parse(a)),
            z
                .number({
                    required_error: "برجاء ادخال قيمة الشحن ",
                    invalid_type_error:
                        "برجاء ادخال قيمة الشحن رقمية, مثال:25,60",
                })
                .positive("برجاء ادخال قيمة اكبر من 0")
        ),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState, getValues, setError } =
        useForm<FormValue>({
            defaultValues: { state: availableStates, city, shippingCost },
            mode: "onChange",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    /* 🚀 make the request 🚀  */
    const onSubmit = (data: FormValue) => {
        if (states.includes(getValues("state"))) {
            mutate(
                {
                    name: data.city,
                    shippingCost: data.shippingCost,
                    stateId: convertStateToID(availableStates, data.state),
                    id: id,
                },
                {
                    onSuccess: () => {
                        {
                            handleClose();
                        }
                    },
                }
            );
        } else {
            setError("state", {
                message: "برجاء اختيار محافظه من الخيارات المتاحة ",
            });
            toast.warn("برجاء اختيار محافظه من الخيارات المتاحة ", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000,
                theme: "dark",
            });
        }
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
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                        تعــديــل البيانات الخاصــة بمدينة : {state}
                    </DialogTitle>
                    <DialogActions>
                        <IconButton onClick={handleClose}>
                            <CloseIcon
                                sx={{ color: "red", fontSize: "1.7rem" }}
                            />
                        </IconButton>
                    </DialogActions>
                </div>

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
                                    <Autocomplete
                                        value={selectedState}
                                        onChange={(_e, value) =>
                                            handelStateChange(value)
                                        }
                                        noOptionsText="هذه المحافظة غير متاحه حاليا"
                                        id="state"
                                        disablePortal
                                        options={availableStates?.data.map(
                                            (option: {
                                                id: number;
                                                name: string;
                                            }) => option.name
                                        )}
                                        renderInput={(params) => (
                                            <>
                                                <TextField
                                                    defaultValue={state}
                                                    color="info"
                                                    {...register("state")}
                                                    error={!!errors.state}
                                                    sx={{
                                                        width: "90%",
                                                    }}
                                                    {...params}
                                                    label="اسم المحافظة"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        type: "text",
                                                    }}
                                                />
                                                <FormHelperText
                                                    error={!!errors.state}
                                                    sx={{
                                                        fontWeight: "bold",
                                                        letterSpacing: "0.1rem",
                                                    }}
                                                    id="component-helper-text"
                                                >
                                                    {errors?.state?.message}
                                                </FormHelperText>
                                            </>
                                        )}
                                    />
                                </div>
                                <div style={{ margin: "20px 0" }}>
                                    <InputField
                                        register={register}
                                        errors={errors.city}
                                        fieldName="city"
                                        label=" اسم المدينة "
                                        largeWidth="90%"
                                        smallWidth="90%"
                                    />
                                </div>
                                <div style={{ margin: "20px 0" }}>
                                    <InputField
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
                                اضافة
                            </Button>
                        </Box>
                        <DevTool control={control} />
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditCityDetails;
