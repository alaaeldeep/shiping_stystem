/* react router */
import { useNavigate } from "react-router";

/* react form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseLogin from "../../hooks/auth/useAddMutate";

/* MUI */
import { Box, Button, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
/* motion */
import { motion } from "framer-motion";

/* toast */
import { toast } from "react-toastify";

/* store  */
import { useOwnStore } from "../../store";

/* components */
import InputField from "../../components/inputFields/textInputField/inputfield";

const Login = () => {
    /* store */
    const mode = useOwnStore((store) => store.mode);
    const user = useOwnStore((store) => store.login);

    /* api */
    const { mutate, isError, isLoading } = UseLogin();

    /* router */
    const navigate = useNavigate();

    const schema = z.object({
        userName: z
            .string()
            .nonempty(" برجاء كتابة البريد الالكتروني او اسم المستخدم")
            .min(5, {
                message: " برجاء كتابة بريد الكتروني صالح او اسم المستخدم صالح",
            })
            .refine(
                (value) => /^\S*$/.test(value),
                " برجاء كتابة بريد الكتروني صالح او اسم المستخدم صالح"
            ),

        password: z.string().nonempty("برجاء كتابة كلمة السر"),
        /*  .min(8, "برجاء كتابه كلمه سر 8 احرف علي الاقل"), */
    });

    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState, setError } =
        useForm<FormValue>({
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    /*🚀 make the request 🚀*/
    const onSubmit = (data: FormValue) => {
        mutate(data, {
            onSuccess: (res) => {
                user(res.data);
                navigate("/");
            },
            onError: (err) => {
                setError("password", {});
                setError("userName", {});
                toast.error(
                    "البريد الالكتروني او كلمة السر خطا برجاء التاكد من صحة البيانات والمحاولة مره اخري",
                    {
                        position: toast.POSITION.BOTTOM_LEFT,
                        autoClose: 2000,
                    }
                );
            },
        });
        /* mutate data & on Success show toast succsess and redirect to home*/
    };
    const onError = () => {
        toast.warn("برجاء  التاكد من صحة البيانات والمحاولة مره اخرة", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000,
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ x: 0, scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.3,
                    }}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "6rem",
                    }}
                >
                    {" "}
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
                            boxShadow:
                                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                        }}
                    >
                        <Box>
                            {mode === "dark" ? (
                                <img
                                    src="../../../logo.dark.png"
                                    style={{
                                        height: "5rem",
                                    }}
                                    alt="iti logo in dark mode"
                                />
                            ) : (
                                <img
                                    src="../../../logo.light.webp"
                                    style={{
                                        height: "5rem",
                                    }}
                                    alt="iti logo in light mode"
                                />
                            )}
                        </Box>
                        <Typography
                            variant="h3"
                            fontSize={{ xs: "20px", sm: "25px", md: "40px" }}
                            textAlign="center"
                            /*   fontFamily={"Alexandria"} */
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
                                /*    fontFamily: "Alexandria", */
                            }}
                            variant="contained"
                        >
                            تسجيل الدخول
                        </Button>
                    </Box>
                </motion.div>{" "}
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
        </>
    );
};

export default Login;
export const Router = () => {
    return true;
};
