/* mui */
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* hooks form */
import { useForm } from "react-hook-form";

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";
import { SpecialPackage } from "./form3";
import { DevTool } from "@hookform/devtools";

/* modal props */
type ModalProps = {
    open: boolean;
    handleClose: () => void;
    handleAddSpecialPackage: (newPackage: SpecialPackage) => void;
};
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "25px",
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal({
    open,
    handleClose,
    handleAddSpecialPackage,
}: ModalProps) {
    const schema = z.object({
        /*  branch: z.string().nonempty("برجاء اختيار الفرع"), */
        state: z.string().nonempty("برجاء اختيار المحافظه"),
        city: z.string().nonempty("برجاء اختيار المدينه"),
        shippingCost: z.string().nonempty("برجاء ادخال تكلفه الشحن"),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState, reset } =
        useForm<FormValue>({
            defaultValues: { state: "", city: "", shippingCost: "" },
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;
    const modalSubmit = (data: FormValue) => {
        if (formState.isValid) {
            resetForm();
            handleAddSpecialPackage(data);
            handleClose();
        }
    };
    const resetForm = () => {
        reset();
    };
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            اضافه باقه مميزه
                        </Typography>
                        <form onSubmit={handleSubmit(modalSubmit)} noValidate>
                            <div style={{ margin: "20px 0" }}>
                                <div style={{ margin: "20px 0" }}>
                                    <InputField
                                        register={register}
                                        errors={errors.state}
                                        fieldName="state"
                                        label="اسم المحافظه"
                                        largeWidth="100%"
                                        smallWidth="100%"
                                    />
                                </div>
                                <div style={{ margin: "20px 0" }}>
                                    <InputField
                                        register={register}
                                        errors={errors.city}
                                        fieldName="city"
                                        label="المدينه "
                                        largeWidth="100%"
                                        smallWidth="100%"
                                    />
                                </div>
                                <div style={{ margin: "20px 0" }}>
                                    <InputField
                                        register={register}
                                        errors={errors.shippingCost}
                                        fieldName="shippingCost"
                                        label="سعر الشحن"
                                        largeWidth="100%"
                                        smallWidth="100%"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    sx={{
                                        width: "100%",
                                        marginX: "auto",
                                        height: "40px",
                                        fontWeight: "bold",
                                    }}
                                    variant="contained"
                                >
                                    اضافة
                                </Button>
                            </div>{" "}
                            <DevTool control={control} />
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
