/* react staff */
import { SyntheticEvent, useState } from "react";

/* MUI */
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
    Checkbox,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Paper,
    Typography,
    CircularProgress,
    Backdrop,
} from "@mui/material"; /* rect-form */
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

import InputField from "../../../../components/inputFields/textInputField/inputfield";
/* toast */
import { toast } from "react-toastify";

/* utils */
import {
    convertIdToPermission,
    convertPermissionToID,
    permissions,
} from "../../../../utils/converter";

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

const EditPermissionDetailsSmallScreen = ({
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
            defaultValues: { roleName: roleName },
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    /* mobile view */
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
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
        <>
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
                            <CloseIcon
                                sx={{ color: "red", fontSize: "1.7rem" }}
                            />
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
                                /*  backgroundColor: "secondary.main", */
                                padding: "15px 0px",
                                borderRadius: "25px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "2rem",
                                justifyContent: "center",
                                mb: 3,
                                boxShadow:
                                    "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                            }}
                        >
                            {/* role name with default value */}
                            <Box sx={{ marginX: "auto", width: "90%" }}>
                                <InputField
                                    register={register}
                                    errors={errors.roleName}
                                    fieldName="roleName"
                                    label=" اسم الصلاحية "
                                    largeWidth="90%"
                                    smallWidth="90%"
                                />
                            </Box>

                            <Box>
                                <Paper sx={{ width: "100%" }}>
                                    {/* old selected permissions */}
                                    {selectedPermissions.map(
                                        (
                                            row: {
                                                privilegeId: number;
                                                id: number;
                                                permissions: boolean[];
                                            },
                                            index: number
                                        ) => {
                                            /* save the select persimmons ,  to exclude theme from the other permission options */
                                            selected.push(
                                                convertIdToPermission(
                                                    row.privilegeId
                                                )
                                            );
                                            return (
                                                <Accordion
                                                    key={index}
                                                    sx={{ px: 5 }}
                                                    expanded={
                                                        expanded ===
                                                        index.toString()
                                                    }
                                                    onChange={handleChange(
                                                        index.toString()
                                                    )}
                                                >
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <ExpandMoreIcon />
                                                        }
                                                        aria-controls="panel1bh-content"
                                                        id="panel1bh-header"
                                                    >
                                                        {/* pemsion name */}
                                                        <Typography
                                                            sx={{
                                                                color: "text.secondary",
                                                            }}
                                                        >
                                                            {" "}
                                                            {convertIdToPermission(
                                                                row.privilegeId
                                                            )}
                                                            {/*  {row.privilegeId} */}
                                                        </Typography>
                                                    </AccordionSummary>

                                                    <AccordionDetails>
                                                        {/* id */}
                                                        <Typography>
                                                            الرقم : {index + 1}
                                                        </Typography>
                                                        {/* permission name */}
                                                        <Typography>
                                                            الصلاحية :{" "}
                                                            {row.privilegeId}
                                                        </Typography>
                                                        {/* add */}
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: "8px",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    width: "60px",
                                                                }}
                                                            >
                                                                {" "}
                                                                اضافة
                                                            </Typography>

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
                                                        </Box>
                                                        {/* view */}
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: "8px",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    width: "60px",
                                                                }}
                                                            >
                                                                {" "}
                                                                عرض
                                                            </Typography>

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
                                                        </Box>
                                                        {/* edit */}
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: "8px",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    width: "60px",
                                                                }}
                                                            >
                                                                {" "}
                                                                تعديل
                                                            </Typography>

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
                                                        </Box>
                                                        {/* delete */}
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: "8px",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    width: "60px",
                                                                }}
                                                            >
                                                                {" "}
                                                                حذف
                                                            </Typography>

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
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
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
                                                <Accordion
                                                    key={index}
                                                    sx={{ px: 5 }}
                                                    expanded={
                                                        expanded ===
                                                        index.toString()
                                                    }
                                                    onChange={handleChange(
                                                        index.toString()
                                                    )}
                                                >
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <ExpandMoreIcon />
                                                        }
                                                        aria-controls="panel1bh-content"
                                                        id="panel1bh-header"
                                                    >
                                                        {/* pemsion name */}
                                                        <Typography
                                                            sx={{
                                                                color: "text.secondary",
                                                            }}
                                                        >
                                                            {convertIdToPermission(
                                                                row.privilegeId
                                                            )}
                                                        </Typography>
                                                    </AccordionSummary>

                                                    <AccordionDetails>
                                                        {/* id */}
                                                        <Typography>
                                                            الرقم : {index + 1}
                                                        </Typography>
                                                        {/* permission name */}
                                                        <Typography>
                                                            الصلاحية :{" "}
                                                            {convertIdToPermission(
                                                                row.privilegeId
                                                            )}
                                                        </Typography>
                                                        {/* add */}
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: "8px",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    width: "60px",
                                                                }}
                                                            >
                                                                {" "}
                                                                اضافة
                                                            </Typography>

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
                                                        </Box>
                                                        {/* view */}
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: "8px",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    width: "60px",
                                                                }}
                                                            >
                                                                {" "}
                                                                عرض
                                                            </Typography>

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
                                                        </Box>
                                                        {/* edit */}
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: "8px",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    width: "60px",
                                                                }}
                                                            >
                                                                {" "}
                                                                تعديل
                                                            </Typography>

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
                                                        </Box>
                                                        {/* delete */}
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: "8px",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    width: "60px",
                                                                }}
                                                            >
                                                                {" "}
                                                                حذف
                                                            </Typography>

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
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
                                            );
                                        }
                                    })}
                                </Paper>
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
        </>
    );
};

export default EditPermissionDetailsSmallScreen;
