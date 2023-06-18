/* MUI */
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
    useMediaQuery,
    FormHelperText,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    Toolbar,
    Typography,
    OutlinedInput,
} from "@mui/material"; /* rect-form */
import CloseIcon from "@mui/icons-material/Close";

/* hook form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../../hooks/branches/useEditMutate";

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";
import { useNavigate } from "react-router";

/* types */
import { WeightSettingRow } from "../../../../components/types";
import { toast } from "react-toastify";

type EditWeightSettingProps = {
    open: boolean;
    data: WeightSettingRow;
    handleClose: () => void;
};
const EditWeightSetting = ({
    data,
    open,
    handleClose,
}: EditWeightSettingProps) => {
    const navigate = useNavigate();
    const { mutate } = UseMutate();

    /* zod validation */
    const schema = z.object({
        /* step 3 */
        defaultWeight: z.preprocess(
            (a) => parseInt(z.string().parse(a)),
            z
                .number({
                    required_error: "برجاء ادخال تكلفة الشحن الافتراضية",
                    invalid_type_error:
                        "برجاء ادخال تكلفة الشحن الافتراضية مثال : 10",
                })
                .nonnegative("برجاء ادخال قيمة اكبر من -1   ")
        ),
        overCostPerKG: z.preprocess(
            (a) => parseInt(z.string().parse(a)),
            z
                .number({
                    required_error:
                        "  برجاء ادخال سعر كل كجــم اضافي علي الوزن",
                    invalid_type_error:
                        "  برجاء ادخال سعر كل كجــم اضافي علي الوزن مثال :10",
                })
                .nonnegative("برجاء ادخال قيمة اكبر من -1   ")
        ),
        villageShipingCost: z.preprocess(
            (a) => parseInt(z.string().parse(a)),
            z
                .number({
                    required_error: "برجاء ادخال تكلفه الشحن للقــري",
                    invalid_type_error:
                        "برجاء ادخال تكلفه الشحن للقــري مثال : 10",
                })
                .nonnegative("برجاء ادخال قيمة اكبر من -1   ")
        ),
        /*   defaultWeight: z
            .string()
            .nonempty("برجاء ادخال تكلفة الشحن الافتراضية"),
        overCostPerKG: z
            .string()
            .nonempty("  برجاء ادخال سعر كل كجــم اضافي علي الوزن"),
        villageShipingCost: z
            .string()
            .nonempty("برجاء ادخال تكلفه الشحن للقــري"), */
    });

    /*          */
    type FormValue = z.infer<typeof schema>;
    /* hooks form */
    const { register, control, formState, handleSubmit } = useForm<FormValue>({
        defaultValues: {
            defaultWeight: data.defaultWeight + "",
            overCostPerKG: data.overCostPerKG + "",
            villageShipingCost: data.villageShipingCost + "",
        },
        mode: "onTouched",
        resolver: zodResolver(schema),
    });

    const { errors } = formState;

    const onSubmit = (requestData: FormValue) => {
        console.log({ ...requestData, is: data.id });
        handleClose();
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
            maxWidth={"lg"}
            open={open}
            onClose={handleClose}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    تعــديــل اعدادات الوزن
                </DialogTitle>
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
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
                            /*       padding: "10px 0px", */
                            /*        borderRadius: "25px", */
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            mb: 3,

                            padding: "20px",
                            borderRadius: "25px",
                            boxShadow:
                                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                        }}
                    >
                        <Box sx={{ marginX: "auto", width: "90%" }}>
                            {/* default Weight */}
                            <div style={{ margin: "20px 0" }}>
                                <InputField
                                    register={register}
                                    errors={errors.defaultWeight}
                                    fieldName="defaultWeight"
                                    label="وزن الشحن الافتراضية يبدء من صفر كـجم الي : "
                                    /*    label="تكلفة الشحن الافتراضية تبدء من صفر كـجم الي : " */
                                    largeWidth="90%"
                                    smallWidth="90%"
                                />
                            </div>
                            {/* default Weight */}
                            <div style={{ margin: "20px 0" }}>
                                <InputField
                                    register={register}
                                    errors={errors.overCostPerKG}
                                    fieldName="overCostPerKG"
                                    label="سعر كل كـجم اضافي  : "
                                    largeWidth="90%"
                                    smallWidth="90%"
                                />
                            </div>
                            {/* default Weight */}
                            <div style={{ margin: "20px 0" }}>
                                <InputField
                                    register={register}
                                    errors={errors.villageShipingCost}
                                    fieldName="villageShipingCost"
                                    label="تكلفة  الشحن للقري  : "
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
                    <DevTool control={control} />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditWeightSetting;
