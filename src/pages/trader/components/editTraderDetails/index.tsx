/* react staff */
import { useState, SyntheticEvent, useEffect } from "react";

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
    Autocomplete,
    FormHelperText,
    TextField,
    Step,
    StepLabel,
    Stepper,
    Typography,
    Stack,
    Backdrop,
    Modal,
    Fade,
    useMediaQuery,
} from "@mui/material"; /* rect-form */
import CloseIcon from "@mui/icons-material/Close";

/* hook form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../../hooks/empoyees/useEditMutate";
import UseQuery, { UseQuery2 } from "../../../../hooks/serverState/useQuery";

type EditEmployeeDetailsProps = {
    open: boolean;
    data: TraderType;
    handleClose: () => void;
};

/* uuid */
import { v4 as uuidv4 } from "uuid";

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";
import NumericInputField from "../../../../components/inputFields/numericInputField";
import SpecialPackageInLargeScreen from "../../add/components/specialPackageInLargeScreen";
import SpecialPackageInSmallScreen from "../../add/components/specialPackageInSmallScreen";

/* react query */

/* types */
import { TraderType } from "../../../../components/types";

import { SpecialPackage } from "../../../../components/types";

const modalFormstyle = {
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
    /*  */
    const [stateId, setStateId] = useState<number>();
    /* mui */
    const matches = useMediaQuery("(min-width:1070px)");
    /* fetch data */
    const { mutate } = UseMutate();
    const { data: branches } = UseQuery("/branches");
    const { data: states } = UseQuery("/states");
    const { data: cities, refetch } = UseQuery2(`/statesTest/${stateId}`);
    const { data: cities2 } = UseQuery(`/cities`);
    const [avalCities, setAvalCities] = useState([]);

    /* steps form */
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
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

        branch: z.string().nonempty("برجاء اختيار الفرع"),

        /* step 2 */

        storeName: z.string().nonempty("برجاء كتابه اسم المتجر"),
        state: z.string().nonempty("برجاء اختيار المحافظه"),
        city: z.string().nonempty("برجاء اختيار المدينه"),

        rejectionOrderLossRatio: z.string().nonempty("برجاء كتابه نسبه التحمل"),

        /* step 3 */
        stateSpecialPackage: z.string().nonempty("برجاء اختيار المحافظه"),
        citySpecialPackage: z.string().nonempty("برجاء اختيار المدينه"),
        shippingCostSpecialPackage: z
            .string()
            .nonempty("برجاء ادخال تكلفه الشحن"),
    });
    type FormValue = z.infer<typeof schema>;
    /* hooks form */
    const {
        register,
        control,
        resetField,
        formState,
        getValues,
        getFieldState,
    } = useForm<FormValue>({
        defaultValues: {
            fullName: data.traderData.fullName,
            userName: data.traderData.userName,
            email: data.traderData.email,
            phoneNumber: data.traderData.phoneNumber,
            address: data.traderData.address,
            storeName: data.traderData.storeName,
            branch: data.traderData.branchId + "",
            state: data.traderData.stateId + "",
            city: data.traderData.cityId + "",
            rejectionOrderLossRatio: data.traderData.rejectionOrderLossRatio,
        },
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            traderData: {
                fullName: getValues().fullName,
                userName: getValues().userName,
                email: getValues().email,
                phoneNumber: getValues().phoneNumber,
                password: getValues().password,
                address: getValues().address,
                branchId: convertBranchToID(getValues().branch),
                storeName: getValues().storeName,
                stateId: convertStateToID(getValues().state),
                cityId: convertCityToID(getValues().city),
                rejectionOrderLossRatio: getValues().rejectionOrderLossRatio,
            },
            SpecialPackage: convertSpecialPackage(SpecialPackage),
        };
        if (
            getFieldState("fullName").error ||
            getFieldState("userName").error ||
            getFieldState("email").error ||
            (getFieldState("password").isTouched &&
                getFieldState("password").error) ||
            getFieldState("phoneNumber").error ||
            getFieldState("address").error
        ) {
            handleReset();
        } else {
            setActiveStep(1);
        }
        if (
            !getFieldState("fullName").error &&
            !getFieldState("userName").error &&
            !getFieldState("email").error &&
            !getFieldState("phoneNumber").error &&
            !getFieldState("password").error &&
            getFieldState("password").isTouched &&
            !getFieldState("address").error &&
            !getFieldState("branch").error &&
            !getFieldState("state").error &&
            !getFieldState("storeName").error &&
            !getFieldState("city").error
        ) {
            console.log(data);
            /* make the request 🚀 🚀 */
            /*  mutate(data, {
                onSuccess: () => {
                    navigate("/traders");
                },
            }); */
        }
    };
    /* control cities option */
    const handelAvailableCities = (state: string) => {
        resetField("city");
        resetField("citySpecialPackage");
        setStateId(convertStateToID(state));
    };
    useEffect(() => {
        refetch().then((res) => setAvalCities(res?.data.data.cities));
    }, [stateId]);

    const convertStateToID = (state: string) => {
        let stateId!: number;
        states?.data.forEach((stateObj: { id: number; state: string }) => {
            if (stateObj.state === state) {
                stateId = stateObj.id;
            }
        });
        return stateId;
    };
    const convertCityToID = (city: string) => {
        let cityId!: number;
        cities2?.data.forEach((cityObj: { id: number; city: string }) => {
            if (cityObj.city === city) {
                cityId = cityObj.id;
            }
        });
        return cityId;
    };
    const convertBranchToID = (branch: string) => {
        let branchId!: number;
        branches?.data.forEach((branchObj: { id: number; branch: string }) => {
            if (branchObj.branch === branch) {
                branchId = branchObj.id;
            }
        });
        return branchId;
    };
    const convertSpecialPackage = (SpecialPackage: SpecialPackage[]) => {
        return SpecialPackage.map((SpecialPackage) => {
            convertStateToID(SpecialPackage.state);
            convertBranchToID(SpecialPackage.city);
            SpecialPackage.shippingCost;
            return {
                stateId: convertStateToID(SpecialPackage.state),
                cityId: convertCityToID(SpecialPackage.city),
                shippingCost: SpecialPackage.shippingCost,
            };
        });
    };

    /* step form 3 staff */

    /* modal form*/
    const [SpecialPackage, setSpecialPackage] = useState<SpecialPackage[]>(
        data.SpecialPackage
    );
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleAddSpecialPackage = (newPackage: SpecialPackage) => {
        setSpecialPackage((prev) => [...prev, { ...newPackage }]);
    };
    const handelDeleteSpecialPackage = (row: SpecialPackage) => {
        setSpecialPackage((prev) =>
            prev.filter((oldPackage) => oldPackage.id !== row.id)
        );
    };
    /* modal */
    const modalSubmit = () => {
        if (
            getFieldState("stateSpecialPackage").isTouched &&
            !getFieldState("stateSpecialPackage").error &&
            getFieldState("citySpecialPackage").isTouched &&
            !getFieldState("citySpecialPackage").error &&
            getFieldState("shippingCostSpecialPackage").isTouched &&
            !getFieldState("shippingCostSpecialPackage").error
        ) {
            handleAddSpecialPackage({
                state: getValues("stateSpecialPackage"),
                city: getValues("citySpecialPackage"),
                shippingCost: getValues("shippingCostSpecialPackage"),
                id: uuidv4(),
            });
            resetField("citySpecialPackage");
            resetField("shippingCostSpecialPackage");
            resetField("stateSpecialPackage");
            handleCloseModal();
        } else {
            // console.log("no");
        }

        /* if (formState.isValid) {
            resetForm();
          
        } */
    };

    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={open}
                onClose={handleClose}
            >
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                        تعــديــل بيانات الخاصــة بالتاجر :{" "}
                        {data.traderData.userName}
                    </DialogTitle>
                    <DialogActions>
                        <IconButton onClick={handleClose}>
                            <CloseIcon
                                sx={{ color: "red", fontSize: "1.7rem" }}
                            />
                        </IconButton>
                    </DialogActions>
                </div>

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

                        {/* form */}
                        <form onSubmit={(e) => onSubmit(e)}>
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
                                                <Autocomplete
                                                    defaultValue={
                                                        data.traderData
                                                            .stateId + ""
                                                    }
                                                    onChange={(_e, value) => {
                                                        handelAvailableCities(
                                                            value as string
                                                        );
                                                    }}
                                                    noOptionsText="هذه المحافظة غير متاحة حاليا"
                                                    id="state"
                                                    disablePortal
                                                    options={states?.data.map(
                                                        (option: {
                                                            id: number;
                                                            state: string;
                                                        }) => option.state
                                                    )}
                                                    renderInput={(params) => (
                                                        <>
                                                            <TextField
                                                                color="info"
                                                                {...register(
                                                                    "state"
                                                                )}
                                                                error={
                                                                    !!errors.state
                                                                }
                                                                sx={{
                                                                    width: "90%",
                                                                }}
                                                                {...params}
                                                                label="المحافظة"
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    type: "text",
                                                                }}
                                                            />
                                                            <FormHelperText
                                                                error={
                                                                    !!errors.state
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
                                                                        ?.state
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
                                                        data.traderData
                                                            .branchId + ""
                                                    }
                                                    noOptionsText="هذا الفرع غير متاح حاليا"
                                                    id="state"
                                                    disablePortal
                                                    options={branches?.data.map(
                                                        (option: {
                                                            id: number;
                                                            branch: string;
                                                        }) => option.branch
                                                    )}
                                                    renderInput={(params) => (
                                                        <>
                                                            <TextField
                                                                color="info"
                                                                {...register(
                                                                    "branch"
                                                                )}
                                                                error={
                                                                    !!errors.branch
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
                                                                    !!errors.branch
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
                                                                        ?.branch
                                                                        ?.message
                                                                }
                                                            </FormHelperText>
                                                        </>
                                                    )}
                                                />
                                            </div>
                                            {/* city name */}
                                            <div style={{ margin: "20px 0" }}>
                                                <Autocomplete
                                                    defaultValue={
                                                        data.traderData.cityId +
                                                        ""
                                                    }
                                                    noOptionsText="هذه المدينة غير متاحة حاليا"
                                                    id="city"
                                                    disablePortal
                                                    options={avalCities.map(
                                                        (option: {
                                                            id: number;
                                                            city: string;
                                                        }) => option.city
                                                    )}
                                                    renderInput={(params) => (
                                                        <>
                                                            <TextField
                                                                color="info"
                                                                {...register(
                                                                    "city"
                                                                )}
                                                                error={
                                                                    !!errors.city
                                                                }
                                                                sx={{
                                                                    width: "90%",
                                                                }}
                                                                {...params}
                                                                label="اسم المدينة"
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    type: "text",
                                                                }}
                                                            />
                                                            <FormHelperText
                                                                error={
                                                                    !!errors.city
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
                                                                    errors?.city
                                                                        ?.message
                                                                }
                                                            </FormHelperText>
                                                        </>
                                                    )}
                                                />
                                            </div>
                                            {/* rejection ratio */}
                                            <div style={{ margin: "20px 0" }}>
                                                <NumericInputField
                                                    register={register}
                                                    errors={
                                                        errors.rejectionOrderLossRatio
                                                    }
                                                    fieldName="rejectionOrderLossRatio"
                                                    label="نسبه تحمل التاجر لقيمه شحن الطلبات المرفوضه"
                                                    largeWidth="90%"
                                                    smallWidth="90%"
                                                />
                                            </div>
                                        </Box>
                                    ) : null}
                                    {/* form step 3  */}
                                    {activeStep === 2 ? (
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
                                                    هل تريد اضافه اسعار مميزه
                                                    لبعض المدن ؟
                                                </Typography>
                                                <Button
                                                    color="info"
                                                    onClick={handleOpenModal}
                                                >
                                                    اضافه باقة
                                                </Button>
                                            </Box>
                                            {/* show Special Package */}
                                            {SpecialPackage.length > 0 &&
                                                (matches ? (
                                                    <SpecialPackageInLargeScreen
                                                        SpecialPackage={
                                                            SpecialPackage
                                                        }
                                                        setSpecialPackage={
                                                            setSpecialPackage
                                                        }
                                                    />
                                                ) : (
                                                    <SpecialPackageInSmallScreen
                                                        SpecialPackage={
                                                            SpecialPackage
                                                        }
                                                        setSpecialPackage={
                                                            setSpecialPackage
                                                        }
                                                    />
                                                ))}
                                            {/* modal */}
                                            <Modal
                                                aria-labelledby="transition-modal-title"
                                                aria-describedby="transition-modal-description"
                                                open={openModal}
                                                onClose={handleCloseModal}
                                                closeAfterTransition
                                                slots={{ backdrop: Backdrop }}
                                                slotProps={{
                                                    backdrop: {
                                                        timeout: 500,
                                                    },
                                                }}
                                            >
                                                <Fade in={openModal}>
                                                    <Box sx={modalFormstyle}>
                                                        <Typography
                                                            id="transition-modal-title"
                                                            variant="h6"
                                                            component="h2"
                                                        >
                                                            اضافه باقه مميزه
                                                        </Typography>
                                                        {/* state name */}
                                                        <div
                                                            style={{
                                                                margin: "20px 0",
                                                            }}
                                                        >
                                                            <Autocomplete
                                                                onChange={(
                                                                    _e,
                                                                    value
                                                                ) => {
                                                                    handelAvailableCities(
                                                                        value as string
                                                                    );
                                                                }}
                                                                noOptionsText="هذه المحافظة غير متاحة حاليا"
                                                                id="stateSpecialPackage"
                                                                disablePortal
                                                                options={states?.data.map(
                                                                    (option: {
                                                                        id: number;
                                                                        state: string;
                                                                    }) =>
                                                                        option.state
                                                                )}
                                                                renderInput={(
                                                                    params
                                                                ) => (
                                                                    <>
                                                                        <TextField
                                                                            color="info"
                                                                            {...register(
                                                                                "stateSpecialPackage"
                                                                            )}
                                                                            error={
                                                                                !!errors.stateSpecialPackage
                                                                            }
                                                                            {...params}
                                                                            label="المحافظة"
                                                                            InputProps={{
                                                                                ...params.InputProps,
                                                                                type: "text",
                                                                            }}
                                                                        />
                                                                        <FormHelperText
                                                                            error={
                                                                                !!errors.stateSpecialPackage
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
                                                                                    ?.stateSpecialPackage
                                                                                    ?.message
                                                                            }
                                                                        </FormHelperText>
                                                                    </>
                                                                )}
                                                            />
                                                        </div>
                                                        {/* city name */}
                                                        <div
                                                            style={{
                                                                margin: "20px 0",
                                                            }}
                                                        >
                                                            <Autocomplete
                                                                disabled={
                                                                    !cities?.data
                                                                }
                                                                noOptionsText="هذه المدينة غير متاحة حاليا"
                                                                id="citySpecialPackage"
                                                                disablePortal
                                                                options={avalCities.map(
                                                                    (option: {
                                                                        id: number;
                                                                        city: string;
                                                                    }) =>
                                                                        option.city
                                                                )}
                                                                renderInput={(
                                                                    params
                                                                ) => (
                                                                    <>
                                                                        <TextField
                                                                            color="info"
                                                                            {...register(
                                                                                "citySpecialPackage"
                                                                            )}
                                                                            error={
                                                                                !!errors.citySpecialPackage
                                                                            }
                                                                            {...params}
                                                                            label="اسم المدينة"
                                                                            InputProps={{
                                                                                ...params.InputProps,
                                                                                type: "text",
                                                                            }}
                                                                        />
                                                                        <FormHelperText
                                                                            error={
                                                                                !!errors.citySpecialPackage
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
                                                                                    ?.citySpecialPackage
                                                                                    ?.message
                                                                            }
                                                                        </FormHelperText>
                                                                    </>
                                                                )}
                                                            />
                                                        </div>
                                                        {/* shiping cost */}
                                                        <div
                                                            style={{
                                                                margin: "20px 0",
                                                            }}
                                                        >
                                                            <NumericInputField
                                                                register={
                                                                    register
                                                                }
                                                                errors={
                                                                    errors.shippingCostSpecialPackage
                                                                }
                                                                fieldName="shippingCostSpecialPackage"
                                                                label="سعر الشحن"
                                                                largeWidth="100%"
                                                                smallWidth="100%"
                                                            />
                                                        </div>
                                                        {/* add special pakage */}
                                                        <Button
                                                            onClick={
                                                                modalSubmit
                                                            }
                                                            sx={{
                                                                width: "100%",
                                                                marginX: "auto",
                                                                height: "40px",
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                            variant="contained"
                                                        >
                                                            اضافة
                                                        </Button>

                                                        <DevTool
                                                            control={control}
                                                        />
                                                    </Box>
                                                </Fade>
                                            </Modal>{" "}
                                        </Box>
                                    ) : null}
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
                            <DevTool control={control} />
                        </form>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditTraderDetails;
