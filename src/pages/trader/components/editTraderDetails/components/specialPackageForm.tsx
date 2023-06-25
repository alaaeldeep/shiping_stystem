/* react staff */
import { useState, useRef, SyntheticEvent } from "react";

/* MUI */
import {
    Box,
    Button,
    FormHelperText,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
} from "@mui/material";
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
import NumericInputField from "../../../../../components/inputFields/numericInputField";

/* react query */

/* toast */
import { toast } from "react-toastify";

/* utils */
import {
    convertIDToStates,
    convertIDToCities,
} from "../../../../../utils/converter";

type props = {
    open: boolean;
    avalCities: any;
    states: any;
    setSpecialPackage: any;
    handleCloseSpecialPackageForm: () => void;
};
const SpecialPackageForm = ({
    open,
    handleCloseSpecialPackageForm,
    avalCities,
    states,
    setSpecialPackage,
}: props) => {
    /* state& city state */
    const stateRef = useRef("");
    const cityRef = useRef("");
    const [availableCities, setAvailableCities] = useState<
        {
            id: number;
            stateId: number;
            name: string;
        }[]
    >();

    const [state, setState] = useState<string>();
    const handelStateChange = (event: SelectChangeEvent) => {
        stateRef.current = event.target.value as string;
        setState(event.target.value as string);
        setAvailableCities(handelCity(stateRef.current));
        /*         console.log(stateRef.current); */
    };

    const handelCity = (stateId: string) => {
        return avalCities?.data.filter((city: any) => {
            if (city.stateId.toString() === stateId) return city;
        });
    };

    /* city state */
    const [city, setCity] = useState<string>();
    const handelCityChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
        cityRef.current = event.target.value as string;
        /*   console.log(cityRef.current); */
    };

    /* zod validation */
    const schema = z.object({
        /* step 3 */
        cityIdSpecialPackage: z.string().nonempty("برجاء اختيار المحافظه"),
        StateIdSpecialPackage: z.string().nonempty("برجاء اختيار المدينه"),
        shippingCostSpecialPackage: z
            .string()
            .nonempty("برجاء ادخال تكلفه الشحن"),
    });

    /*          */
    type FormValue = z.infer<typeof schema>;
    /* hooks form */
    const {
        register,
        control,
        resetField,
        formState,
        getFieldState,
        setError,
        getValues,
    } = useForm<FormValue>({
        defaultValues: {},
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;

    const modalSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (
            (getFieldState("StateIdSpecialPackage").isTouched &&
                getFieldState("StateIdSpecialPackage").error) ||
            (!getFieldState("StateIdSpecialPackage").isTouched &&
                getFieldState("cityIdSpecialPackage").isTouched &&
                getFieldState("cityIdSpecialPackage").error) ||
            (!getFieldState("cityIdSpecialPackage").isTouched &&
                getFieldState("shippingCostSpecialPackage").isTouched &&
                getFieldState("shippingCostSpecialPackage").error) ||
            !getFieldState("shippingCostSpecialPackage").isTouched
        ) {
            toast.warn("برجاء اكمال الحقول الفارغة ", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000,
                theme: "dark",
            });
        } else if (
            getFieldState("StateIdSpecialPackage").isTouched &&
            !getFieldState("StateIdSpecialPackage").error &&
            getFieldState("cityIdSpecialPackage").isTouched &&
            !getFieldState("cityIdSpecialPackage").error &&
            getFieldState("shippingCostSpecialPackage").isTouched &&
            !getFieldState("shippingCostSpecialPackage").error &&
            handelCity(getValues("StateIdSpecialPackage")).some(
                (city: { id: string; stateId: string }) =>
                    city.id == getValues("cityIdSpecialPackage")
            )
        ) {
            /*  console.log({
                state: getValues("StateIdSpecialPackage"),
                city: getValues("cityIdSpecialPackage"),
                shippingCost: getValues("shippingCostSpecialPackage"),
                id: uuidv4(),
            }); */

            setSpecialPackage((prev: any) => {
                const indx = prev.findIndex(
                    (specialPackage: any) =>
                        specialPackage.city ===
                        convertIDToCities(
                            avalCities,
                            getValues("cityIdSpecialPackage")
                        )
                );

                if (indx === -1) {
                    return [
                        ...prev,
                        {
                            state: convertIDToStates(
                                states,
                                getValues("StateIdSpecialPackage")
                            ),
                            city: convertIDToCities(
                                avalCities,
                                getValues("cityIdSpecialPackage")
                            ),
                            shippingCost: getValues(
                                "shippingCostSpecialPackage"
                            ),
                            id: uuidv4(),
                        },
                    ];
                } else {
                    prev[indx].shippingCost = getValues(
                        "shippingCostSpecialPackage"
                    );
                    return prev;
                }
            });

            resetField("cityIdSpecialPackage");
            setCity(undefined);
            resetField("shippingCostSpecialPackage");
            resetField("StateIdSpecialPackage");
            setState(undefined);
            handleCloseSpecialPackageForm();
        } else {
            setError("cityIdSpecialPackage", {
                message: "برجاء اختيار  مدينة من المدن المتاحة",
            });
            toast.warn("برجاء اختيار  مدينة من المدن المتاحة", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000,
                theme: "dark",
            });
        }
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"lg"}
            open={open}
            onClose={handleCloseSpecialPackageForm}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    اضافه باقه مميزه
                </DialogTitle>
                <DialogActions>
                    <IconButton onClick={handleCloseSpecialPackageForm}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </div>

            <DialogContent>
                <form
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                    noValidate
                >
                    <Box
                        sx={{
                            width: "100%",
                            padding: "10px 0px",
                            borderRadius: "25px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            mb: 3,
                            boxShadow:
                                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                        }}
                    >
                        <Box sx={{ marginX: "auto", width: "90%" }}>
                            {/* state name */}
                            <div style={{ margin: "20px 0" }}>
                                <FormControl
                                    sx={{
                                        width: "90%",
                                    }}
                                >
                                    <InputLabel
                                        error={!!errors.StateIdSpecialPackage}
                                        color="info"
                                        id="demo-simple-select-helper-label"
                                    >
                                        اسم المحافظة
                                    </InputLabel>
                                    <Select
                                        {...register("StateIdSpecialPackage")}
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
                                        error={!!errors.StateIdSpecialPackage}
                                    >
                                        {errors?.StateIdSpecialPackage?.message}
                                    </FormHelperText>
                                </FormControl>
                            </div>

                            {/* city name */}
                            {
                                <div style={{ margin: "20px 0" }}>
                                    <FormControl
                                        sx={{
                                            width: "90%",
                                        }}
                                        disabled={!availableCities}
                                    >
                                        <InputLabel
                                            error={
                                                !!errors.cityIdSpecialPackage
                                            }
                                            color="info"
                                            id="demo-simple-select-helper-label"
                                        >
                                            اسم المدينة
                                        </InputLabel>
                                        <Select
                                            {...register(
                                                "cityIdSpecialPackage"
                                            )}
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
                                                        value={city?.id.toString()}
                                                    >
                                                        {city?.name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        <FormHelperText
                                            error={
                                                !!errors.cityIdSpecialPackage
                                            }
                                        >
                                            {
                                                errors?.cityIdSpecialPackage
                                                    ?.message
                                            }
                                        </FormHelperText>
                                    </FormControl>
                                </div>
                            }

                            {/* rejection ratio */}
                            <div style={{ margin: "20px 0" }}>
                                <NumericInputField
                                    register={register}
                                    errors={errors.shippingCostSpecialPackage}
                                    fieldName="shippingCostSpecialPackage"
                                    label="سعر الشحن"
                                    largeWidth="90%"
                                    smallWidth="90%"
                                />
                            </div>
                        </Box>

                        <Button
                            type="submit"
                            onClick={modalSubmit}
                            sx={{
                                width: "80%",
                                marginX: "auto",
                                height: "40px",
                                fontWeight: "bold",
                            }}
                            variant="contained"
                        >
                            اضافة
                        </Button>
                    </Box>
                    {/*   <DevTool control={control} /> */}
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SpecialPackageForm;
