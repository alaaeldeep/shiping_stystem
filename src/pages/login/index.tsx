/* react form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* MUI */
import { Box, Button, Typography } from "@mui/material";

/* toast */
import { toast } from "react-toastify";
/* store  */
import { useOwnStore } from "../../store";

/* components */
import InputField from "../../components/inputFields/textInputField/inputfield";

const Login = () => {
    const mode = useOwnStore((store) => store.mode);
    /*  */
    const schema = z.object({
        userName: z
            .string()
            .nonempty(" برجاء كتابة البريد الالكتروني او اسم المستخدم"),

        password: z
            .string()
            .nonempty("برجاء كتابة كلمة السر")
            .min(8, "برجاء كتابه كلمه سر 8 احرف علي الاقل"),
    });

    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState } = useForm<FormValue>({
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;

    /*🚀 make the request 🚀*/
    const onSubmit = (data: FormValue) => {
        console.log(data);
        /* mutate data & on Success show toast succsess and redirect to home*/
    };
    const onError = () => {
        toast.error("برجاء ادخال التاكد من صحة البيانات والمحاولة مره اخرة", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000,
        });
        /* mutate data & on Success show toast succsess and redirect to home*/
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "6rem",
                }}
                noValidate
            >
                <Box
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                        backgroundColor: "secondary.main",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "40px",
                        alignItems: "center",
                        width: { xs: "80%", md: "60%" },
                        height: "100%",
                        padding: "50px 30px",
                        borderRadius: "15px",
                    }}
                >
                    <Box>
                        {mode === "dark" ? (
                            <img
                                src="../../../logo.dark.png"
                                style={{
                                    height: "5rem",
                                }}
                            />
                        ) : (
                            <img
                                src="../../../logo.light.webp"
                                style={{
                                    height: "5rem",
                                }}
                            />
                        )}
                    </Box>
                    <Typography
                        variant="h3"
                        fontSize={{ xs: "20px", sm: "25px", md: "40px" }}
                        textAlign="center"
                        fontFamily={"sans-serif"}
                        fontWeight={"bold"}
                    >
                        بايونيرز للحلول البرمجية
                    </Typography>
                    {/*  */}
                    <InputField
                        register={register}
                        errors={errors.userName}
                        fieldName="userName"
                        label="البريد الالكتروني"
                        largeWidth="90%"
                        smallWidth="90%"
                    />
                    <InputField
                        register={register}
                        errors={errors.password}
                        fieldName="password"
                        label="كلمة السر"
                        largeWidth="90%"
                        smallWidth="90%"
                    />

                    <Button
                        type="submit"
                        sx={{
                            width: { xs: "100%", md: "70%" },
                            height: "40px",
                            fontWeight: "bold",
                        }}
                        variant="contained"
                    >
                        تسجيل
                    </Button>
                </Box>
                <DevTool control={control} />
            </form>
        </>
    );
};

export default Login;
