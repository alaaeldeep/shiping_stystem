/* react router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Box,
    Button,
    FormHelperText,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Backdrop,
    CircularProgress,
} from "@mui/material";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../hooks/cities/useAddMutate";
import UseQuery from "../../../hooks/serverState/useQuery";

/* toast */
import { toast } from "react-toastify";

/* components */
import { TableToolbar } from "../../../components/table/tableToolBar";
import InputField from "../../../components/inputFields/textInputField/inputfield";
import { useState } from "react";
import NumericInputField from "../../../components/inputFields/numericInputField";

/* store */
import { useOwnStore } from "../../../store";

const AddCityPage = () => {
    const canActivateCitiesAdd = useOwnStore(
        (store) => store.user.permissions?.Cities?.[0]
    );
    const canActivateCitiesView = useOwnStore(
        (store) => store.user.permissions?.Cities?.[1]
    );

    const navigate = useNavigate();
    const { data: availableStates } = UseQuery("/states/active");
    const { mutate, isLoading } = UseMutate();

    /* states */
    const [state, setState] = useState<string>("");
    const handelStateChange = (event: SelectChangeEvent) => {
        setState(event.target.value as string);
    };

    const schema = z.object({
        stateId: z.string().nonempty(" برجاء كتابة اسم المحافظه"),
        city: z.string().nonempty(" برجاء كتابة اسم المدينة"),
        shippingCost: z.string().nonempty("برجاء ادخال قيمة الشحن "),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState, setError } =
        useForm<FormValue>({
            defaultValues: {},
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    /* 🚀 make the request 🚀  */
    const onSubmit = (data: FormValue) => {
        mutate(
            {
                name: data.city,
                shippingCost: Math.abs(+data.shippingCost),
                stateId: +state,
            },
            {
                onSuccess: () => {
                    {
                        navigate("/cities");
                    }
                },
                onError: (err: any) => {
                    if (err.message.includes("already existed")) {
                        setError("city", {
                            message: "  هذه المدينة موجوده بالفعل",
                        });
                        toast.error("هذه المدينة موجوده بالفعل", {
                            position: toast.POSITION.BOTTOM_LEFT,
                            autoClose: 2000,
                            theme: "dark",
                        });
                    }
                },
            }
        );
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
                pageName="المدن"
                btnTitle="العودة للمدن"
                destination="/cities  "
                addIcon={false}
                addBtn={!!canActivateCitiesView && !!canActivateCitiesAdd}
            />{" "}
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
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
                                    {availableStates?.data.map(
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
                        </div>

                        {/* city name */}
                        <div style={{ margin: "20px 0" }}>
                            <InputField
                                register={register}
                                errors={errors.city}
                                fieldName="city"
                                label=" اسم المدينة "
                                largeWidth="90%"
                                smallWidth="90%"
                            />
                        </div>

                        {/* shipping cost */}
                        <div style={{ margin: "20px 0" }}>
                            <NumericInputField
                                register={register}
                                errors={errors.shippingCost}
                                fieldName="shippingCost"
                                label="تكلفة الشحن العادية"
                                largeWidth="90%"
                                smallWidth="90%"
                            />
                        </div>
                    </Box>

                    <Button
                        type="submit"
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
                {/* <DevTool control={control} /> */}{" "}
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
        </>
    );
};

export default AddCityPage;
