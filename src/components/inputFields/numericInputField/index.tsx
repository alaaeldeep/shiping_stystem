/* hooks form */
import { FieldError, UseFormRegister } from "react-hook-form";

/* MUI */
import {
    OutlinedInput,
    InputLabel,
    FormControl,
    FormHelperText,
} from "@mui/material";

type props = {
    register: UseFormRegister<any>;
    errors: FieldError | undefined | any;
    fieldName:
        | "password"
        | "phoneNumber"
        | "phoneNumber2"
        | "stateSpecialPackage"
        | "Phone1"
        | "Phone2"
        | "city"
        | "orderCost"
        | "OrderCost"
        | "productWeight"
        | "productQuantity"
        | "citySpecialPackage"
        | "pickupCost"
        | "shippingCost"
        | "rejectionOrderLossRatio"
        | "status"
        | "discountType"
        | "companyOrderRatio"
        | "shippingCostSpecialPackage";
    label: string;
    largeWidth: string;
    smallWidth: string;
};

const NumericInputField = ({
    errors,
    register,
    fieldName,
    label,
    largeWidth,
    smallWidth,
}: props) => {
    return (
        <FormControl
            error={!!errors}
            fullWidth
            sx={{ width: { xs: smallWidth, md: largeWidth } }}
            variant="outlined"
        >
            <InputLabel color="info" htmlFor="outlined-adornment-password">
                {label}
            </InputLabel>
            <OutlinedInput
                {...register(fieldName)}
                color="info"
                id={`outlined-adornment-${fieldName}`}
                type={"number"}
                label={label}
            />
            <FormHelperText
                sx={{ fontWeight: "bold", letterSpacing: "0.1rem" }}
                id="component-helper-text"
            >
                {errors?.message}
            </FormHelperText>
        </FormControl>
    );
};

export default NumericInputField;
