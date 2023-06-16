/* react staff */
import { useRef, useState } from "react";

/* router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Box,
    Button,
    Step,
    StepLabel,
    Stepper,
    Autocomplete,
    TextField,
    FormHelperText,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* components */
import { TableToolbar } from "../../../components/table/tableToolBar";
import InputField from "../../../components/inputFields/textInputField/inputfield";
import NumericInputField from "../../../components/inputFields/numericInputField";

/* react query */
import UseQuery from "../../../hooks/serverState/useQuery";
import UseMutate from "../../../hooks/representatives/useAddMutate";

/* toast */
import { toast } from "react-toastify";

/* utils */
import { convertStateToID } from "../../../utils/converter";

/*  */
const steps = ["تسجيل البيانات الاساسيه", " حفظ ومتابعه"];

const AddRepresentativesPage = () => {
    /* fetch data */
    const { data: branches } = UseQuery("/branches");
    const { data: states } = UseQuery("/states");
    /* post data */
    const { mutate } = UseMutate();

    const navigate = useNavigate();

    /* state state */
    const selectedStates = useRef<string[]>([]);

    /* branch state */
    const [branch, setBranch] = useState<string>();
    const handelBranchChange = (event: SelectChangeEvent) => {
        setBranch(event.target.value as string);
    };

    /* steps form */
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    /* end-steps form */

    /* select input */
    const [discount, setDiscount] = useState("");
    const handleChange = (event: SelectChangeEvent) => {
        setDiscount(event.target.value);
    };
    /* zod validation */
    const schema = z.object({
        /* step 1 */
        userName: z
            .string()
            .nonempty("برجاء كتابة اسم المستخدم")
            .min(5, {
                message: "اسم المستخدم علي الاقل 5 حروف",
            })
            .refine(
                (value) => /^\S*$/.test(value),
                "غير مسموح بالمسافات الفارغة"
            ),

        fullName: z.string().nonempty("برجاء كتابة اسم المندوب بالكامل "),

        email: z
            .string()
            .nonempty("برجاء كتابة البريد الالكتروني")
            .email("برجاء كتابة بريد الالكتروني صالح"),

        password: z
            .string()
            .nonempty("برجاء كتابة كلمة السر")
            .min(8, "برجاء كتابه كلمه سر 8 احرف علي الاقل"),

        phoneNumber: z
            .string()
            .nonempty("برجاء كتابه رقم الهاتف")
            .length(11, " تاكد من كتابه رقم صحيح مكون من 11 رقم"),

        /*  address: z.any(), */
        address: z.string().nonempty("برجاء كتابة العنوان"),

        /* step 2 */
        statesId: z.string(),
        /*  state: z.string().nonempty("برجاء اختيار المحافظه"), */

        branchId: z.string().nonempty("برجاء اختيار الفرع"),

        discountType: z.enum(["0", "1"], {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    default:
                        return { message: "برجاء اختيار نوع الخصم" };
                }
            },
        }),

        companyOrderRatio: z
            .string()
            .nonempty("برجاء تحديد نسبة الشركه من الطلب"),
    });
    type FormValue = z.infer<typeof schema>;
    /* hooks form */
    const {
        register,
        control,
        handleSubmit,
        formState,
        getValues,
        getFieldState,
        setError,
    } = useForm<FormValue>({
        defaultValues: {},
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;
    /*   let statesId: number[] = []; */
    const onSubmit = (data: FormValue) => {
        if (selectedStates.current.length > 0) {
            const statesId = selectedStates.current.map((state) =>
                convertStateToID(states, state)
            );

            const requstData = {
                userName: data.userName,
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                branchId: +data.branchId,
                statesId: statesId,
                password: data.password,
                address: data.address,
                discountType: +data.discountType,
                companyOrderRatio: +data.companyOrderRatio,
            };
            /*    🚀 make the request 🚀  */

            mutate(requstData, {
                onSuccess: () => {
                    navigate("/representatives");
                },
            });
        } else {
            setError("statesId", {
                message: "برجاء اختيار المحافظه من الخيارات المتاحة",
            });
            toast.warn("برجاء اختيار المحافظه من الخيارات المتاحة", {
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
            <TableToolbar
                pageName="المنــاديب"
                btnTitle="العوده للمناديب"
                destination="/representatives"
                addIcon={false}
            />
            <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                    {/* label names */}
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};

                        return (
                            <Step
                                sx={{ paddingX: 1 }}
                                key={index}
                                {...stepProps}
                            >
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                <>
                    {/* form */}
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <Box sx={{ mt: 2, mb: 1 }}>
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
                                {/* form step 1 */}
                                {activeStep === 0 ? (
                                    <Box
                                        sx={{
                                            marginX: "auto",
                                            width: "90%",
                                        }}
                                    >
                                        {/* full name */}
                                        <div style={{ margin: "20px 0" }}>
                                            <InputField
                                                register={register}
                                                errors={errors.fullName}
                                                fieldName="fullName"
                                                label=" الاسم بالكامل  "
                                                largeWidth="90%"
                                                smallWidth="90%"
                                            />
                                        </div>
                                        {/* userName name */}
                                        <div style={{ margin: "20px 0" }}>
                                            <InputField
                                                register={register}
                                                errors={errors.userName}
                                                fieldName="userName"
                                                label="  اسم المستخدم"
                                                largeWidth="90%"
                                                smallWidth="90%"
                                            />
                                        </div>
                                        {/* email */}
                                        <div style={{ margin: "20px 0" }}>
                                            <InputField
                                                register={register}
                                                errors={errors.email}
                                                fieldName="email"
                                                label="البريد الالكتروني"
                                                largeWidth="90%"
                                                smallWidth="90%"
                                            />
                                        </div>
                                        {/* password */}
                                        <div style={{ margin: "20px 0" }}>
                                            <InputField
                                                register={register}
                                                errors={errors.password}
                                                fieldName="password"
                                                label="كلمة السر"
                                                largeWidth="90%"
                                                smallWidth="90%"
                                            />
                                        </div>
                                        {/* phone  */}
                                        <div style={{ margin: "20px 0" }}>
                                            <NumericInputField
                                                register={register}
                                                errors={errors.phoneNumber}
                                                fieldName="phoneNumber"
                                                label="رقم الهاتف"
                                                largeWidth="90%"
                                                smallWidth="90%"
                                            />
                                        </div>
                                        {/* address */}
                                        <div style={{ margin: "20px 0" }}>
                                            <InputField
                                                register={register}
                                                errors={errors.address}
                                                fieldName="address"
                                                label="العنوان"
                                                largeWidth="90%"
                                                smallWidth="90%"
                                            />
                                        </div>{" "}
                                    </Box>
                                ) : null}
                                {/* form step 2 */}
                                {activeStep === 1 ? (
                                    <Box
                                        sx={{
                                            marginX: "auto",
                                            width: "90%",
                                        }}
                                    >
                                        {/* state name */}
                                        <div style={{ margin: "20px 0" }}>
                                            <Autocomplete
                                                onChange={(
                                                    _e,
                                                    value: string[]
                                                ) =>
                                                    (selectedStates.current =
                                                        value)
                                                }
                                                noOptionsText="هذه المحافظة غير متاحه حاليا"
                                                multiple
                                                id="statesId"
                                                options={states?.data.map(
                                                    (option: {
                                                        id: number;
                                                        name: string;
                                                    }) => option.name
                                                )}
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <>
                                                        <TextField
                                                            {...params}
                                                            color="info"
                                                            {...register(
                                                                "statesId"
                                                            )}
                                                            error={
                                                                !!errors.statesId
                                                            }
                                                            sx={{
                                                                width: "90%",
                                                            }}
                                                            /*   {...params} */
                                                            label="اسم المحافظة"
                                                        />
                                                        <FormHelperText
                                                            error={
                                                                !!errors.statesId
                                                            }
                                                            sx={{
                                                                fontWeight:
                                                                    "bold",
                                                                letterSpacing:
                                                                    "0.1rem",
                                                            }}
                                                            id="component-helper-text"
                                                        >
                                                            {
                                                                errors?.statesId
                                                                    ?.message
                                                            }
                                                        </FormHelperText>
                                                    </>
                                                )}
                                            />
                                        </div>

                                        {/* branch name */}
                                        {/* <div style={{ margin: "20px 0" }}>
                                            <Autocomplete
                                                noOptionsText="هذا الفرع غير متاح حاليا"
                                                id="branch"
                                                disablePortal
                                                options={branches?.data.map(
                                                    (option: {
                                                        id: string;
                                                        branch: string;
                                                    }) => option.branch
                                                )}
                                                renderInput={(params) => (
                                                    <>
                                                        <TextField
                                                            color="info"
                                                            {...register(
                                                                "branchId"
                                                            )}
                                                            error={
                                                                !!errors.branchId
                                                            }
                                                            sx={{
                                                                width: "90%",
                                                            }}
                                                            {...params}
                                                            label="اسم الفرع"
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                type: "text",
                                                            }}
                                                        />
                                                        <FormHelperText
                                                            error={
                                                                !!errors.branchId
                                                            }
                                                            sx={{
                                                                fontWeight:
                                                                    "bold",
                                                                letterSpacing:
                                                                    "0.1rem",
                                                            }}
                                                            id="component-helper-text"
                                                        >
                                                            {
                                                                errors?.branchId
                                                                    ?.message
                                                            }
                                                        </FormHelperText>
                                                    </>
                                                )}
                                            />
                                        </div> */}
                                        {/* branch name */}
                                        <div style={{ margin: "20px 0" }}>
                                            <FormControl
                                                sx={{
                                                    width: "90%",
                                                }}
                                            >
                                                <InputLabel
                                                    error={!!errors.branchId}
                                                    color="info"
                                                    id="demo-simple-select-helper-label"
                                                >
                                                    اسم الفرع
                                                </InputLabel>
                                                <Select
                                                    {...register("branchId")}
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={branch}
                                                    label="اسم الفرع"
                                                    color="info"
                                                    onChange={
                                                        handelBranchChange
                                                    }
                                                >
                                                    {branches?.data.map(
                                                        (branch: {
                                                            id: number;
                                                            branch: string;
                                                        }) => (
                                                            <MenuItem
                                                                defaultChecked
                                                                value={branch.id.toString()}
                                                            >
                                                                {branch.branch}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                                <FormHelperText
                                                    error={!!errors.branchId}
                                                >
                                                    {errors?.branchId?.message}
                                                </FormHelperText>
                                            </FormControl>
                                        </div>

                                        {/* discountType */}
                                        <div style={{ margin: "20px 0" }}>
                                            {" "}
                                            <FormControl
                                                sx={{
                                                    width: "90%",
                                                }}
                                            >
                                                <InputLabel
                                                    error={
                                                        !!errors.discountType
                                                    }
                                                    color="info"
                                                    id="demo-simple-select-helper-label"
                                                >
                                                    نوع الخصم
                                                </InputLabel>
                                                <Select
                                                    {...register(
                                                        "discountType"
                                                    )}
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={discount}
                                                    label="نوع الخصم"
                                                    color="info"
                                                    onChange={handleChange}
                                                >
                                                    {/*  <MenuItem value=""></MenuItem> */}
                                                    <MenuItem value={"0"}>
                                                        رقم ثابــت
                                                    </MenuItem>
                                                    <MenuItem value={"1"}>
                                                        نسبــة مئــوية
                                                    </MenuItem>
                                                </Select>
                                                <FormHelperText
                                                    error={
                                                        !!errors.discountType
                                                    }
                                                >
                                                    {
                                                        errors?.discountType
                                                            ?.message
                                                    }
                                                </FormHelperText>
                                            </FormControl>
                                        </div>

                                        {/* companyOrderRatio */}
                                        <div style={{ margin: "20px 0" }}>
                                            <NumericInputField
                                                register={register}
                                                errors={
                                                    errors.companyOrderRatio
                                                }
                                                fieldName="companyOrderRatio"
                                                label="نسبة الشركة من الطلب "
                                                largeWidth="90%"
                                                smallWidth="90%"
                                            />
                                        </div>
                                    </Box>
                                ) : null}{" "}
                            </Box>
                        </Box>
                        {/* btns to swap forms */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 2,
                            }}
                        >
                            {activeStep !== 0 && (
                                <Button
                                    color="inherit"
                                    onClick={handleBack}
                                    sx={{ m: 2 }}
                                >
                                    العودة للخلف
                                </Button>
                            )}

                            <Box sx={{ flex: "1 1 auto" }} />

                            {activeStep !== 1 && (
                                <Button
                                    color="inherit"
                                    onClick={handleNext}
                                    sx={{ m: 2 }}
                                >
                                    استمرار
                                </Button>
                            )}
                            {activeStep === 1 && (
                                <Button
                                    color="inherit"
                                    type="submit"
                                    sx={{ m: 2 }}
                                >
                                    حفظ ومتابعه
                                </Button>
                            )}
                        </Box>
                        <DevTool control={control} />
                    </form>
                </>
            </Box>
        </>
    );
};

export default AddRepresentativesPage;
