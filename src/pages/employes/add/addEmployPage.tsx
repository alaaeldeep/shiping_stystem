/* react staff */
import { useState } from "react";

/* react router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* components */
import InputField from "../../../components/inputFields/textInputField/inputfield";
import NumericInputField from "../../../components/inputFields/numericInputField";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* react query */
import UseMutate from "../../../hooks/empoyees/useAddMutate";
import UseQuery from "../../../hooks/serverState/useQuery";

/* toast */
import { toast } from "react-toastify";

const AddEmployPage = () => {
    const navigate = useNavigate();
    const { data: branches } = UseQuery("/branches");
    const { data: roles } = UseQuery("/permissions");
    const { mutate } = UseMutate();
    /* branch state */
    const [branch, setBranch] = useState<string>();
    const handelBranchChange = (event: SelectChangeEvent) => {
        setBranch(event.target.value as string);
    };
    /* role state */
    const [role, setRole] = useState<string>();
    const handelRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };
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
            defaultValues: {},
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;
    const matches = useMediaQuery("(min-width:1070px)");
    const onSubmit = (data: FormValue) => {
        /*  🚀 make the request 🚀 */
        mutate(data, {
            onSuccess: () => {
                {
                    navigate("/employees");
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
            <TableToolbar
                pageName="الموظفين"
                btnTitle="العودة للموظفين"
                destination="/employees"
                addIcon={false}
            />{" "}
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
                                <FormHelperText error={!!errors.branchId}>
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
                        اضافة
                    </Button>
                </Box>
                <DevTool control={control} />
            </form>
        </>
    );
};

export default AddEmployPage;
