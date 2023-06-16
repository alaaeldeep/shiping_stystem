/* react router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Box,
    Button,
    FormHelperText,
    TextField,
    Autocomplete,
} from "@mui/material";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../hooks/states/useAddMutate";

/* toast */
import { toast } from "react-toastify";

/* components */
import { TableToolbar } from "../../../components/table/tableToolBar";

/* utils */
import { states } from "../../../utils/converter";

const AddStatesPage = () => {
    const navigate = useNavigate();
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
    const onSubmit = () => {
        mutate(getValues(), {
            onSuccess: () => {
                {
                    navigate("/states");
                }
            },
        });
    };
    const onError = () => {
        toast.warn("برجاء اختيار  محافظة   من الخيارات المتاحة", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000,
            theme: "dark",
        });
    };

    return (
        <>
            <TableToolbar
                pageName="المحافظات"
                btnTitle="العودة للمحافظات"
                destination="/states  "
                addIcon={false}
            />{" "}
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
                        اضافة
                    </Button>
                </Box>
                <DevTool control={control} />
            </form>
        </>
    );
};

export default AddStatesPage;