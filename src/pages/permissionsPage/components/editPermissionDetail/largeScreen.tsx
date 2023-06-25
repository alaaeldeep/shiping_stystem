/* react staff */
import { SyntheticEvent } from "react";

/* MUI */
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
    TableCell,
    TableRow,
    Checkbox,
    TableBody,
    Table,
    TableContainer,
    Backdrop,
    CircularProgress,
    FormHelperText,
    FormControl,
    OutlinedInput,
    InputLabel,
} from "@mui/material"; /* rect-form */
import CloseIcon from "@mui/icons-material/Close";

/* motion */
import { motion } from "framer-motion";

/* hook form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../../hooks/permissions/useEditMutate";

/* components */
//import { headCells } from "../../add/addPermissionPage";

import CustomTableHead from "../../../../components/table/tableHead";

/* toast */
import { toast } from "react-toastify";

import {
    convertIdToPermission,
    convertPermissionToID,
    permissions,
} from "../../../../utils/converter";
export const headCells: any = [
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
type EditPermissionDetailsProps = {
    open: boolean;
    roleName: string;
    id: string;
    selectedPermissions: any;
    handleClose: () => void;
};
type permissionType = {
    roleName: string;
    permissions: any;
};

const EditPermissionDetailsLargeScreen = ({
    open,
    handleClose,
    roleName,
    selectedPermissions,
    id,
}: EditPermissionDetailsProps) => {
    const { mutate, isLoading } = UseMutate();

    /*  zod */
    const schema = z.object({
        roleName: z.string().nonempty("برجاء كتابة اسم الصلاحية"),
        Permissions: z.record(z.string(), z.array(z.string())),
    });
    type FormValue = z.infer<typeof schema>;

    /* hooks form */
    const { register, control, formState, getValues, getFieldState, setError } =
        useForm<FormValue>({
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    /* container for old selected permissions */
    const selected: string[] = [];

    /* handel submit */
    const handleEditSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (getFieldState("roleName").error) {
            toast.warn("برجاء كتابة اسم الصلاحية", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000,
                theme: "dark",
            });
        }

        if (!getFieldState("roleName").error) {
            const permission: permissionType = {
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
                    permission.permissions.push({
                        privilegeId: convertPermissionToID(Permission),
                        permissions: permissionsAuthority,
                    });
                }
            }
            /*🚀 make the request 🚀*/

            if (permission.permissions.length > 0) {
                mutate(
                    {
                        roleName: permission.roleName,
                        roleId: id,
                        rolePrivileges: permission.permissions,
                    },
                    {
                        onSuccess() {
                            handleClose();
                        },
                        onError: (err: any) => {
                            if (err.message.includes("already taken")) {
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
                            if (err.message.includes("SuperAdmin")) {
                                setError("roleName", {
                                    message:
                                        "لا يمكن التعديل علي هذه الصلاحية ",
                                });
                                toast.error(
                                    "لا يمكن التعديل علي هذه الصلاحية ",
                                    {
                                        position: toast.POSITION.BOTTOM_LEFT,
                                        autoClose: 2000,
                                        theme: "dark",
                                    }
                                );
                            }
                            if (err.message.includes("invalid")) {
                                setError("roleName", {
                                    message: "برجاء كتابة اسم الصلاحية",
                                });
                                toast.error("برجاء كتابة اسم الصلاحية", {
                                    position: toast.POSITION.BOTTOM_LEFT,
                                    autoClose: 2000,
                                    theme: "dark",
                                });
                            }
                        },
                    }
                );
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
        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            open={open}
            onClose={handleClose}
        >
            <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.3,
                }}
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    تعــديــل الصـــلاحـيــات الخاصــة بــــ : {roleName}
                </DialogTitle>
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </motion.div>

            <DialogContent>
                <form
                    onSubmit={(e) => handleEditSubmit(e)}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                    noValidate
                >
                    <Box
                        sx={{
                            width: "100%",
                            /*     backgroundColor: "secondary.main", */
                            padding: "15px 0px",
                            borderRadius: "25px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                            justifyContent: "center",
                            mb: 3,
                            /*    border: "1px solid #9ba4b5b7", */
                            boxShadow:
                                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                        }}
                    >
                        {/* role name with default value */}
                        <Box sx={{ marginX: "auto", width: "90%" }}>
                            <FormControl
                                error={!!errors.roleName}
                                fullWidth
                                sx={{ width: { xs: "90%", md: "90%" } }}
                                variant="outlined"
                            >
                                <InputLabel
                                    color="info"
                                    htmlFor="outlined-adornment-password"
                                >
                                    اسم الصلاحية
                                </InputLabel>
                                <OutlinedInput
                                    {...register("roleName")}
                                    color="info"
                                    id={`outlined-adornment-roleName`}
                                    type={"text"}
                                    label={"اسم الصلاحية "}
                                />
                                <FormHelperText
                                    sx={{
                                        fontWeight: "bold",
                                        letterSpacing: "0.1rem",
                                    }}
                                    id="component-helper-text"
                                >
                                    {errors.roleName?.message}
                                </FormHelperText>
                            </FormControl>
                        </Box>

                        {/* permissions checkBox */}
                        <Box>
                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size={"medium"}
                                >
                                    <CustomTableHead headCell={headCells} />
                                    <TableBody>
                                        {/* old selected permissions */}
                                        {selectedPermissions.map(
                                            (row: {
                                                privilegeId: number;
                                                id: number;
                                                permissions: boolean[];
                                            }) => {
                                                /* save the select persimmons ,  to exclude theme from the other permission options */

                                                selected.push(
                                                    convertIdToPermission(
                                                        row.privilegeId
                                                    )
                                                );

                                                return (
                                                    /* represent old row */
                                                    <TableRow
                                                        hover
                                                        tabIndex={-1}
                                                        key={row.id}
                                                        sx={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        {
                                                            <>
                                                                {/* id */}
                                                                {/* <TableCell
                                                                    align="center"
                                                                    component="th"
                                                                    id={labelId}
                                                                    scope="row"
                                                                    padding="none"
                                                                >
                                                                    {index + 1}
                                                                </TableCell> */}

                                                                {/* permision name */}
                                                                <TableCell align="center">
                                                                    {convertIdToPermission(
                                                                        row.privilegeId
                                                                    )}
                                                                </TableCell>

                                                                {/* add */}
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        value="add"
                                                                        {...register(
                                                                            `Permissions.${convertIdToPermission(
                                                                                row.privilegeId
                                                                            )}`
                                                                        )}
                                                                        size="small"
                                                                        color="success"
                                                                        defaultChecked={
                                                                            row
                                                                                .permissions[0]
                                                                        }
                                                                    />
                                                                </TableCell>

                                                                {/*  view*/}
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        value="view"
                                                                        {...register(
                                                                            `Permissions.${convertIdToPermission(
                                                                                row.privilegeId
                                                                            )}`
                                                                        )}
                                                                        size="small"
                                                                        color="success"
                                                                        defaultChecked={
                                                                            row
                                                                                .permissions[1]
                                                                        }
                                                                    />
                                                                </TableCell>

                                                                {/* edit */}
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        value="edit"
                                                                        {...register(
                                                                            `Permissions.${convertIdToPermission(
                                                                                row.privilegeId
                                                                            )}`
                                                                        )}
                                                                        size="small"
                                                                        color="success"
                                                                        defaultChecked={
                                                                            row
                                                                                .permissions[2]
                                                                        }
                                                                    />
                                                                </TableCell>

                                                                {/* delete */}
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        value="delete"
                                                                        {...register(
                                                                            `Permissions.${convertIdToPermission(
                                                                                row.privilegeId
                                                                            )}`
                                                                        )}
                                                                        size="small"
                                                                        color="success"
                                                                        defaultChecked={
                                                                            row
                                                                                .permissions[3]
                                                                        }
                                                                    />
                                                                </TableCell>
                                                            </>
                                                        }
                                                    </TableRow>
                                                );
                                            }
                                        )}

                                        {/* other permission options can select from it  */}
                                        {permissions.map((row, index) => {
                                            /* show only available options ,after we already displayed the selected permissions*/
                                            if (
                                                !selected.includes(
                                                    convertIdToPermission(
                                                        row.privilegeId
                                                    )
                                                )
                                            ) {
                                                return (
                                                    /* represent not selected row  */
                                                    <TableRow
                                                        hover
                                                        tabIndex={-1}
                                                        key={index}
                                                        sx={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        {
                                                            <>
                                                                {/* id */}
                                                                {/*         <TableCell
                                                                    align="center"
                                                                    component="th"
                                                                    id={labelId}
                                                                    scope="row"
                                                                    padding="none"
                                                                >
                                                                    {index + 1}
                                                                </TableCell> */}

                                                                {/* permision name */}
                                                                <TableCell align="center">
                                                                    {convertIdToPermission(
                                                                        row.privilegeId
                                                                    )}
                                                                </TableCell>

                                                                {/* add */}
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        value="add"
                                                                        {...register(
                                                                            `Permissions.${convertIdToPermission(
                                                                                row.privilegeId
                                                                            )}`
                                                                        )}
                                                                        size="small"
                                                                        color="success"
                                                                    />
                                                                </TableCell>

                                                                {/* edit */}
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        value="view"
                                                                        {...register(
                                                                            `Permissions.${convertIdToPermission(
                                                                                row.privilegeId
                                                                            )}`
                                                                        )}
                                                                        size="small"
                                                                        color="success"
                                                                    />
                                                                </TableCell>

                                                                {/* view */}
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        value="edit"
                                                                        {...register(
                                                                            `Permissions.${convertIdToPermission(
                                                                                row.privilegeId
                                                                            )}`
                                                                        )}
                                                                        size="small"
                                                                        color="success"
                                                                    />
                                                                </TableCell>

                                                                {/* delete */}
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        value="delete"
                                                                        {...register(
                                                                            `Permissions.${convertIdToPermission(
                                                                                row.privilegeId
                                                                            )}`
                                                                        )}
                                                                        size="small"
                                                                        color="success"
                                                                    />
                                                                </TableCell>
                                                            </>
                                                        }
                                                    </TableRow>
                                                );
                                            }
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        {/* update btn */}
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
                    <DevTool control={control} />{" "}
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
            </DialogContent>
        </Dialog>
    );
};

export default EditPermissionDetailsLargeScreen;
