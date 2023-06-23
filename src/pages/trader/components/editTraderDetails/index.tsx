/* react staff */
import { useState, useRef } from "react";

/* router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
    FormHelperText,
    Step,
    StepLabel,
    Stepper,
    Typography,
    useMediaQuery,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    MenuItem,
    Backdrop,
    CircularProgress,
} from "@mui/material"; /* rect-form */
import CloseIcon from "@mui/icons-material/Close";

/* uuid */
import { v4 as uuidv4 } from "uuid";

/* motion */
import { motion } from "framer-motion";

/* hook form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../../hooks/traders/useEditMutate";
import UseQuery from "../../../../hooks/serverState/useQuery";

/* toast */
import { toast } from "react-toastify";

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";
import NumericInputField from "../../../../components/inputFields/numericInputField";
import SpecialPackageInLargeScreen from "./components/specialPackageInLargeScreen";
import SpecialPackageInSmallScreen from "./components/specialPackageInSmallScreen";
import SpecialPackageForm from "./components/specialPackageForm";

/* utils */
import { convertCityToID, convertStateToID } from "../../../../utils/converter";

/* types */
import { SpecialPackagePost, TraderRow } from "../../../../components/types";

type EditEmployeeDetailsProps = {
    open: boolean;
    data: TraderRow;
    handleClose: () => void;
};

/*  */
const steps = [
    "تحديث البيانات الاساسيه",
    "تحديث البيانات الاضافيه",
    " حفظ ومتابعه",
];
const EditTraderDetails = ({
    open,
    handleClose,
    data,
}: EditEmployeeDetailsProps) => {
    const navigate = useNavigate();
    /* mui */
    const matches = useMediaQuery("(min-width:1070px)");

    /* fetch data */
    const { mutate, isLoading } = UseMutate();
    const { data: branches } = UseQuery("/Branches/active");
    const { data: states } = UseQuery("/states/HavingCities");
    const { data: avalCities } = UseQuery("/Cities");

    /* state& city state */
    const stateRef = useRef("");
    const [availableCities, setAvailableCities] = useState<
        {
            id: number;
            stateId: number;
            name: string;
        }[]
    >([
        {
            id: data.city.id,
            stateId: data.state.id,
            name: data.city.name,
        },
    ]);

    const [state, setState] = useState<string>(data.state.id.toString());
    const handelStateChange = (event: SelectChangeEvent) => {
        stateRef.current = event.target.value as string;
        setState(event.target.value as string);
        setAvailableCities(handelCity(stateRef.current));
    };

    const handelCity = (stateId: string) => {
        return avalCities?.data.filter((city: any) => {
            if (city.stateId.toString() === stateId) return city;
        });
    };
    /* branch state */
    const [branch, setBranch] = useState<string>(data.branch.id.toString());
    const handelBranchChange = (event: SelectChangeEvent) => {
        setBranch(event.target.value as string);
    };
    /* city state */
    const [city, setCity] = useState<string>(data.city.id.toString());
    const handelCityChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
    };
    /* modal special package */
    const [openSpecialPackageForm, setOpenSpecialPackageForm] = useState(false);
    const handleOpenSpecialPackageForm = () => {
        setOpenSpecialPackageForm(true);
    };
    const handleCloseSpecialPackageForm = () => {
        setOpenSpecialPackageForm(false);
    };
    const [SpecialPackage, setSpecialPackage] = useState<SpecialPackagePost[]>(
        data.specialPackages.map((specialPackage) => ({
            ...specialPackage,
            id: uuidv4(),
        }))
    );
    /* steps form */
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    /* end-steps form */

    /* zod validation */
    const schema = z.object({
        /* step 1 */
        fullName: z.string().nonempty(" برجاء كتابة اسم التاجر بالكامل"),

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

        address: z.string().nonempty("برجاء كتابة العنوان"),

        /* step 2 */
        branchId: z.string().nonempty("برجاء اختيار الفرع"),
        storeName: z.string().nonempty("برجاء كتابه اسم المتجر"),
        stateId: z.string().nonempty("برجاء اختيار المحافظه"),
        cityId: z.string().nonempty("برجاء اختيار المدينه"),
        rejectedOrderlossRatio: z.string().nonempty("برجاء كتابه نسبه التحمل"),
    }); /* hooks form */

    const { register, control, formState, setError, handleSubmit } =
        useForm<FormValue>({
            defaultValues: {
                fullName: data.fullName,
                userName: data.userName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address: data.address,
                storeName: data.storeName,
                branchId: data.branch.id + "",
                stateId: data.state.id + "",
                cityId: data.city.id + "",
                rejectedOrderlossRatio: data.rejectedOrderlossRatio.toString(),
            },
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;
    type FormValue = z.infer<typeof schema>;
    const handelPackage = (specialPackage: SpecialPackagePost[]) => {
        return specialPackage.map((spPackage: SpecialPackagePost) => ({
            cityId: convertCityToID(avalCities, spPackage.city),
            stateId: convertStateToID(states, spPackage.state),
            shippingCost: Math.abs(spPackage.shippingCost),
        }));
    };
    const onSubmit = (requestData: FormValue) => {
        if (
            handelCity(requestData.stateId).some(
                (city: { id: string; stateId: string }) =>
                    city.id == requestData.cityId
            )
        ) {
            mutate(
                {
                    ...requestData,
                    id: data.id,
                    stateId: +requestData.stateId,
                    cityId: +requestData.cityId,
                    branchId: +requestData.branchId,
                    specialPackages: handelPackage(SpecialPackage),
                    rejectedOrderlossRatio: Math.abs(
                        +requestData.rejectedOrderlossRatio
                    ),
                },
                {
                    onSuccess: () => {
                        handleClose();
                    },
                    onError: (err: any) => {
                        if (err.message.includes("Username")) {
                            setError("userName", {
                                message:
                                    "اسم المستخدم موجود بالفعل, برجاء كتابه اسم جديد",
                            });
                            toast.error(
                                "اسم المستخدم موجود بالفعل, برجاء كتابه اسم جديد",
                                {
                                    position: toast.POSITION.BOTTOM_LEFT,
                                    autoClose: 2000,
                                    theme: "dark",
                                }
                            );
                        }
                        if (err.message.includes("Email")) {
                            setError("email", {
                                message:
                                    "البريد الالكتروني موجود بالفعل, برجاء كتابه بريد جديد",
                            });
                            toast.error(
                                "البريد الالكتروني موجود بالفعل, برجاء كتابه بريد جديد",
                                {
                                    position: toast.POSITION.BOTTOM_LEFT,
                                    autoClose: 2000,
                                    theme: "dark",
                                }
                            );
                        }
                        if (err.message.includes("Passwords")) {
                            setError("password", {
                                message: "كلمة السر يجب ان تحتوي علي ارقام ",
                            });
                            toast.error("كلمة السر يجب ان تحتوي علي ارقام ", {
                                position: toast.POSITION.BOTTOM_LEFT,
                                autoClose: 2000,
                                theme: "dark",
                            });
                        }
                    },
                }
            );
        } else {
            setError("cityId", { message: "برجاء اختيار مدينة" });
            toast.warn("برجاء   اختيار مدينة ", {
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
        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
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
                    تعــديــل بيانات الخاصــة بالتاجر : {data.userName}
                </DialogTitle>
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </motion.div>

            <DialogContent>
                <Box
                    sx={{
                        width: "100%",
                        padding: "20px",
                        borderRadius: "25px",
                        boxShadow:
                            "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                    }}
                >
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
                                        {/* phoneNumber */}
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
                                        {/* store name */}
                                        <div style={{ margin: "20px 0" }}>
                                            <InputField
                                                register={register}
                                                errors={errors.storeName}
                                                fieldName="storeName"
                                                label="اسم المتجر"
                                                largeWidth="90%"
                                                smallWidth="90%"
                                            />
                                        </div>

                                        {/* state name */}
                                        <div style={{ margin: "20px 0" }}>
                                            <FormControl
                                                sx={{
                                                    width: "90%",
                                                }}
                                            >
                                                <InputLabel
                                                    error={!!errors.stateId}
                                                    color="info"
                                                    id="demo-simple-select-helper-label"
                                                >
                                                    اسم المحافظة
                                                </InputLabel>
                                                <Select
                                                    {...register("stateId")}
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={state}
                                                    label="اسم المحافظة"
                                                    color="info"
                                                    onChange={handelStateChange}
                                                >
                                                    {states?.data.map(
                                                        (state: {
                                                            id: number;
                                                            name: string;
                                                        }) => (
                                                            <MenuItem
                                                                key={state.id}
                                                                value={state.id.toString()}
                                                            >
                                                                {state.name}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                                <FormHelperText
                                                    error={!!errors.stateId}
                                                >
                                                    {errors?.stateId?.message}
                                                </FormHelperText>
                                            </FormControl>
                                        </div>

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
                                                            name: string;
                                                        }) => (
                                                            <MenuItem
                                                                key={branch.id}
                                                                defaultChecked
                                                                value={branch.id.toString()}
                                                            >
                                                                {branch.name}
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

                                        {/* city name */}
                                        <div style={{ margin: "20px 0" }}>
                                            <FormControl
                                                sx={{
                                                    width: "90%",
                                                }}
                                                /*     disabled={!availableCities} */
                                            >
                                                <InputLabel
                                                    error={!!errors.cityId}
                                                    color="info"
                                                    id="demo-simple-select-helper-label"
                                                >
                                                    اسم المدينة
                                                </InputLabel>
                                                <Select
                                                    {...register("cityId")}
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={city}
                                                    label="اسم المدينة"
                                                    color="info"
                                                    onChange={handelCityChange}
                                                >
                                                    {availableCities?.map(
                                                        (city: {
                                                            id: number;
                                                            name: string;
                                                        }) => (
                                                            <MenuItem
                                                                key={city.id}
                                                                defaultChecked
                                                                value={city?.id.toString()}
                                                            >
                                                                {city?.name}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                                <FormHelperText
                                                    error={!!errors.cityId}
                                                >
                                                    {errors?.cityId?.message}
                                                </FormHelperText>
                                            </FormControl>
                                        </div>
                                        {/* rejection ratio */}
                                        <div style={{ margin: "20px 0" }}>
                                            <NumericInputField
                                                register={register}
                                                errors={
                                                    errors.rejectedOrderlossRatio
                                                }
                                                fieldName="rejectedOrderlossRatio"
                                                label="نسبه تحمل التاجر لقيمه شحن الطلبات المرفوضه"
                                                largeWidth="90%"
                                                smallWidth="90%"
                                            />
                                        </div>
                                    </Box>
                                ) : null}

                                {/* form step 3  */}
                                {activeStep === 2 && (
                                    <Box
                                        sx={{
                                            marginX: "auto",
                                            width: "90%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                            }}
                                        >
                                            <Typography>
                                                هل تريد اضافه اسعار مميزه لبعض
                                                المدن ؟
                                            </Typography>
                                            <Button
                                                color="info"
                                                onClick={
                                                    handleOpenSpecialPackageForm
                                                }
                                            >
                                                اضافه باقة
                                            </Button>
                                        </Box>
                                        {/* show Special Package */}
                                        {SpecialPackage.length > 0 &&
                                        matches ? (
                                            <SpecialPackageInLargeScreen
                                                SpecialPackage={SpecialPackage}
                                                setSpecialPackage={
                                                    setSpecialPackage
                                                }
                                            />
                                        ) : (
                                            <SpecialPackageInSmallScreen
                                                SpecialPackage={SpecialPackage}
                                                setSpecialPackage={
                                                    setSpecialPackage
                                                }
                                            />
                                        )}

                                        {/* modal */}
                                        <SpecialPackageForm
                                            setSpecialPackage={
                                                setSpecialPackage
                                            }
                                            open={openSpecialPackageForm}
                                            states={states}
                                            handleCloseSpecialPackageForm={
                                                handleCloseSpecialPackageForm
                                            }
                                            avalCities={avalCities}
                                        />
                                    </Box>
                                )}
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

                            {activeStep !== 2 && (
                                <Button
                                    color="inherit"
                                    onClick={handleNext}
                                    sx={{ m: 2 }}
                                >
                                    استمرار
                                </Button>
                            )}
                            {activeStep === 2 && (
                                <Button
                                    color="inherit"
                                    type="submit"
                                    sx={{ m: 2 }}
                                >
                                    حفظ ومتابعه
                                </Button>
                            )}
                        </Box>
                        <DevTool control={control} />{" "}
                        <Backdrop
                            sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open={isLoading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </form>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default EditTraderDetails;
