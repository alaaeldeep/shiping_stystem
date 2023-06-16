/* import { Autocomplete, FormHelperText, TextField } from "@mui/material";
import { FieldError, UseFormRegister } from "react-hook-form";

type props = {
    register: UseFormRegister<any>;
    errors: FieldError | undefined | any;
    data: any[];
    fieldName:
        | "name"
        | "userName"
        | "password"
        | "email"
        | "phone"
        | "role"
        | "permissionName"
        | "roleName"
        | "permissions"
        | "fullName"
        | "address"
        | "branch"
        | "storeName"
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
const AutoCompleteField = ({
    errors,
    register,
    fieldName,
    label,
    data,
    largeWidth,
    smallWidth,
}: props) => {
    return (
        <div style={{ margin: "20px 0" }}>
            <Autocomplete
                noOptionsText="هذا الفرع غير متاح حاليا"
                id="state"
                disablePortal
                options={data?.map(
                    (option: { id: number; state: string }) => option.state
                )}
                renderInput={(params) => (
                    <>
                        <TextField
                            color="info"
                            {...register(fieldName)}
                            error={!!errors}
                            sx={{ width: { xs: smallWidth, md: largeWidth } }}
                            {...params}
                            label={label}
                            InputProps={{
                                ...params.InputProps,
                                type: "text",
                            }}
                        />
                        <FormHelperText
                            error={!!errors}
                            sx={{
                                fontWeight: "bold",
                                letterSpacing: "0.1rem",
                            }}
                            id="component-helper-text"
                        >
                            {errors?.message}
                        </FormHelperText>
                    </>
                )}
            />
        </div>
    );
};

export default AutoCompleteField;
 */
