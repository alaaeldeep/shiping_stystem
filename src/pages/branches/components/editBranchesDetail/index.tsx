/* MUI */
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
} from "@mui/material"; /* rect-form */
import CloseIcon from "@mui/icons-material/Close";

/* hook form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* react query */
import UseMutate from "../../../../hooks/branches/useEditMutate";

/* components */
import InputField from "../../../../components/inputFields/textInputField/inputfield";

type EditBrancheProps = {
    open: boolean;
    branch: string;
    id: number;
    handleClose: () => void;
};
const EditBranchesDetails = ({
    open,
    handleClose,
    branch,
    id,
}: EditBrancheProps) => {
    const { mutate } = UseMutate();
    const schema = z.object({
        branch: z.string().nonempty(" برجاء كتابة اسم الفرع"),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState } = useForm<FormValue>({
        defaultValues: {
            branch,
        },
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;
    /*   🚀 make the request 🚀 */
    const onSubmit = (data: FormValue) => {
        mutate(
            { ...data, id },
            {
                onSuccess: () => {
                    {
                        handleClose();
                    }
                },
            }
        );
    };
    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            open={open}
            onClose={handleClose}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    تعــديــل بيانات الخاصــة بفرع : {branch}
                </DialogTitle>
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </div>

            <DialogContent>
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
                            تحديث
                        </Button>
                    </Box>
                    <DevTool control={control} />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditBranchesDetails;
