/* MUI */
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
    Button,
    Step,
    StepLabel,
    Stepper,
    Stack,
    Autocomplete,
    TextField,
    FormHelperText,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";

/* react staff */
import { SyntheticEvent, useRef, useState } from "react";

/* router */
import { useNavigate } from "react-router";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";
import NumericInputField from "../../../../components/inputFields/numericInputField";

/* react query */
import UseQuery from "../../../../hooks/serverState/useQuery";

/* types */
import { RepresentativeRow } from "../../../../components/types";
import UseMutate from "../../../../hooks/representatives/useEditMutate";
/*import UseMutate from "../../../hooks/representatives/useAddMutate"; */

const steps = ["تسجيل البيانات الاساسيه", " حفظ ومتابعه"];

type prop = {
    open: boolean;
    data: RepresentativeRow;
    handleClose: () => void;
};
const EditRepresentativeDetail = ({ open, handleClose, data }: prop) => {
    const selectedStates = useRef<string[]>(
        data.states.map((state) => state.state)
    );
    /* fetch data */
    const { data: branches } = UseQuery("/branches");
    const { data: states } = UseQuery("/states");

    const navigate = useNavigate();

    /* post data */
    const { mutate } = UseMutate();
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
    const [discount, setDiscount] = useState(data.discountType);
    const handleChange = (event: SelectChangeEvent) => {
        setDiscount(event.target.value as "0" | "1");
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
    const { register, control, formState, getValues, getFieldState, setError } =
        useForm<FormValue>({
            defaultValues: {
                userName: data.userName,
                fullName: data.fullName,
                email: data.email,
                branchId: data.branch.branch,
                phoneNumber: data.phoneNumber,
                address: data.address,
                companyOrderRatio: data.companyOrderRatio,
            },
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;
    let statesId: number[] = [];
    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (
            getFieldState("fullName").error ||
            getFieldState("userName").error ||
            getFieldState("password").error ||
            !getFieldState("password").isTouched ||
            getFieldState("address").error ||
            getFieldState("email").error ||
            getFieldState("phoneNumber").error
        ) {
            handleBack();
        }

        statesId = [];
        selectedStates.current.forEach((state) => convertStatesToIDS(state));
        const requestData = {
            ...getValues(),
            statesId: statesId,
            companyOrderRatio: Number(getValues("companyOrderRatio")),
            branchId: Number(convertBranchToID(getValues().branchId)),
        };
        if (selectedStates.current.length < 1) {
            setError("statesId", { message: "برجاء اختيار المحافظه" });
        }
        if (!getFieldState("password").isTouched) {
            setError("password", { message: "برجاء كتابة كلمة السر " });
        }
        /* check form valid */
        if (
            !getFieldState("userName").error &&
            !getFieldState("fullName").error &&
            !getFieldState("email").error &&
            getFieldState("password").isTouched &&
            !getFieldState("password").error &&
            !getFieldState("phoneNumber").error &&
            !getFieldState("address").error &&
            !getFieldState("branchId").error &&
            !getFieldState("discountType").error &&
            !getFieldState("companyOrderRatio").error &&
            selectedStates.current.length > 0
        ) {
            /*🚀 make the request 🚀  */
            mutate(
                { ...requestData, id: data.id },
                {
                    onSuccess: () => {
                        navigate("/representatives");
                    },
                }
            );
            console.log({ ...requestData, id: data.id });
        } else {
            console.log("no");
        }
    };
    const onSubmitError = () => {
        if (
            getFieldState("fullName").error ||
            getFieldState("userName").error ||
            getFieldState("password").error ||
            getFieldState("address").error ||
            getFieldState("branchId").error ||
            getFieldState("email").error ||
            getFieldState("phoneNumber").error
        ) {
            handleBack();
        }
    };
    const convertBranchToID = (branch: string) => {
        let branchId;
        branches?.data.forEach((branchObj: { id: number; branch: string }) => {
            if (branchObj.branch === branch) {
                branchId = branchObj.id;
            }
        });
        return branchId;
    };
    const convertStatesToIDS = (state: string) => {
        states?.data.forEach((stateObj: { id: number; state: string }) => {
            if (stateObj.state === state) {
                if (!statesId.includes(stateObj.id)) {
                    statesId.push(stateObj.id);
                }
            }
        });
        return;
    };
    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            open={open}
            onClose={handleClose}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* title */}
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    تعديل البيانات الخاصــة بالمندوب : {data.userName}
                </DialogTitle>{" "}
                {/* close btn */}
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </div>

            {/* content=> edit RepresentativeDetails */}
            <DialogContent>
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
                                    <StepLabel {...labelProps}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                    <>
                        {/* form */}
                        <form onSubmit={onSubmit}>
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
                                                    defaultValue={data.states.map(
                                                        (state) => state.state
                                                    )}
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
                                                            state: string;
                                                        }) => option.state
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
                                                                    errors
                                                                        ?.statesId
                                                                        ?.message
                                                                }
                                                            </FormHelperText>
                                                        </>
                                                    )}
                                                />
                                            </div>

                                            {/* branch name */}
                                            <div style={{ margin: "20px 0" }}>
                                                <Autocomplete
                                                    defaultValue={
                                                        data.branch.branch
                                                    }
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
                                                                    errors
                                                                        ?.branchId
                                                                        ?.message
                                                                }
                                                            </FormHelperText>
                                                        </>
                                                    )}
                                                />
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
                                                        <MenuItem
                                                            defaultChecked
                                                            value={"0"}
                                                        >
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
            </DialogContent>
        </Dialog>
    );
};

export default EditRepresentativeDetail;
