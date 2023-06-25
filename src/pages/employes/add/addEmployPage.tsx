/* react staff */
import { useState } from "react";

/* react router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";

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

/* store */
import { useOwnStore } from "../../../store";

const AddEmployPage = () => {
    const navigate = useNavigate();
    const { data: branches } = UseQuery("/Branches/active");
    const { data: roles } = UseQuery("/RolesPrivileges/simple");
    const { mutate, isLoading } = UseMutate();

    const canActivateEmployeeAdd = useOwnStore(
        (store) => store.user.permissions?.Employees?.[0]
    );
    const canActivateEmployeeView = useOwnStore(
        (store) => store.user.permissions?.Employees?.[1]
    );

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

        phoneNumber: z
            .string()
            .nonempty("برجاء كتابه رقم الهاتف")
            .length(11, " تاكد من كتابه رقم صحيح مكون من 11 رقم"),

        branchId: z
            .string({
                errorMap: (issue, _ctx) => {
                    switch (issue.code) {
                        default:
                            return { message: "برجاء اختيار الفرع " };
                    }
                },
            })
            .nonempty("برجاء اختيار الفرع"),

        roleId: z
            .string({
                errorMap: (issue, _ctx) => {
                    switch (issue.code) {
                        default:
                            return { message: "برجاء اختيار الصلاحية " };
                    }
                },
            })
            .nonempty("برجاء اختيار الصلاحية"),

        // roleId: z.string().nonempty("برجاء تحديد الصلاحيات"),

        address: z.string().nonempty("برجاء كتابة العنوان"),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState, setError } =
        useForm<FormValue>({
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    const onSubmit = (data: FormValue) => {
        /*  🚀 make the request 🚀 */
        const requestData = { ...data, branchId: +data.branchId };

        mutate(requestData, {
            onSuccess: () => {
                {
                    navigate("/employees");
                }
            },
            onError: (err: any) => {
                if (err.message.includes("Username")) {
                    setError("userName", {
                        message:
                            "اسم المستخدم موجود بالفعل, برجاء كتابه اسم جديد",
                    });
                    toast.error(
                        "اسم المستخدم موجود بالفعل, برجاء كتابه اسم جديد",
                        {
                            position: toast.POSITION.BOTTOM_LEFT,
                            autoClose: 2000,
                            theme: "dark",
                        }
                    );
                }
                if (err.message.includes("Email")) {
                    setError("email", {
                        message:
                            "البريد الالكتروني موجود بالفعل, برجاء كتابه بريد جديد",
                    });
                    toast.error(
                        "البريد الالكتروني موجود بالفعل, برجاء كتابه بريد جديد",
                        {
                            position: toast.POSITION.BOTTOM_LEFT,
                            autoClose: 2000,
                            theme: "dark",
                        }
                    );
                }
                if (err.message.includes("Passwords")) {
                    setError("password", {
                        message: "كلمة السر يجب ان تحتوي علي ارقام ",
                    });
                    toast.error("كلمة السر يجب ان تحتوي علي ارقام ", {
                        position: toast.POSITION.BOTTOM_LEFT,
                        autoClose: 2000,
                        theme: "dark",
                    });
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
                addBtn={!!canActivateEmployeeAdd && !!canActivateEmployeeView}
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
                                            name: string;
                                        }) => (
                                            <MenuItem
                                                key={branch.id}
                                                defaultChecked
                                                value={branch.id.toString()}
                                            >
                                                {branch.name}
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
                                            name: string;
                                        }) => (
                                            <MenuItem
                                                key={role.id}
                                                value={role.id.toString()}
                                            >
                                                {role.name}
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
                </Box>{" "}
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {/*                 <DevTool control={control} /> */}
            </form>
        </>
    );
};

export default AddEmployPage;
