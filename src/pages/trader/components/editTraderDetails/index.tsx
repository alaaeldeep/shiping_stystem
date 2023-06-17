/* react staff */
import { useState, useRef } from "react";

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
import UseQuery from "../../../../hooks/serverState/useQuery";

/* toast */
import { toast } from "react-toastify";

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";
import NumericInputField from "../../../../components/inputFields/numericInputField";
import SpecialPackageInLargeScreen from "./components/specialPackageInLargeScreen";
import SpecialPackageInSmallScreen from "./components/specialPackageInSmallScreen";
import SpecialPackageForm from "./components/specialPackageForm";

/* types */
import { TraderRow } from "../../../../components/types";
import { SpecialPackage } from "../../../../components/types";
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
    /* mui */
    const matches = useMediaQuery("(min-width:1070px)");

    /* fetch data */
    const { mutate } = UseMutate();
    const { data: branches } = UseQuery("/branches");
    const { data: states } = UseQuery("/states");
    const { data: citiesToRepresentative } = UseQuery(
        "/citiesToRepresentative"
    );

    /* state& city state */
    const stateRef = useRef("");
    const [availableCities, setAvailableCities] = useState<
        {
            cityId: number;
            stateId: number;
            name: string;
        }[]
    >([
        {
            cityId: data.city.cityId,
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
    };
    /* branch state */
    const [branch, setBranch] = useState<string>(data.branch.id.toString());
    const handelBranchChange = (event: SelectChangeEvent) => {
        setBranch(event.target.value as string);
    };
    /* city state */
    const [city, setCity] = useState<string>(data.city.cityId.toString());
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
    const [SpecialPackage, setSpecialPackage] = useState<SpecialPackage[]>(
        data.specialPackages
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

        /* step 3 */
        stateSpecialPackage: z.string().optional(),
        citySpecialPackage: z.string().optional(),
        shippingCostSpecialPackage: z.string().optional(),
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
                stateId: data.state.name + "",
                cityId: data.city.name + "",
                rejectedOrderlossRatio: data.rejectedOrderlossRatio,
            },
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;
    type FormValue = z.infer<typeof schema>;
    const onSubmit = (data: FormValue) => {
        if (
            handelCity(data.stateId).some(
                (city: { cityId: string; stateId: string }) =>
                    city.cityId == data.cityId
            )
        ) {
            console.log({ ...data, specialPackages: SpecialPackage });
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    تعــديــل بيانات الخاصــة بالتاجر : {data.userName}
                </DialogTitle>
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </div>

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
                                                            cityId: number;
                                                            name: string;
                                                        }) => (
                                                            <MenuItem
                                                                key={
                                                                    city.cityId
                                                                }
                                                                defaultChecked
                                                                value={city?.cityId.toString()}
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
                                            citiesToRepresentative={
                                                citiesToRepresentative
                                            }
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
                        <DevTool control={control} />
                    </form>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default EditTraderDetails;
