/* react router */
import { useNavigate } from "react-router";

/* MUI */
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../hooks/shippingSetting/useAddMutate";

/* components */
import InputField from "../../../components/inputFields/textInputField/inputfield";
import { TableToolbar } from "../../../components/table/tableToolBar";
import NumericInputField from "../../../components/inputFields/numericInputField";

/* toast */
import { toast } from "react-toastify";

/* store */
import { useOwnStore } from "../../../store";

const AddShippingType = () => {
    const canActivateSettingsAdd = useOwnStore(
        (store) => store.user.permissions?.Settings?.[0]
    );
    const canActivateSettingsView = useOwnStore(
        (store) => store.user.permissions?.Settings?.[1]
    );

    const navigate = useNavigate();
    const { mutate, isLoading } = UseMutate();

    const schema = z.object({
        name: z.string().nonempty(" برجاء كتابة نوع الشحن"),
        cost: z.string().nonempty(" برجاء كتابة تكلفة الشحن"),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState, setError } =
        useForm<FormValue>({
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    /*  🚀 make the request 🚀  */
    const onSubmit = (data: FormValue) => {
        const requestData = { ...data, cost: Math.abs(+data.cost) };

        mutate(requestData, {
            onSuccess: () => {
                {
                    navigate("/shippingType");
                }
            },
            onError: () => {
                toast.warn("هذا النوع موجود بالفعل", {
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
        <>
            <TableToolbar
                pageName="أنواع الشحن"
                btnTitle="العودة لأنواع الشحن"
                destination="/shippingType  "
                addIcon={false}
                addBtn={!!canActivateSettingsAdd && !!canActivateSettingsView}
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
                        {/* shipping type */}
                        <div style={{ margin: "20px 0" }}>
                            <InputField
                                register={register}
                                errors={errors.name}
                                fieldName="name"
                                label="نوع الشحن"
                                largeWidth="90%"
                                smallWidth="90%"
                            />
                        </div>{" "}
                        {/* shipping cost */}
                        <div
                            style={{
                                margin: "20px 0",
                            }}
                        >
                            <NumericInputField
                                register={register}
                                errors={errors.cost}
                                fieldName="cost"
                                label="تكلفة الشحن"
                                largeWidth="90%"
                                smallWidth="90%"
                            />{" "}
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
              {/*   <DevTool control={control} /> */}
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
        </>
    );
};

export default AddShippingType;
