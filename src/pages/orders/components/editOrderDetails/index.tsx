/* react staff */
import { useRef, useState } from "react";

/* MUI */
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";
/* motion */
import { motion } from "framer-motion";

/* toast */
import { toast } from "react-toastify";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";
import NumericInputField from "../../../../components/inputFields/numericInputField";
import ProductsInLargeScreen from "./components/ProductsLargeScreesn";
import ProductsInSmallScreen from "./components/ProductsSmallScreesn";
import AddProductForm from "./components/addProductForm";

/* react query */
import UseMutate from "../../../../hooks/orders/useEditMutate";
import UseQuery from "../../../../hooks/serverState/useQuery";

/* types */
import { Product, OrderRow } from "../../../../components/types";

/*  */
const steps = [
    "تسجيل البيانات الاساسيه",
    "تسجيل البيانات الاضافيه",
    " حفظ ومتابعه",
];
/*  */

type props = {
    open: boolean;
    handleClose: () => void;
    data: OrderRow;
};
const EditOrderDetails = ({ open, handleClose, data }: props) => {
    /* API */
    const { data: branches } = UseQuery("/Branches/active");
    const { data: typesOfShipping } = UseQuery("/ShippingTypeSettings");
    const { mutate, isLoading } = UseMutate();
    const { data: states } = UseQuery("/states/HavingCities");
    const { data: citiesToRepresentative } = UseQuery("/Cities");

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

    /* state& city state */
    const stateRef = useRef(data.state.id.toString());
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
        return citiesToRepresentative?.data.filter((city: any) => {
            if (city.stateId.toString() === stateId) return city;
        });
    }; /* branch state */
    const [branch, setBranch] = useState<string>(data.branch.id.toString());
    const handelBranchChange = (event: SelectChangeEvent) => {
        setBranch(event.target.value as string);
    };
    /* city state */
    const [city, setCity] = useState<string>(data.city.id.toString());
    const handelCityChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
    };

    /* select shipping type input */
    const [delivery, setDelivery] = useState(data.shippingType.id.toString());
    const handleDeliveryChange = (event: SelectChangeEvent) => {
        setDelivery(event.target.value as string);
    };
    /* select delivery input */
    const [orderType, setOrderType] = useState(data.orderType.toString());
    const handleOrderTypeChange = (event: SelectChangeEvent) => {
        setOrderType(event.target.value as string);
    };
    /* isVillage  input */
    const [isVillage, setIsVillage] = useState(
        data.isVillage === true ? "0" : "1"
    );
    const handleIsVillage = (event: SelectChangeEvent) => {
        setIsVillage(event.target.value as string);
    };
    /* select payment input */
    const [payment, setPayment] = useState(data.paymentType.toString());
    const handlePaymentChange = (event: SelectChangeEvent) => {
        setPayment(event.target.value as string);
    };

    /* modal special package */
    const [products, setProducts] = useState<Product[]>(data.orderItems);
    const [openProductForm, setOpenProductForm] = useState(false);
    const handleOpenProductForm = () => {
        setOpenProductForm(true);
    };
    const handleCloseProductForm = () => {
        setOpenProductForm(false);
    };

    const schema = z.object({
        /* step 1 */
        clientName: z.string().nonempty("برجاء كتابة اسم العميل بالكامل"),

        phone1: z
            .string()
            .nonempty("برجاء كتابه رقم الهاتف")
            .length(11, " تاكد من كتابه رقم صحيح مكون من 11 رقم"),
        phone2: z.string().optional(),

        email: z
            .string()
            .nonempty("برجاء كتابة البريد الالكتروني")
            .email("برجاء كتابة بريد الالكتروني صالح"),

        orderType: z.string().nonempty("برجاء اختيار نوع التسليم"),

        paymentType: z.string().nonempty("برجاء اختيار نوع الدفع"),

        stateId: z.string().nonempty("برجاء اختيار المحافظه"),
        cityId: z.string().nonempty("برجاء اختيار المدينه"),

        adressDetails: z
            .string()
            .nonempty(
                "برجاء كتابه  تفاصيل العنوان مثل اسم القرية, ورقم الشارع .."
            )
            .min(20, { message: "برجاء كتابة العنوان بتفاصيل اكتر " }),

        isVillage: z
            .string({
                errorMap: (issue, _ctx) => {
                    switch (issue.code) {
                        default:
                            return { message: "برجاء تحديد نوع مكان التوصيل" };
                    }
                },
            })
            .nonempty("برجاء تحديد نوع مكان التوصيل"),

        branchId: z
            .string({
                errorMap: (issue, _ctx) => {
                    switch (issue.code) {
                        default:
                            return { message: "برجاء اختيار الفرع " };
                    }
                },
            })
            .nonempty("برجاء اختيار الفرع"),

        shippingTypeId: z
            .string({
                errorMap: (issue, _ctx) => {
                    switch (issue.code) {
                        default:
                            return { message: "برجاء اختيار طريقة الشحن " };
                    }
                },
            })
            .nonempty("برجاء اختيار طريقة الشحن"),
        orderCost: z.string().nonempty("برجاء كتابة تكلفة الطلب"),
        comments: z.string().optional(),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, formState, handleSubmit, setError } =
        useForm<FormValue>({
            defaultValues: {
                clientName: data.clientName,
                phone1: data.phone1,
                phone2: data?.phone2,
                email: data.email,
                orderType: data.orderType.toString(),
                paymentType: data.paymentType.toString(),
                stateId: data.state.id.toString(),
                cityId: data.city.id.toString(),
                adressDetails: data.adressDetails,
                isVillage: data.isVillage === true ? "0" : "1",
                branchId: data.branch.id.toString(),
                shippingTypeId: data.shippingType.id.toString(),
                comments: data?.comments,
                orderCost: data.orderCost + "",
            },
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;
    const matches = useMediaQuery("(min-width:1070px)");

    const onSubmit = (fieldData: FormValue) => {
        if (
            handelCity(fieldData.stateId).some(
                (city: { id: string; stateId: string }) =>
                    city.id == fieldData.cityId
            )
        ) {
            /*🚀 make request 🚀*/
            const requestData = {
                ...fieldData,
                orderType: +fieldData.orderType,
                shippingTypeId: +fieldData.shippingTypeId,
                cityId: +fieldData.cityId,
                stateId: +fieldData.stateId,
                paymentType: +fieldData.paymentType,
                branchId: +fieldData.branchId,
                orderStatus: 0,
                isVillage: fieldData.isVillage === "0" ? true : false,
                orderItems: products.map((product) => ({
                    productName: product.productName,
                    productWeight: product.productWeight,
                    productQuantity: product.productQuantity,
                })),
                traderId: data.trader.id,
                id: data.id,
                orderCost: Math.abs(+fieldData.orderCost),
            };
            /*    ...requestData,
            
                traderId, */
            mutate(requestData, {
                onSuccess: () => {
                    handleClose();
                },
            });
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
                    تعــديــل بيانات الخاصــة بالطلب رقم : {data.id}
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
                    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                        {/* form step 1 */}
                        {activeStep === 0 && (
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
                                    {/* client Name */}
                                    <div style={{ margin: "20px 0" }}>
                                        <InputField
                                            register={register}
                                            errors={errors.clientName}
                                            fieldName="clientName"
                                            label="اسم العميل"
                                            largeWidth="90%"
                                            smallWidth="90%"
                                        />
                                    </div>

                                    {/* Phone1 && optional Phone1*/}
                                    <Box
                                        sx={{
                                            margin: "20px 0",
                                            display: "flex",
                                            flexWrap: "wrap",
                                            width: "90%",
                                            justifyContent: "space-between",
                                            gap: { xs: "20px", md: 0 },
                                        }}
                                    >
                                        {/* Phone1 */}
                                        <NumericInputField
                                            register={register}
                                            errors={errors.phone1}
                                            fieldName="phone1"
                                            label=" رقم الهاتف الاساسي"
                                            largeWidth="49%"
                                            smallWidth="100%"
                                        />{" "}
                                        {/* optional Phone1 */}
                                        <NumericInputField
                                            register={register}
                                            errors={errors.phone2}
                                            fieldName="phone2"
                                            label=" رقم الهاتف الاحتياطي"
                                            largeWidth="49%"
                                            smallWidth="100%"
                                        />
                                    </Box>

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

                                    {/* OrderType && paymentType*/}
                                    <Box
                                        sx={{
                                            margin: "20px 0",
                                            display: "flex",
                                            flexWrap: "wrap",
                                            width: "90%",
                                            justifyContent: "space-between",
                                            gap: { xs: "20px", md: 0 },
                                        }}
                                    >
                                        {/* OrderType */}
                                        <FormControl
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    md: "49%",
                                                },
                                            }}
                                        >
                                            <InputLabel
                                                error={!!errors.orderType}
                                                color="info"
                                                id="demo-simple-select-helper-label"
                                            >
                                                نوع التسليم
                                            </InputLabel>
                                            <Select
                                                {...register("orderType")}
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={orderType}
                                                label="نوع التسليم"
                                                color="info"
                                                onChange={handleOrderTypeChange}
                                            >
                                                {/*  <MenuItem value=""></MenuItem> */}
                                                <MenuItem
                                                    defaultChecked
                                                    value={"0"}
                                                >
                                                    التسليم في الفرع
                                                </MenuItem>
                                                <MenuItem value={"1"}>
                                                    التسليم اونلاين
                                                </MenuItem>
                                            </Select>
                                            <FormHelperText
                                                error={!!errors.orderType}
                                            >
                                                {errors?.orderType?.message}
                                            </FormHelperText>
                                        </FormControl>
                                        {/* paymentType */}
                                        <FormControl
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    md: "49%",
                                                },
                                            }}
                                        >
                                            <InputLabel
                                                error={!!errors.paymentType}
                                                color="info"
                                                id="demo-simple-select-helper-label"
                                            >
                                                نوع الدفع
                                            </InputLabel>
                                            <Select
                                                {...register("paymentType")}
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={payment}
                                                label="نوع الدفع"
                                                color="info"
                                                onChange={handlePaymentChange}
                                            >
                                                {/*  <MenuItem value=""></MenuItem> */}
                                                <MenuItem
                                                    defaultChecked
                                                    value={"0"}
                                                >
                                                    واجبة التحصيل
                                                </MenuItem>
                                                <MenuItem value={"1"}>
                                                    دفع مقدم
                                                </MenuItem>
                                                <MenuItem value={"2"}>
                                                    طرد مقابل طرد
                                                </MenuItem>
                                            </Select>
                                            <FormHelperText
                                                error={!!errors.paymentType}
                                            >
                                                {errors?.paymentType?.message}
                                            </FormHelperText>
                                        </FormControl>
                                    </Box>
                                    {/* stateName & cityName*/}
                                    <Box
                                        sx={{
                                            margin: "20px 0",
                                            display: "flex",
                                            flexWrap: "wrap",
                                            width: "90%",
                                            justifyContent: "space-between",
                                            gap: { xs: "20px", md: 0 },
                                        }}
                                    >
                                        <FormControl
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    md: "49%",
                                                },
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

                                        {
                                            <FormControl
                                                sx={{
                                                    width: {
                                                        xs: "100%",
                                                        md: "49%",
                                                    },
                                                }}
                                                /*   disabled={!availableCities} */
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
                                        }
                                    </Box>

                                    {/* address details */}
                                    <div style={{ margin: "20px 0" }}>
                                        <FormControl
                                            error={!!errors.adressDetails}
                                            fullWidth
                                            sx={{ width: "90%" }}
                                            variant="outlined"
                                        >
                                            <InputLabel
                                                color="info"
                                                htmlFor="AdressDetails"
                                            >
                                                {" "}
                                                تفاصيل العنوان
                                            </InputLabel>
                                            <OutlinedInput
                                                multiline
                                                minRows={2.5}
                                                {...register("adressDetails")}
                                                color="info"
                                                id={`adressDetails`}
                                                type={"text"}
                                                label={"تفاصيل العنوان"}
                                            />
                                            <FormHelperText
                                                sx={{
                                                    fontWeight: "bold",
                                                    letterSpacing: "0.1rem",
                                                }}
                                                id="component-helper-text"
                                            >
                                                {errors?.adressDetails?.message}
                                            </FormHelperText>
                                        </FormControl>
                                    </div>

                                    {/* isVillage */}
                                    <FormControl>
                                        <FormLabel
                                            error={!!errors.isVillage}
                                            id="demo-radio-buttons-group-label"
                                            color="info"
                                        >
                                            هل التوصيل لقرية ؟
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                            value={isVillage}
                                            onChange={handleIsVillage}
                                        >
                                            <FormControlLabel
                                                value={"0"}
                                                {...register("isVillage")}
                                                control={<Radio color="info" />}
                                                label="نعم"
                                            />
                                            <FormControlLabel
                                                value={"1"}
                                                {...register("isVillage")}
                                                control={<Radio color="info" />}
                                                label="لا, لمدينة"
                                            />
                                        </RadioGroup>{" "}
                                        <FormHelperText
                                            error={!!errors.isVillage}
                                        >
                                            {errors?.isVillage?.message}
                                        </FormHelperText>
                                    </FormControl>

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
                                                onChange={handelBranchChange}
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
                                    {/* typesOfShipping */}
                                    <div style={{ margin: "20px 0" }}>
                                        <FormControl
                                            sx={{
                                                width: "90%",
                                            }}
                                        >
                                            <InputLabel
                                                error={!!errors.shippingTypeId}
                                                color="info"
                                                id="demo-simple-select-helper-label"
                                            >
                                                طريقة الشحن
                                            </InputLabel>
                                            <Select
                                                {...register("shippingTypeId")}
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={delivery}
                                                label="طريقة الشحن"
                                                color="info"
                                                onChange={handleDeliveryChange}
                                            >
                                                {typesOfShipping?.data.map(
                                                    (shiping: {
                                                        id: number;
                                                        name: string;
                                                    }) => (
                                                        <MenuItem
                                                            key={shiping.id}
                                                            value={shiping.id.toString()}
                                                        >
                                                            {shiping.name}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                            <FormHelperText
                                                error={!!errors.shippingTypeId}
                                            >
                                                {
                                                    errors?.shippingTypeId
                                                        ?.message
                                                }
                                            </FormHelperText>
                                        </FormControl>
                                    </div>
                                </Box>
                            </Box>
                        )}

                        {/* form step 2 */}
                        {activeStep === 1 && (
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
                                    <Button
                                        color="info"
                                        variant="contained"
                                        onClick={handleOpenProductForm}
                                        sx={{
                                            height: "40px",
                                            marginY: "22px",
                                            fontWeight: "bold",
                                            /*   color: "white", */
                                        }}
                                    >
                                        اضافه منتج
                                    </Button>
                                </Box>
                                {/* show Products */}
                                {matches ? (
                                    <ProductsInLargeScreen
                                        products={products}
                                        handleOpenModal={handleOpenProductForm}
                                        setProducts={setProducts}
                                    />
                                ) : (
                                    <ProductsInSmallScreen
                                        products={products}
                                        handleOpenModal={handleOpenProductForm}
                                        setProducts={setProducts}
                                    />
                                )}
                                {/* modal */}
                                <AddProductForm
                                    handleCloseProductForm={
                                        handleCloseProductForm
                                    }
                                    open={openProductForm}
                                    setProducts={setProducts}
                                />
                            </Box>
                        )}

                        {/* form step 3 */}
                        {activeStep === 2 && (
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
                                    {/* orderCost */}
                                    <div
                                        style={{
                                            margin: "20px 0",
                                        }}
                                    >
                                        <NumericInputField
                                            register={register}
                                            errors={errors.orderCost}
                                            fieldName="orderCost"
                                            label="تكلفة الطلب"
                                            largeWidth="90%"
                                            smallWidth="90%"
                                        />{" "}
                                    </div>
                                    {/* comments */}
                                    <div style={{ margin: "20px 0" }}>
                                        <FormControl
                                            error={!!errors.comments}
                                            fullWidth
                                            sx={{ width: "90%" }}
                                            variant="outlined"
                                        >
                                            <InputLabel
                                                color="info"
                                                htmlFor="comments"
                                            >
                                                ملاحظات
                                            </InputLabel>
                                            <OutlinedInput
                                                multiline
                                                minRows={2}
                                                {...register("comments")}
                                                color="info"
                                                id={`comments`}
                                                type={"text"}
                                                label={"comments"}
                                            />
                                            <FormHelperText
                                                sx={{
                                                    fontWeight: "bold",
                                                    letterSpacing: "0.1rem",
                                                }}
                                                id="comments"
                                            >
                                                {errors?.comments?.message}
                                            </FormHelperText>
                                        </FormControl>
                                    </div>

                                    {/* total weight */}
                                    <Typography fontWeight={"bold"}>
                                        اجمالي الوزن :{" "}
                                        {products.reduce(
                                            (acc, product) =>
                                                (Number(product.productWeight) *
                                                    10 +
                                                    acc * 10) /
                                                10,
                                            0
                                        )}{" "}
                                        كجـــم
                                    </Typography>
                                </Box>
                            </Box>
                        )}
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

                            {activeStep === 0 && (
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
                                    disabled={products.length === 0}
                                    color="inherit"
                                    onClick={handleNext}
                                    sx={[
                                        {
                                            m: 2,
                                        },
                                    ]}
                                >
                                    استمرار
                                </Button>
                            )}
                            {activeStep === 2 && (
                                <Button
                                    type="submit"
                                    color="inherit"
                                    sx={{ m: 2 }}
                                >
                                    حفظ ومتابعه
                                </Button>
                            )}
                        </Box>
                        <DevTool control={control} />
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
export default EditOrderDetails;
