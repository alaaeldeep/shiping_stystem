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
} from "@mui/material"; /* rect-form */
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
import UseMutate from "../../../../hooks/weightSetting/useEditMutate";

/* components */
import NumericInputField from "../../../../components/inputFields/numericInputField";

/* toast */
import { toast } from "react-toastify";

/* types */
import { WeightSettingRow } from "../../../../components/types";

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
    const { mutate, isLoading } = UseMutate();

    /* zod validation */
    const schema = z.object({
        /* step 3 */
        defaultWeight: z
            .string()
            .nonempty("برجاء ادخال تكلفة الشحن الافتراضية"),
        overCostPerKG: z
            .string()
            .nonempty("  برجاء ادخال سعر كل كجــم اضافي علي الوزن"),
        villageShipingCost: z
            .string()
            .nonempty("برجاء ادخال تكلفه الشحن للقــري"),
    });

    type FormValue = z.infer<typeof schema>;
    /* hooks form */
    const { register, control, formState, handleSubmit } = useForm<FormValue>({
        defaultValues: {
            defaultWeight: data.defaultWeight + "",
            overCostPerKG: data.overCostPerKG + "",
            villageShipingCost: data.villageShipingCost + "",
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const { errors } = formState;

    const onSubmit = (requestData: FormValue) => {
        const newSetting = {
            defaultWeight: Math.abs(+requestData.defaultWeight),
            overCostPerKG: Math.abs(+requestData.overCostPerKG),
            villageShipingCost: Math.abs(+requestData.villageShipingCost),
            id: data.id,
        };
        mutate(newSetting, {
            onSuccess: () => {
                handleClose();
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
            maxWidth={"lg"}
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
                    تعــديــل اعدادات الوزن
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
                                <NumericInputField
                                    register={register}
                                    errors={errors.defaultWeight}
                                    fieldName="defaultWeight"
                                    label="وزن الشحن الافتراضية يبدء من صفر كـجم الي : "
                                    largeWidth="100%"
                                    smallWidth="100%"
                                />
                            </div>
                            {/* over Cost PerKG */}
                            <div style={{ margin: "20px 0" }}>
                                <NumericInputField
                                    register={register}
                                    errors={errors.overCostPerKG}
                                    fieldName="overCostPerKG"
                                    label="سعر كل كـجم اضافي  : "
                                    largeWidth="100%"
                                    smallWidth="100%"
                                />
                            </div>
                            {/* village ShipingCost */}
                            <div style={{ margin: "20px 0" }}>
                                <NumericInputField
                                    register={register}
                                    errors={errors.villageShipingCost}
                                    fieldName="villageShipingCost"
                                    label="تكلفة  الشحن للقري  : "
                                    largeWidth="100%"
                                    smallWidth="100%"
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
            </DialogContent>{" "}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Dialog>
    );
};

export default EditWeightSetting;
