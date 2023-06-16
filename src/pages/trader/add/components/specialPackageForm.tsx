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

import NumericInputField from "../../../../components/inputFields/numericInputField";

/* react query */

/* toast */
import { toast } from "react-toastify";
import {
    convertIDToCities,
    convertIDToStates,
} from "../../../../utils/converter";

type props = {
    open: boolean;

    citiesToRepresentative: any;
    states: any;
    setSpecialPackage: any;
    handleCloseSpecialPackageForm: () => void;
};
const SpecialPackageForm = ({
    open,
    handleCloseSpecialPackageForm,
    citiesToRepresentative,
    states,
    setSpecialPackage,
}: props) => {
    /* state& city state */
    const stateRef = useRef("");
    const cityRef = useRef("");
    const [availableCities, setAvailableCities] = useState<
        {
            cityId: number;
            stateId: number;
            name: string;
        }[]
    >();

    const [state, setState] = useState<string>();
    const handelStateChange = (event: SelectChangeEvent) => {
        stateRef.current = event.target.value as string;
        setState(event.target.value as string);
        setAvailableCities(handelCity(stateRef.current));
        console.log(stateRef.current);
    };

    const handelCity = (stateId: string) => {
        return citiesToRepresentative?.data.filter((city: any) => {
            if (city.stateId.toString() === stateId) return city;
        });
    };

    /* city state */
    const [city, setCity] = useState<string>();
    const handelCityChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
        cityRef.current = event.target.value as string;
        console.log(cityRef.current);
    };
    /* 
    handelCity(stateRef.current).some(
        (city: { cityId: number; stateId: number }) =>
            city.stateId == +getValues("StateIdSpecialPackage")
    ); */

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
        handleSubmit,
        getValues,
    } = useForm<FormValue>({
        defaultValues: {},
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;

    const modalSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log();
        // console.log(cityRef.current);
        //  console.log(stateRef.current);
        /*  console.log(getValues("shippingCostSpecialPackage")); */

        console.log(
            convertIDToCities(
                citiesToRepresentative,
                getValues("cityIdSpecialPackage")
            )
        );
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
                (city: { cityId: string; stateId: string }) =>
                    city.cityId == getValues("cityIdSpecialPackage")
            )
        ) {
            console.log({
                state: getValues("StateIdSpecialPackage"),
                city: getValues("cityIdSpecialPackage"),
                shippingCost: getValues("shippingCostSpecialPackage"),
                id: uuidv4(),
            });

            setSpecialPackage((prev: any) => {
                const indx = prev.findIndex(
                    (specialPackage: any) =>
                        specialPackage.city ===
                        convertIDToCities(
                            citiesToRepresentative,
                            getValues("cityIdSpecialPackage")
                        )
                );
                console.log(indx + "index");
                console.log(prev);
                if (indx === -1) {
                    return [
                        ...prev,
                        {
                            state: convertIDToStates(
                                states,
                                getValues("StateIdSpecialPackage")
                            ),
                            city: convertIDToCities(
                                citiesToRepresentative,
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
                        /*  padding: "50px", */
                    }}
                    noValidate
                >
                    <Box
                        sx={{
                            width: "100%",
                            /*    backgroundColor: "secondary.main", */
                            padding: "10px 0px",
                            borderRadius: "25px",
                            display: "flex",
                            flexDirection: "column",
                            /*   border: "1px solid #9ba4b5b7", */
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
                                                    cityId: number;
                                                    name: string;
                                                }) => (
                                                    <MenuItem
                                                        key={city.cityId}
                                                        value={city?.cityId.toString()}
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
                    <DevTool control={control} />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SpecialPackageForm;
