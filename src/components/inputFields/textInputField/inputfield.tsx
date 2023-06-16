/* react staff */
import { useState } from "react";

/* hooks form */
import { FieldError, UseFormRegister } from "react-hook-form";

/* MUI */
import {
    IconButton,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormControl,
    FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type props = {
    register: UseFormRegister<any>;
    errors: FieldError | undefined | any;
    fieldName:
        | "name"
        | "userName"
        | "password"
        | "Email"
        | "email"
        | "ClientName"
        | "phone"
        | "phoneNumber"
        | "role"
        | "clientName"
        | "permissionName"
        | "roleName"
        | "permissions"
        | "fullName"
        | "address"
        | "branch"
        | "storeName"
        | "productName"
        | "state"
        | "stateSpecialPackage"
        | "city"
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
const InputField = ({
    errors,
    register,
    fieldName,
    label,
    largeWidth,
    smallWidth,
}: props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

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
                type={
                    showPassword || fieldName !== "password"
                        ? "text"
                        : "password"
                }
                endAdornment={
                    fieldName === "password" ? (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ) : null
                }
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

export default InputField;
