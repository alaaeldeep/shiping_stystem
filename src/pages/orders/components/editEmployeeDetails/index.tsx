/* react router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Autocomplete,
    Backdrop,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fade,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* uuid */
import { v4 as uuidv4 } from "uuid";

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";
import NumericInputField from "../../../../components/inputFields/numericInputField";
import ProductsInLargeScreen from "../../add/components/addedProduct";

/* react query */
import UseMutate from "../../../../hooks/orders/useEditMutate";
import UseQuery, { UseQuery2 } from "../../../../hooks/serverState/useQuery";

/* react staff */
import { SyntheticEvent, useEffect, useState } from "react";

/* types */
import { OrderPost, Product, OrderRow } from "../../../../components/types";
import {
    convertBranchToID,
    convertCityToID,
    convertOrderItems,
    convertShippingTypeToID,
    convertStateToID,
} from "../../../../utils/converter";

/*  */
const steps = [
    "تسجيل البيانات الاساسيه",
    "تسجيل البيانات الاضافيه",
    " حفظ ومتابعه",
];
/*  */
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
type props = {
    open: boolean;
    handleClose: () => void;
    data: OrderRow;
};
const EditOrderDetails = ({ open, handleClose, data }: props) => {
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
    const navigate = useNavigate();
    const [stateId, setStateId] = useState<number>();
    const { data: branches } = UseQuery("/branches");

    const { data: typesOfShipping } = UseQuery("/typeOfShipping");
    const { data: states } = UseQuery("/states");
    const { data: cities, refetch } = UseQuery2(`/statesTest/${stateId}`);
    const { data: cities2 } = UseQuery(`/cities`);
    const [avalCities, setAvalCities] = useState([]);
    const { mutate } = UseMutate();

    /* select delivery input */
    const [delivery, setDelivery] = useState(data.OrderType.toString());
    const handleDeliveryChange = (event: SelectChangeEvent) => {
        setDelivery(event.target.value as "0" | "1");
    };
    /* select payment input */
    const [payment, setPayment] = useState(data.PaymentType.toString());
    const handlePaymentChange = (event: SelectChangeEvent) => {
        setPayment(event.target.value as "0" | "1" | "2");
    };
    /* select state input */
    const [state, setState] = useState<string | null>(data.StateId.state);
    const handleStateChange = (value: string | null) => {
        setState(value);
    };
    /* select city input */
    const [city, setCity] = useState<string | null>(data.CityId.city);
    const handleCityChange = (value: string | null) => {
        setCity(value);
    };
    /* select city input */
    const [branch, setBranch] = useState<string | null>(data.BranchId.branch);
    const handleBranchChange = (value: string | null) => {
        setBranch(value);
    };
    /* select city input */
    const [shippingType, setShippingType] = useState<string | null>(
        data.ShippingTypeId.type
    );
    const handleShippingTypeChange = (value: string | null) => {
        setShippingType(value);
    };

    const schema = z.object({
        /* step 1 */
        OrderType: z.enum(["0", "1"], {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    default:
                        return { message: "برجاء اختيار نوع التسليم" };
                }
            },
        }),
        ClientName: z.string().nonempty("برجاء كتابة اسم العميل بالكامل"),

        Email: z
            .string()
            .nonempty("برجاء كتابة البريد الالكتروني")
            .email("برجاء كتابة بريد الالكتروني صالح"),

        Phone1: z
            .string()
            .nonempty("برجاء كتابه رقم الهاتف")
            .length(11, " تاكد من كتابه رقم صحيح مكون من 11 رقم"),
        Phone2: z.string().optional(),

        AdressDetails: z
            .string()
            .nonempty(
                "برجاء كتابه  تفاصيل العنوان مثل اسم القرية, ورقم الشارع .."
            )
            .min(10, { message: "برجاء كتابة العنوان بتفاصيل اكتر " }),

        PaymentType: z.enum(["0", "1", "2"], {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    default:
                        return { message: "برجاء اختيار نوع الدفع" };
                }
            },
        }),

        BranchId: z.string().nonempty("برجاء اختيار الفرع"),

        ShippingTypeId: z.string().nonempty("برجاء اختيار طريقة الشحن"),

        StateId: z.string().nonempty("برجاء اختيار المحافظه"),
        CityId: z.string().nonempty("برجاء اختيار المدينه"),

        IsVillage: z.enum(["0", "1"], {
            errorMap: (issue, _ctx) => {
                switch (issue.code) {
                    default:
                        return { message: "برجاء تحديد نوع مكان التوصيل" };
                }
            },
        }),

        /* step 2 */
        productName: z.string().nonempty("برجاء كتابة اسم المنتج"),
        productQuantity: z.string().nonempty("برجاء ادخال الكمية  "),
        productWeight: z.string().nonempty("برجاء ادخال الوزن بالكيلوجـرام "),

        /* step 3 */
        OrderCost: z.string().nonempty("برجاء كتابة تكلفة الطلب"),
        comments: z.string().optional(),
    });
    type FormValue = z.infer<typeof schema>;
    const {
        register,
        control,
        formState,
        getValues,
        resetField,
        getFieldState,
    } = useForm<FormValue>({
        defaultValues: {
            ClientName: data.ClientName,
            Phone1: data.Phone1,
            Phone2: data?.Phone2,
            Email: data.Email,
            StateId: data.StateId.state,
            CityId: data.CityId.city,
            AdressDetails: data.AdressDetails,
            IsVillage: data.IsVillage ? "0" : "1",
            BranchId: data.BranchId.branch,
            ShippingTypeId: data.ShippingTypeId.type,
            OrderCost: data.OrderCost.toString(),
            comments: data?.comments,
            OrderType: data.OrderType.toString() as "1" | "0",
        },
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;
    const matches = useMediaQuery("(min-width:1070px)");
    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        const requestData = {
            id: data.id,
            ClientName: getValues("ClientName"),
            Phone1: getValues("Phone1"),
            Phone2: getValues("Phone2"),
            Email: getValues("Email"),
            OrderType: Number(getValues("OrderType")),
            PaymentType: Number(getValues("PaymentType")),
            StateId: convertStateToID(states, getValues("StateId")),
            CityId: convertCityToID(cities2, getValues("CityId")),
            AdressDetails: getValues("AdressDetails"),
            IsVillage: Number(getValues("IsVillage")) === 0 ? true : false,
            BranchId: convertBranchToID(branches, getValues("BranchId")),
            ShippingTypeId: convertShippingTypeToID(
                typesOfShipping,
                getValues("ShippingTypeId")
            ),
            OrderCost: Number(getValues("OrderCost")),
            comments: getValues("comments"),
            OrderItem: convertOrderItems(products),
            OrderStatus: 0,
        };
        if (
            (getFieldState("ClientName").isTouched &&
                getFieldState("ClientName").error) ||
            (getFieldState("Phone1").isTouched &&
                getFieldState("Phone1").error) ||
            (getFieldState("Email").isTouched &&
                getFieldState("Email").error) ||
            (getFieldState("OrderType").isTouched &&
                getFieldState("OrderType").error) ||
            (getFieldState("PaymentType").isTouched &&
                getFieldState("PaymentType").error) ||
            (getFieldState("StateId").isTouched &&
                getFieldState("StateId").error) ||
            (getFieldState("CityId").isTouched &&
                getFieldState("CityId").error) ||
            (getFieldState("AdressDetails").isTouched &&
                getFieldState("AdressDetails").error) ||
            (getFieldState("IsVillage").isTouched &&
                getFieldState("IsVillage").error) ||
            (getFieldState("BranchId").isTouched &&
                getFieldState("BranchId").error) ||
            (getFieldState("ShippingTypeId").isTouched &&
                getFieldState("ShippingTypeId").error)
        ) {
            handleReset();
        } else if (products.length === 0) {
            setActiveStep(1);
        } else {
            setActiveStep(2);
        }

        /*  🚀 make the request 🚀 */
        if (
            !getFieldState("ClientName").error &&
            !getFieldState("Phone1").error &&
            !getFieldState("Email").error &&
            !getFieldState("OrderType").error &&
            !getFieldState("PaymentType").error &&
            !getFieldState("StateId").error &&
            !getFieldState("CityId").error &&
            !getFieldState("AdressDetails").error &&
            !getFieldState("IsVillage").error &&
            !getFieldState("BranchId").error &&
            !getFieldState("ShippingTypeId").error &&
            products.length > 0 &&
            !getFieldState("OrderCost").error
        ) {
            console.log(requestData);
            mutate(requestData, {
                onSuccess: () => {
                    {
                        handleClose();
                    }
                },
            });
        }
    };

    /* control cities option */
    const handelAvailableCities = (state: string) => {
        resetField("CityId");
        setStateId(convertStateToID(states, state));
    };
    useEffect(() => {
        refetch().then((res) => setAvalCities(res?.data.data.cities));
    }, [stateId]);

    /*    const convertBranchToID = (branch: string) => {
        let BranchId!: number;
        branches?.data.forEach((branchObj: { id: number; branch: string }) => {
            if (branchObj.branch === branch) {
                BranchId = branchObj.id;
            }
        });
        return BranchId;
    }; */

    /* modal form*/
    const [products, setProducts] = useState<Product[]>(data.OrderItem);
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleAddProduct = (newProduct: Product) => {
        setProducts((prev) => [...prev, { ...newProduct }]);
    };
    /* modal */
    const modalSubmit = () => {
        if (
            getFieldState("productName").isTouched &&
            !getFieldState("productName").error &&
            getFieldState("productQuantity").isTouched &&
            !getFieldState("productQuantity").error &&
            getFieldState("productWeight").isTouched &&
            !getFieldState("productWeight").error
        ) {
            handleAddProduct({
                productName: getValues("productName"),
                productQuantity: Number(getValues("productQuantity")),
                productWeight: Number(getValues("productWeight")),
                id: uuidv4(),
            });
            resetField("productName");
            resetField("productQuantity");
            resetField("productWeight");
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
                        تعــديــل بيانات الخاصــة بالطلب رقم : {data.id}
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
                    <form onSubmit={(e) => onSubmit(e)} noValidate>
                        {/* form step 1 */}
                        {activeStep === 0 && (
                            <Box
                                sx={{
                                    width: "100%",
                                    /* backgroundColor: "secondary.main", */
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
                                            errors={errors.ClientName}
                                            fieldName="ClientName"
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

                                    {/* Email */}
                                    <div style={{ margin: "20px 0" }}>
                                        <InputField
                                            register={register}
                                            errors={errors.Email}
                                            fieldName="Email"
                                            label="البريد الالكتروني"
                                            largeWidth="90%"
                                            smallWidth="90%"
                                        />
                                    </div>

                                    {/* OrderType && PaymentType*/}
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
                                                <MenuItem value={"0"}>
                                                    التسليم في الفرع
                                                </MenuItem>
                                                <MenuItem value={"1"}>
                                                    التسليم اونلاين
                                                </MenuItem>
                                            </Select>
                                            <FormHelperText
                                                error={!!errors.OrderType}
                                            >
                                                {errors?.OrderType?.message}
                                            </FormHelperText>
                                        </FormControl>
                                        {/* PaymentType */}
                                        <FormControl
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    md: "49%",
                                                },
                                            }}
                                        >
                                            <InputLabel
                                                error={!!errors.PaymentType}
                                                color="info"
                                                id="demo-simple-select-helper-label"
                                            >
                                                نوع الدفع
                                            </InputLabel>
                                            <Select
                                                {...register("PaymentType")}
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
                                                error={!!errors.PaymentType}
                                            >
                                                {errors?.PaymentType?.message}
                                            </FormHelperText>
                                        </FormControl>
                                    </Box>

                                    {/* state name */}
                                    <div
                                        style={{
                                            margin: "20px 0",
                                        }}
                                    >
                                        <Autocomplete
                                            onChange={(_e, value) => {
                                                handleStateChange(value);

                                                handelAvailableCities(
                                                    value as string
                                                );
                                            }}
                                            defaultValue={state}
                                            noOptionsText="هذه المحافظة غير متاحة حاليا"
                                            id="StateId"
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
                                                        {...register("StateId")}
                                                        error={!!errors.StateId}
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
                                                        error={!!errors.StateId}
                                                        sx={{
                                                            fontWeight: "bold",
                                                            letterSpacing:
                                                                "0.1rem",
                                                        }}
                                                        id="component-helper-text"
                                                    >
                                                        {
                                                            errors?.StateId
                                                                ?.message
                                                        }
                                                    </FormHelperText>
                                                </>
                                            )}
                                        />{" "}
                                    </div>

                                    {/* city name */}
                                    <div style={{ margin: "20px 0" }}>
                                        <Autocomplete
                                            /*     disabled={!cities?.data} */
                                            defaultValue={city}
                                            onChange={(_e, value) =>
                                                handleCityChange(value)
                                            }
                                            noOptionsText="هذه المدينة غير متاحة حاليا"
                                            id="CityId"
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
                                                        {...register("CityId")}
                                                        error={!!errors.CityId}
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
                                                        error={!!errors.CityId}
                                                        sx={{
                                                            fontWeight: "bold",
                                                            letterSpacing:
                                                                "0.1rem",
                                                        }}
                                                        id="component-helper-text"
                                                    >
                                                        {
                                                            errors?.CityId
                                                                ?.message
                                                        }
                                                    </FormHelperText>
                                                </>
                                            )}
                                        />
                                    </div>

                                    {/* address details */}
                                    <div style={{ margin: "20px 0" }}>
                                        <FormControl
                                            error={!!errors.AdressDetails}
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
                                                {...register("AdressDetails")}
                                                color="info"
                                                id={`AdressDetails`}
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
                                                {errors?.AdressDetails?.message}
                                            </FormHelperText>
                                        </FormControl>
                                    </div>

                                    {/* isVillage */}
                                    <FormControl>
                                        <FormLabel
                                            error={!!errors.IsVillage}
                                            id="demo-radio-buttons-group-label"
                                            color="info"
                                        >
                                            هل التوصيل لقرية ؟
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            defaultValue={
                                                data.IsVillage ? 0 : 1
                                            }
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={0}
                                                {...register("IsVillage")}
                                                control={<Radio color="info" />}
                                                label="نعم"
                                            />
                                            <FormControlLabel
                                                value={1}
                                                {...register("IsVillage")}
                                                control={<Radio color="info" />}
                                                label="لا, لمدينة"
                                            />
                                        </RadioGroup>{" "}
                                        <FormHelperText
                                            error={!!errors.IsVillage}
                                        >
                                            {errors?.IsVillage?.message}
                                        </FormHelperText>
                                    </FormControl>

                                    {/* branch name */}
                                    <div style={{ margin: "20px 0" }}>
                                        <Autocomplete
                                            value={branch}
                                            onChange={(_e, value) =>
                                                handleBranchChange(value)
                                            }
                                            noOptionsText="هذا الفرع غير متاح حاليا"
                                            id="branch"
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
                                                            "BranchId"
                                                        )}
                                                        error={
                                                            !!errors.BranchId
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
                                                            !!errors.BranchId
                                                        }
                                                        sx={{
                                                            fontWeight: "bold",
                                                            letterSpacing:
                                                                "0.1rem",
                                                        }}
                                                        id="component-helper-text"
                                                    >
                                                        {
                                                            errors?.BranchId
                                                                ?.message
                                                        }
                                                    </FormHelperText>
                                                </>
                                            )}
                                        />
                                    </div>

                                    {/* typesOfShipping */}
                                    <div style={{ margin: "20px 0" }}>
                                        <Autocomplete
                                            value={shippingType}
                                            onChange={(_e, value) =>
                                                handleShippingTypeChange(value)
                                            }
                                            noOptionsText="هذا الطريقة غير متاحة حاليا"
                                            id="typesOfShipping"
                                            disablePortal
                                            options={typesOfShipping?.data.map(
                                                (option: {
                                                    id: number;
                                                    type: string;
                                                }) => option.type
                                            )}
                                            renderInput={(params) => (
                                                <>
                                                    <TextField
                                                        color="info"
                                                        {...register(
                                                            "ShippingTypeId"
                                                        )}
                                                        error={
                                                            !!errors.ShippingTypeId
                                                        }
                                                        sx={{
                                                            width: "90%",
                                                        }}
                                                        {...params}
                                                        label="طريقة الشحن"
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            type: "text",
                                                        }}
                                                    />
                                                    <FormHelperText
                                                        error={
                                                            !!errors.ShippingTypeId
                                                        }
                                                        sx={{
                                                            fontWeight: "bold",
                                                            letterSpacing:
                                                                "0.1rem",
                                                        }}
                                                        id="component-helper-text"
                                                    >
                                                        {
                                                            errors
                                                                ?.ShippingTypeId
                                                                ?.message
                                                        }
                                                    </FormHelperText>
                                                </>
                                            )}
                                        />
                                    </div>

                                    {/* step 2 */}
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
                                        onClick={handleOpenModal}
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
                                <ProductsInLargeScreen
                                    products={products}
                                    handleOpenModal={handleOpenModal}
                                    setProducts={setProducts}
                                />
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
                                                اضافه منتج
                                            </Typography>
                                            {/* product name */}
                                            <div style={{ margin: "20px 0" }}>
                                                <FormControl
                                                    error={!!errors.productName}
                                                    fullWidth
                                                    sx={{ width: "100%" }}
                                                    variant="outlined"
                                                >
                                                    <InputLabel
                                                        color="info"
                                                        htmlFor="productName"
                                                    >
                                                        اسم المنتج
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        multiline
                                                        /*   minRows={2.5} */
                                                        maxRows={10}
                                                        {...register(
                                                            "productName"
                                                        )}
                                                        color="info"
                                                        id={`productName`}
                                                        type={"text"}
                                                        label="اسم المنتج"
                                                    />
                                                    <FormHelperText
                                                        sx={{
                                                            fontWeight: "bold",
                                                            letterSpacing:
                                                                "0.1rem",
                                                        }}
                                                        id="component-helper-text"
                                                    >
                                                        {
                                                            errors?.productName
                                                                ?.message
                                                        }
                                                    </FormHelperText>
                                                </FormControl>
                                            </div>
                                            {/* product quantity */}
                                            <div
                                                style={{
                                                    margin: "20px 0",
                                                }}
                                            >
                                                <NumericInputField
                                                    register={register}
                                                    errors={
                                                        errors.productQuantity
                                                    }
                                                    fieldName="productQuantity"
                                                    label="الكمية"
                                                    largeWidth="100%"
                                                    smallWidth="100%"
                                                />
                                            </div>
                                            {/*   product weight */}
                                            <div
                                                style={{
                                                    margin: "20px 0",
                                                }}
                                            >
                                                <NumericInputField
                                                    register={register}
                                                    errors={
                                                        errors.productWeight
                                                    }
                                                    fieldName="productWeight"
                                                    label="الوزن (كجــم)"
                                                    largeWidth="100%"
                                                    smallWidth="100%"
                                                />
                                            </div>
                                            {/* add special pakage */}
                                            <Button
                                                onClick={modalSubmit}
                                                sx={{
                                                    width: "100%",
                                                    marginX: "auto",
                                                    height: "40px",
                                                    fontWeight: "bold",
                                                }}
                                                variant="contained"
                                            >
                                                اضافة
                                            </Button>

                                            <DevTool control={control} />
                                        </Box>
                                    </Fade>
                                </Modal>{" "}
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
                                            errors={errors.OrderCost}
                                            fieldName="OrderCost"
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
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditOrderDetails;
