/* react router */
import { useNavigate } from "react-router";

/* MUI */
import { Box, Button, useMediaQuery } from "@mui/material";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../hooks/branches/useAddMutate";

/* components */
import InputField from "../../../components/inputFields/textInputField/inputfield";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* types */
import { HeadCell } from "../../../components/types";

export const headCells: HeadCell[] = [
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
const schema = z.object({
    roleName: z.string().nonempty("برجاء كتابة اسم الصلاحية"),
    Permissions: z.record(z.string(), z.array(z.string())),
});
export type FormValue = z.infer<typeof schema>;
export const rows = [
    {
        id: 1,
        permissionName: "الصلاحيات",
    },
    {
        id: 2,
        permissionName: "الاعدادات",
    },
    {
        id: 3,
        permissionName: "البنوك",
    },
    {
        id: 4,
        permissionName: "الخزن",
    },
    {
        id: 5,
        permissionName: "الافرع",
    },
    {
        id: 6,
        permissionName: "الموظفين",
    },
    {
        id: 7,
        permissionName: "التجار",
    },
    {
        id: 8,
        permissionName: "المناديب",
    },
    {
        id: 9,
        permissionName: "المحافظات",
    },
    {
        id: 10,
        permissionName: "المدن",
    },

    {
        id: 11,
        permissionName: "الطلبات",
    },
    {
        id: 12,
        permissionName: "الحسابات",
    },
    {
        id: 13,
        permissionName: "تقارير الطلبات",
    },
];

const AddBranchesPage = () => {
    const navigate = useNavigate();
    const { mutate } = UseMutate();
    const schema = z.object({
        branch: z.string().nonempty(" برجاء كتابة اسم الفرع"),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState } = useForm<FormValue>({
        defaultValues: {
            branch: "",
        },
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;
    const matches = useMediaQuery("(min-width:1070px)");
    /*  🚀 make the request 🚀  */
    const onSubmit = (data: FormValue) => {
        mutate(data, {
            onSuccess: () => {
                {
                    navigate("/branches");
                }
            },
        });
    };

    return (
        <>
            <TableToolbar
                pageName="الفروع"
                btnTitle="العودة للفروع"
                destination="/branches  "
                addIcon={false}
            />{" "}
            <form
                onSubmit={handleSubmit(onSubmit)}
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
                        <div style={{ margin: "20px 0" }}>
                            <InputField
                                register={register}
                                errors={errors.branch}
                                fieldName="branch"
                                label="اسم الفرع"
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

export default AddBranchesPage;
