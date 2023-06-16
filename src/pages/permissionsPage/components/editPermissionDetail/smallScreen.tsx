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
} from "@mui/material"; /* rect-form */
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    id: number;
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
    const { mutate } = UseMutate();
    console.log(id);
    /*  zod */
    const schema = z.object({
        roleName: z.string().nonempty("برجاء كتابة اسم الصلاحية"),
        Permissions: z.record(z.string(), z.array(z.string())),
    });
    type FormValue = z.infer<typeof schema>;

    /* hooks form */
    const { register, control, formState, getValues, getFieldState } =
        useForm<FormValue>({
            defaultValues: { roleName: roleName },
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    /* container for old selected permissions */
    const selected: string[] = [];

    /* mobile view */
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
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
            //console.log(getValues().Permissions);
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
                console.log({
                    roleName: permission.roleName,
                    roleId: id,
                    rolePrivileges: permission.permissions,
                });
                /* mutate(
                    {
                        roleName: permission.roleName,
                        roleId: id,
                        rolePrivileges: permission.permissions,
                    },
                    {
                        onSuccess() {
                            handleClose();
                        },
                    }
                ); */
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
                <div
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
                </div>

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
                                border: "1px solid #9ba4b5b7",
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
                                                permissionName: string;
                                                permissions: boolean[];
                                            },
                                            index: number
                                        ) => {
                                            /* save the select persimmons ,  to exclude theme from the other permission options */
                                            selected.push(row.permissionName);
                                            const labelId = `enhanced-table-checkbox-${index}`;
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
                                                        {/* id */}
                                                        <Typography
                                                            sx={{
                                                                width: "33%",
                                                                flexShrink: 0,
                                                            }}
                                                        >
                                                            {index + 1}
                                                        </Typography>
                                                        {/* pemsion name */}
                                                        <Typography
                                                            sx={{
                                                                color: "text.secondary",
                                                            }}
                                                        >
                                                            {row.permissionName}
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
                                                            {row.permissionName}
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
                                                                    `Permissions.${row.permissionName}`
                                                                )}
                                                                defaultChecked={
                                                                    row
                                                                        .permissions[0]
                                                                }
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
                                                                    `Permissions.${row.permissionName}`
                                                                )}
                                                                defaultChecked={
                                                                    row
                                                                        .permissions[1]
                                                                }
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
                                                                    `Permissions.${row.permissionName}`
                                                                )}
                                                                defaultChecked={
                                                                    row
                                                                        .permissions[2]
                                                                }
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
                                                                    `Permissions.${row.permissionName}`
                                                                )}
                                                                defaultChecked={
                                                                    row
                                                                        .permissions[3]
                                                                }
                                                                size="small"
                                                                color="success"
                                                            />
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
                                            );
                                        }
                                    )}
                                    {/* other permission options can select from it  */}
                                    {permissions.map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;
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
                                                        {/* id */}
                                                        <Typography
                                                            sx={{
                                                                width: "33%",
                                                                flexShrink: 0,
                                                            }}
                                                        >
                                                            {index + 1}
                                                        </Typography>
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
                        <DevTool control={control} />
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditPermissionDetailsSmallScreen;
