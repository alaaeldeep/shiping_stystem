/* react staff */
import { useRef, useState } from "react";

/* react router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
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
import { useMediaQuery } from "@mui/material";

/* toast */
import { toast } from "react-toastify";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* components */
import InputField from "../../../components/inputFields/textInputField/inputfield";
import NumericInputField from "../../../components/inputFields/numericInputField";
import { TableToolbar } from "../../../components/table/tableToolBar";
import ProductsInLargeScreen from "./components/ProductsLargeScreesn";
import AddProductForm from "./components/addProductForm";
import ProductsInSmallScreen from "./components/ProductsSmallScreesn";

/* react query */
import UseMutate from "../../../hooks/orders/useAddMutate";
import UseQuery from "../../../hooks/serverState/useQuery";

/* types */
import { Product } from "../../../components/types";

/*  */
const steps = [
    "تسجيل البيانات الاساسيه",
    "تسجيل البيانات الاضافيه",
    " حفظ ومتابعه",
];

const AddOrderPage = () => {
    /* API */
    const { data: branches } = UseQuery("/branches");
    const { data: typesOfShipping } = UseQuery("/typeOfShipping");
    const { mutate } = UseMutate();
    const { data: states } = UseQuery("/states");
    const { data: citiesToRepresentative } = UseQuery(
        "/citiesToRepresentative"
    );

    const navigate = useNavigate();

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
    const stateRef = useRef("");
    const [availableCities, setAvailableCities] = useState<
        {
            cityId: number;
            stateId: number;
            name: string;
        }[]
    >();

    const [state, setState] = useState<string>("");
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
    const [branch, setBranch] = useState<string>();
    const handelBranchChange = (event: SelectChangeEvent) => {
        setBranch(event.target.value as string);
    };
    /* city state */
    const [city, setCity] = useState<string>();
    const handelCityChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
    };

    /* select delivery input */
    const [delivery, setDelivery] = useState("");
    const handleDeliveryChange = (event: SelectChangeEvent) => {
        setDelivery(event.target.value as string);
    };
    /* isVillage  input */
    const [isVillage, setIsVillage] = useState("");
    const handleIsVillage = (event: SelectChangeEvent) => {
        setIsVillage(event.target.value as string);
    };
    /* select payment input */
    const [payment, setPayment] = useState("");
    const handlePaymentChange = (event: SelectChangeEvent) => {
        setPayment(event.target.value as string);
    };

    /* modal special package */
    const [products, setProducts] = useState<Product[]>([]);
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

        Phone1: z
            .string()
            .nonempty("برجاء كتابه رقم الهاتف")
            .length(11, " تاكد من كتابه رقم صحيح مكون من 11 رقم"),
        Phone2: z.string().optional(),

        email: z
            .string()
            .nonempty("برجاء كتابة البريد الالكتروني")
            .email("برجاء كتابة بريد الالكتروني صالح"),

        OrderType: z.string().nonempty("برجاء اختيار نوع التسليم"),

        paymentType: z.string().nonempty("برجاء اختيار نوع الدفع"),
        /*  paymentType: z.enum(["0", "1", "2"], {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    default:
                        return { message: "برجاء اختيار نوع الدفع" };
                }
            },
        }), */
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

        /* isVillage: z.enum(["0", "1"], {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    default:
                        return { message: "برجاء تحديد نوع مكان التوصيل" };
                }
            },
        }), */

        /* step 3 */
        //  OrderCost: z.string().nonempty("برجاء كتابة تكلفة الطلب"),
        comments: z.string().optional(),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, formState, handleSubmit, setError } =
        useForm<FormValue>({
            defaultValues: {},
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;
    const matches = useMediaQuery("(min-width:1070px)");

    const onSubmit = (requestData: FormValue) => {
        if (
            handelCity(requestData.stateId).some(
                (city: { cityId: string; stateId: string }) =>
                    city.cityId == requestData.cityId
            )
        ) {
            /*🚀 make request 🚀*/
            const dta = {
                ...requestData,
                orderType: +requestData.OrderType,
                shippingTypeId: +requestData.shippingTypeId,
                cityId: +requestData.cityId,
                stateId: +requestData.stateId,
                paymentType: +requestData.paymentType,
                branchId: +requestData.branchId,
                orderStatus: 0,
                isVillage: requestData.isVillage === "0" ? true : false,
                orderItems: products,
            };
            console.log(dta);
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
        <>
            <TableToolbar
                pageName="الطلبات"
                btnTitle="العودة للطلبات"
                destination="/orders"
                addIcon={false}
            />{" "}
            <Stepper activeStep={activeStep}>
                {/* label names */}
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};

                    return (
                        <Step sx={{ paddingX: 1 }} key={index} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
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
                                    errors={errors.Phone1}
                                    fieldName="Phone1"
                                    label=" رقم الهاتف الاساسي"
                                    largeWidth="49%"
                                    smallWidth="100%"
                                />{" "}
                                {/* optional Phone1 */}
                                <NumericInputField
                                    register={register}
                                    errors={errors.Phone2}
                                    fieldName="Phone2"
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
                                        width: { xs: "100%", md: "49%" },
                                    }}
                                >
                                    <InputLabel
                                        error={!!errors.OrderType}
                                        color="info"
                                        id="demo-simple-select-helper-label"
                                    >
                                        نوع التسليم
                                    </InputLabel>
                                    <Select
                                        {...register("OrderType")}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={delivery}
                                        label="نوع التسليم"
                                        color="info"
                                        onChange={handleDeliveryChange}
                                    >
                                        {/*  <MenuItem value=""></MenuItem> */}
                                        <MenuItem defaultChecked value={"0"}>
                                            التسليم في الفرع
                                        </MenuItem>
                                        <MenuItem value={"1"}>
                                            التسليم اونلاين
                                        </MenuItem>
                                    </Select>
                                    <FormHelperText error={!!errors.OrderType}>
                                        {errors?.OrderType?.message}
                                    </FormHelperText>
                                </FormControl>
                                {/* paymentType */}
                                <FormControl
                                    sx={{
                                        width: { xs: "100%", md: "49%" },
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
                                        <MenuItem defaultChecked value={"0"}>
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
                                        width: { xs: "100%", md: "49%" },
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
                                    <FormHelperText error={!!errors.stateId}>
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
                                        disabled={!availableCities}
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
                                                    cityId: number;
                                                    name: string;
                                                }) => (
                                                    <MenuItem
                                                        key={city.cityId}
                                                        defaultChecked
                                                        value={city?.cityId.toString()}
                                                    >
                                                        {city?.name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        <FormHelperText error={!!errors.cityId}>
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
                                <FormHelperText error={!!errors.isVillage}>
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
                                                branch: string;
                                            }) => (
                                                <MenuItem
                                                    key={branch.id}
                                                    defaultChecked
                                                    value={branch.id.toString()}
                                                >
                                                    {branch.branch}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                    <FormHelperText error={!!errors.branchId}>
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
                                                type: string;
                                            }) => (
                                                <MenuItem
                                                    key={shiping.id}
                                                    value={shiping.id.toString()}
                                                >
                                                    {shiping.type}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                    <FormHelperText
                                        error={!!errors.shippingTypeId}
                                    >
                                        {errors?.shippingTypeId?.message}
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
                            handleCloseProductForm={handleCloseProductForm}
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
                            {/*   <div
                                style={{
                                    margin: "20px 0",
                                }}
                            >
                                <NumericInputField
                                    register={register}
                                    errors={errors.OrderCost}
                                    fieldName="OrderCost"
                                    label="تكلفة الطلب"
                                    largeWidth="90%"
                                    smallWidth="90%"
                                />{" "}
                            </div> */}

                            {/* comments */}
                            <div style={{ margin: "20px 0" }}>
                                <FormControl
                                    error={!!errors.comments}
                                    fullWidth
                                    sx={{ width: "90%" }}
                                    variant="outlined"
                                >
                                    <InputLabel color="info" htmlFor="comments">
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

                            {/* total price */}
                            <Typography fontWeight={"bold"} marginY={"10px"}>
                                اجمالي السعر :{" "}
                                {products.reduce(
                                    (acc, product) =>
                                        (Number(product.productPrice) * 10 +
                                            acc * 10) /
                                        10,
                                    0
                                )}{" "}
                                جــــنيه
                            </Typography>
                            {/* total weight */}
                            <Typography fontWeight={"bold"}>
                                اجمالي الوزن :{" "}
                                {products.reduce(
                                    (acc, product) =>
                                        (Number(product.productWeight) * 10 +
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
                        <Button type="submit" color="inherit" sx={{ m: 2 }}>
                            حفظ ومتابعه
                        </Button>
                    )}
                </Box>
                <DevTool control={control} />
            </form>
        </>
    );
};

export default AddOrderPage;
