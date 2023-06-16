/* MUI */
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
} from "@mui/material";
import { FormHelperText, TextField, Autocomplete } from "@mui/material";
/* rect-form */
import CloseIcon from "@mui/icons-material/Close";

/* hook form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../../hooks/states/useEditMutate";

/* toast */
import { toast } from "react-toastify";

/* utils */
import { states } from "../../../../utils/converter";

type EditStatesProps = {
    open: boolean;
    state: string;
    id: number;
    handleClose: () => void;
};
const EditStatesDetails = ({
    open,
    handleClose,
    id,
    state,
}: EditStatesProps) => {
    const { mutate } = UseMutate();
    const schema = z.object({
        state: z.enum(
            [
                "أسوان",
                "أسيوط",
                "الإسكندرية",
                "الإسماعيلية",
                "الإسماعيلية",
                "الأقصر",
                "البحر الاحمر",
                "البحيرة",
                "الجيزة",
                "الدقهلية",
                "السويس",
                "الشرقية",
                "الغربية",
                "الفيوم",
                "القاهرة",
                "القليوبية",
                "المنوفية",
                "المنيا",
                "الوادي الجديد",
                "بني سويف",
                "بور سعيد",
                "جنوب سيناء",
                "دمياط",
                "سوهاج",
                "شمال سيناء",
                "قنا",
                "كفر الشيخ",
                "مطروح",
            ],
            {
                errorMap: (issue, _ctx) => {
                    switch (issue.code) {
                        default:
                            return { message: " برجاء اختيار المحافظة" };
                    }
                },
            }
        ),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState, getValues } =
        useForm<FormValue>({
            mode: "onChange",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    /* 🚀 make the request 🚀  */
    const onSubmit = (data: FormValue) => {
        mutate(
            { id, ...data },
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
        toast.warn("برجاء اختيار  محافظة   من الخيارات المتاحة", {
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* <DialogTitle>
                    تعــديــل البيانات الخاصــة بمحافظة : {state}
                </DialogTitle> */}
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    تعــديــل البيانات الخاصــة بمحافظــة : {state}
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
                                    defaultValue={state}
                                    id="state"
                                    noOptionsText="اختر من المحافظات المتاحة"
                                    disablePortal
                                    options={states.map((state) => state)}
                                    renderInput={(params) => (
                                        <>
                                            <TextField
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

export default EditStatesDetails;
