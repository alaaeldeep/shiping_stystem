/* react staff */
import { SyntheticEvent } from "react";

/* react router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Typography,
    useMediaQuery,
} from "@mui/material";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../hooks/permissions/useAddMutate";

/* toast */
import { toast } from "react-toastify";

/* components */
import InputField from "../../../components/inputFields/textInputField/inputfield";
import { AddPermissionLargeScreen } from "./addPermissionLargeScreen";
import { AddPermissionSmallScreen } from "./addPermissionSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* utils */
import { convertPermissionToID } from "../../../utils/converter";

/* store */
import { useOwnStore } from "../../../store";

export const headCells: any = [
    {
        id: "id",

        label: "الرقم",
    },
    {
        id: "name",

        label: "الصلاحية",
    },
    {
        id: "add",

        label: "اضافه",
    },
    {
        id: "view",

        label: "عرض",
    },
    {
        id: "edit",

        label: "تعديل",
    },
    {
        id: "delete",

        label: "حذف",
    },
];

/*  */

type permissionType = {
    roleName: string;
    permissions: any;
};
const AddPermissionPage = () => {
    const canActivatePrivilegesAdd = useOwnStore(
        (store) => store.user.permissions?.Privileges?.[0]
    );
    const canActivatePrivilegesView = useOwnStore(
        (store) => store.user.permissions?.Privileges?.[1]
    );

    const navigate = useNavigate();
    /* controll mobile view */
    const matches = useMediaQuery("(min-width:1070px)");

    /*  */
    const { mutate, isLoading } = UseMutate();

    const schema = z.object({
        roleName: z.string().nonempty("برجاء كتابة اسم الصلاحية"),
        Permissions: z.record(z.string(), z.array(z.string())),
    });
    type FormValue = z.infer<typeof schema>;

    /* handel form */
    const {
        register,
        control,
        formState,
        getValues,
        getFieldState,
        setFocus,
        setError,
    } = useForm<FormValue>({
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;

    /* onsubmit add permission */
    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (!getFieldState("roleName").isTouched) {
            setFocus("roleName");
            toast.warn("برجاء كتابة اسم الصلاحية", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000,
                theme: "dark",
            });
        }
        if (
            getFieldState("roleName").isTouched &&
            getFieldState("roleName").error
        ) {
            toast.warn("برجاء كتابة اسم الصلاحية", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000,
                theme: "dark",
            });
        }

        if (
            getFieldState("roleName").isTouched &&
            !getFieldState("roleName").error
        ) {
            const newPermission: permissionType = {
                roleName: getValues().roleName,
                permissions: [],
            };

            for (const Permission in getValues().Permissions) {
                /* transform from string to true,false */
                const permissionsAuthority = [];
                if (
                    getValues()?.Permissions[Permission] &&
                    getValues()?.Permissions[Permission].length > 0
                ) {
                    getValues()?.Permissions[Permission].includes("add")
                        ? (permissionsAuthority[0] = true)
                        : (permissionsAuthority[0] = false);
                    getValues()?.Permissions[Permission].includes("view")
                        ? (permissionsAuthority[1] = true)
                        : (permissionsAuthority[1] = false);
                    getValues()?.Permissions[Permission].includes("edit")
                        ? (permissionsAuthority[2] = true)
                        : (permissionsAuthority[2] = false);
                    getValues()?.Permissions[Permission].includes("delete")
                        ? (permissionsAuthority[3] = true)
                        : (permissionsAuthority[3] = false);
                }

                if (permissionsAuthority.length > 0) {
                    newPermission.permissions.push({
                        privilegeId: convertPermissionToID(Permission),
                        permissions: permissionsAuthority,
                    });
                }
            }
            if (newPermission.permissions.length > 0) {
                /*🚀 make the request 🚀*/

                const addRole = {
                    roleName: newPermission.roleName,
                    rolePrivileges: newPermission.permissions,
                };

                mutate(addRole, {
                    onSuccess() {
                        navigate("/Permissions");
                    },
                    onError: (err: any) => {
                        if (err.message.includes("Role name")) {
                            setError("roleName", {
                                message:
                                    "اسم الصلاحية موجود بالفعل, برجاء كتابه اسم جديد",
                            });
                            toast.error(
                                "اسم الصلاحية موجود بالفعل, برجاء كتابه اسم جديد",
                                {
                                    position: toast.POSITION.BOTTOM_LEFT,
                                    autoClose: 2000,
                                    theme: "dark",
                                }
                            );
                        }
                    },
                });
            } else {
                toast.warn("برجاء تحديد  صلاحيات المجموعه قبل الاضافة", {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000,
                    theme: "dark",
                });
            }
        }
    };

    return (
        <>
            <TableToolbar
                pageName="الصلاحيات"
                btnTitle="العودة للصلاحيات"
                destination="/Permissions"
                addIcon={false}
                addBtn={
                    !!canActivatePrivilegesAdd && !!canActivatePrivilegesView
                }
            />{" "}
            <form
                onSubmit={(e) => onSubmit(e)}
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
                        /*  backgroundColor: "secondary.main", */
                        padding: "10px 0px",
                        borderRadius: "25px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",

                        justifyContent: "center",
                        mb: 3,
                    }}
                >
                    <Box sx={{ marginX: "auto", width: "90%" }}>
                        <InputField
                            register={register}
                            errors={errors.roleName}
                            fieldName="roleName"
                            label=" اسم الصلاحية الجديدة"
                            largeWidth="90%"
                            smallWidth="90%"
                        />
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                bgcolor: "primary.main",
                                p: 1.6,
                                borderRadius: "1.3rem",
                                fontWeight: "bold",
                                mb: 1,
                                width: "80%",
                                marginX: "auto",
                            }}
                        >
                            حدد الصلاحيات
                        </Typography>
                        {matches ? (
                            <AddPermissionLargeScreen
                                headCell={headCells}
                                register={register}
                                selected={null}
                            />
                        ) : (
                            <AddPermissionSmallScreen
                                register={register}
                                selected={null}
                            />
                        )}
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
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </form>{" "}
        </>
    );
};

export default AddPermissionPage;
