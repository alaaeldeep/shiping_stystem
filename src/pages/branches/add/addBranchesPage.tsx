/* react router */
import { useNavigate } from "react-router";

/* MUI */
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";

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

/* toast */
import { toast } from "react-toastify";

/* store */
import { useOwnStore } from "../../../store";

/* types */

/*  */

const AddBranchesPage = () => {
    /* store */
    const canActivateBranchesAdd = useOwnStore(
        (store) => store.user.permissions?.Branches?.[0]
    );
    const canActivateBranchesView = useOwnStore(
        (store) => store.user.permissions?.Branches?.[1]
    );

    const navigate = useNavigate();
    const { mutate, isLoading } = UseMutate();
    const schema = z.object({
        name: z.string().nonempty(" برجاء كتابة اسم الفرع"),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState } = useForm<FormValue>({
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;

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
                pageName="الفروع"
                btnTitle="العودة للفروع"
                destination="/branches  "
                addIcon={false}
                addBtn={!!canActivateBranchesAdd && !!canActivateBranchesView}
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
                        <div style={{ margin: "20px 0" }}>
                            <InputField
                                register={register}
                                errors={errors.name}
                                fieldName="name"
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
            </form>{" "}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default AddBranchesPage;
