/* react staff */
import { useState } from "react";

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
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
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

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";
import NumericInputField from "../../../../components/inputFields/numericInputField";

/* toast */
import { toast } from "react-toastify";

/* types */
import { EmployeeGET } from "../../../../components/types";

type EditEmployeeDetailsProps = {
    open: boolean;
    data: EmployeeGET;
    handleClose: () => void;
};

const EditEmployeeDetails = ({
    open,
    handleClose,
    data,
}: EditEmployeeDetailsProps) => {
    const { mutate } = UseMutate();
    const { data: branches } = UseQuery("/branches");
    const { data: roles } = UseQuery("/Permissions");

    /* branch state */
    const [branch, setBranch] = useState<string>(data.branch.id.toString());
    const handelBranchChange = (event: SelectChangeEvent) => {
        setBranch(event.target.value as string);
    };
    /* role state */
    const [role, setRole] = useState<string>(data.role.id.toString());
    const handelRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };
    console.log(role);
    console.log(branch);
    const schema = z.object({
        fullName: z.string().nonempty("برجاء كتابة اسم الموظف بالكامل"),

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

        branchId: z.string().nonempty("برجاء اختيار الفرع"),

        phoneNumber: z
            .string()
            .nonempty("برجاء كتابه رقم الهاتف")
            .length(11, " تاكد من كتابه رقم صحيح مكون من 11 رقم"),

        roleId: z.string().nonempty("برجاء تحديد الصلاحيات"),

        address: z.string().nonempty("برجاء كتابة العنوان"),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState, getValues } =
        useForm<FormValue>({
            defaultValues: {
                fullName: data.fullName,
                userName: data.userName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address: data.address,
                roleId: data.role.id.toString(),
                branchId: data.branch.id.toString(),
            },
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    const onSubmit = (FormValue: FormValue) => {
        /*  🚀 make the request 🚀 */
        const request = { ...FormValue, id: data.id };
        mutate(request, {
            onSuccess: () => {
                {
                    handleClose();
                }
            },
        });
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
                        تعــديــل بيانات الخاصــة بــــ : {data.userName}
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
                    <form
                        onSubmit={handleSubmit(onSubmit, onError)}
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
                                border: "1px solid #9ba4b5b7",
                                justifyContent: "center",
                                mb: 3,
                            }}
                        >
                            <Box sx={{ marginX: "auto", width: "90%" }}>
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

                                {/* roles */}
                                <div style={{ margin: "20px 0" }}>
                                    <FormControl
                                        sx={{
                                            width: "90%",
                                        }}
                                    >
                                        <InputLabel
                                            error={!!errors.roleId}
                                            color="info"
                                            id="demo-simple-select-helper-label"
                                        >
                                            اسم الصلاحية
                                        </InputLabel>
                                        <Select
                                            {...register("roleId")}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={role}
                                            label="اسم الصلاحية"
                                            color="info"
                                            onChange={handelRoleChange}
                                        >
                                            {roles?.data.map(
                                                (role: {
                                                    id: number;
                                                    roleName: string;
                                                }) => (
                                                    <MenuItem
                                                        value={role.id.toString()}
                                                    >
                                                        {role.roleName}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        <FormHelperText error={!!errors.roleId}>
                                            {errors?.roleId?.message}
                                        </FormHelperText>
                                    </FormControl>
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
                                تحديث
                            </Button>
                        </Box>
                        <DevTool control={control} />
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditEmployeeDetails;
