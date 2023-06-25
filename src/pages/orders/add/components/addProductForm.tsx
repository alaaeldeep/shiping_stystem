/* react staff */
import { SyntheticEvent } from "react";

/* MUI */
import {
    Box,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
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

type props = {
    open: boolean;
    setProducts: any;
    handleCloseProductForm: () => void;
};

const AddProductForm = ({
    handleCloseProductForm,
    open,
    setProducts,
}: props) => {
    /* zod validation */
    const schema = z.object({
        /* step 3 */
        productName: z.string().nonempty("برجاء كتابة اسم المنتج"),
        productQuantity: z.string().nonempty("برجاء ادخال الكمية  "),
        productWeight: z.string().nonempty("برجاء ادخال الوزن بالكيلوجـرام "),
        /*   productPrice: z.string().nonempty("برجاء كتابة سعر المنتج "), */
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
            (getFieldState("productName").isTouched &&
                getFieldState("productName").error) ||
            (!getFieldState("productName").isTouched &&
                getFieldState("productQuantity").isTouched &&
                getFieldState("productQuantity").error) ||
            (!getFieldState("productQuantity").isTouched &&
                getFieldState("productWeight").isTouched &&
                getFieldState("productWeight").error) ||
            !getFieldState("productWeight").isTouched
        ) {
            toast.warn("برجاء اكمال الحقول الفارغة ", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000,
                theme: "dark",
            });
        } else if (
            getFieldState("productName").isTouched &&
            !getFieldState("productName").error &&
            getFieldState("productQuantity").isTouched &&
            !getFieldState("productQuantity").error &&
            getFieldState("productWeight").isTouched &&
            !getFieldState("productWeight").error
        ) {
            setProducts((prev: any) => [
                ...prev,
                {
                    productName: getValues("productName"),
                    productQuantity: Math.abs(+getValues("productQuantity")),
                    productWeight: Math.abs(+getValues("productWeight")),
                    /*     productPrice: +getValues("productPrice"), */
                    id: uuidv4(),
                },
            ]);

            resetField("productName");
            resetField("productQuantity");
            resetField("productWeight");
            /*   resetField("productPrice"); */
            handleCloseProductForm();
        }
    };
    return (
        <Dialog
            fullWidth={true}
            maxWidth={"lg"}
            open={open}
            onClose={handleCloseProductForm}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    اضافه باقه مميزه
                </DialogTitle>
                <DialogActions>
                    <IconButton onClick={handleCloseProductForm}>
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
                            {/* product name */}
                            <div style={{ margin: "20px 0" }}>
                                {/*  <InputField
                                    register={register}
                                    errors={errors.productName}
                                    fieldName="productName"
                                    label="اسم المنتج"
                                    largeWidth="90%"
                                    smallWidth="90%"
                                /> */}
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
                                        maxRows={10}
                                        {...register("productName")}
                                        color="info"
                                        id={`productName`}
                                        type={"text"}
                                        label="اسم المنتج"
                                    />
                                    <FormHelperText
                                        sx={{
                                            fontWeight: "bold",
                                            letterSpacing: "0.1rem",
                                        }}
                                        id="component-helper-text"
                                    >
                                        {errors?.productName?.message}
                                    </FormHelperText>
                                </FormControl>
                            </div>{" "}
                            {/* product Price*/}
                            {/* <div style={{ margin: "20px 0" }}>
                                <NumericInputField
                                    register={register}
                                    errors={errors.productPrice}
                                    fieldName="productPrice"
                                    label="سعر المنتج"
                                    largeWidth="100%"
                                    smallWidth="100%"
                                />
                            </div> */}
                            {/* product quantity*/}
                            <div style={{ margin: "20px 0" }}>
                                <NumericInputField
                                    register={register}
                                    errors={errors.productQuantity}
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
                                    errors={errors.productWeight}
                                    fieldName="productWeight"
                                    label="الوزن (كجــم)"
                                    largeWidth="100%"
                                    smallWidth="100%"
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
                    {/*  <DevTool control={control} /> */}
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddProductForm;
