/* MUI */
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    useMediaQuery,
    Box,
    Button,
    FormHelperText,
    TextField,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* types */
import { OrderRow, Product } from "../../../../components/types";

/* react router */
import { useNavigate } from "react-router";
import { useState } from "react";

type OrderDetailsProps = {
    open: boolean;
    data: OrderRow;

    handleClose: () => void;
};
const statuses = [
    {
        status: "جديد",
        id: 0,
    },
    {
        status: "قيد الانتظار",
        id: 1,
    },
    {
        status: "تم التسليم للمندوب",
        id: 2,
    },
    {
        status: "تم التسليم",
        id: 3,
    },
    {
        status: "لا يمكن الوصول",
        id: 4,
    },
    {
        status: "تم التاجيل",
        id: 5,
    },
    {
        status: "تم التسليم جزئيا",
        id: 6,
    },
    {
        status: "تم الالغاء من قبل المستلم",
        id: 7,
    },
    {
        status: "تم الرفض مع الدفع",
        id: 8,
    },
    {
        status: "رفض مع سداد الجزاء",
        id: 9,
    },
    {
        status: "رفض ولم يتم الدفع",
        id: 10,
    },
];
const ChangeOrderStatus = ({ open, handleClose, data }: OrderDetailsProps) => {
    const matches = useMediaQuery("(min-width:1070px)");
    const navigate = useNavigate();
    const [value, setValue] = useState<string | null>();
    const [inputValue, setInputValue] = useState("");
    //const { mutate } = UseMutate();
    /* select status input */
    /*  const [status, seStatus] = useState(""); */
    /*   const handlestatusChange = (event: SelectChangeEvent) => {
        seStatus(event.target.value as "0" | "1");
    }; */
    const schema = z.object({
        status: z.enum(
            [
                "جديد",
                "قيد الانتظار",
                "تم التسليم للمندوب",
                "تم التسليم",
                "لا يمكن الوصول",
                "تم التاجيل",
                "تم التسليم جزئيا",
                "تم الالغاء من قبل المستلم",
                "تم الرفض مع الدفع",
                "رفض مع سداد الجزاء",
                "رفض ولم يتم الدفع",
            ],
            {
                errorMap: (issue, _ctx) => {
                    switch (issue.code) {
                        default:
                            return { message: " برجاء تحدد حالة الطلب" };
                    }
                },
            }
        ),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState, getValues } =
        useForm<FormValue>({
            defaultValues: {},
            mode: "onTouched",
            resolver: zodResolver(schema),
        });
    const { errors } = formState;

    /* 🚀 make the request 🚀  */
    const onSubmit = () => {
        /*  mutate(getValues(), {
            onSuccess: () => {
                {
                    navigate("/status");
                }
            },
        }); */
    };
    return (
        <Dialog
            fullWidth={true}
            maxWidth={"lg"}
            open={open}
            onClose={handleClose}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* id */}
                <DialogTitle width={{ xs: "230px", sm: "auto" }}>
                    تغيير الحالة الخاصــة بالطلب : {data.id}
                </DialogTitle>{" "}
                {/* close btn */}
                <DialogActions>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: "red", fontSize: "1.7rem" }} />
                    </IconButton>
                </DialogActions>
            </div>

            {/* content=> view OrderDetails */}
            <DialogContent sx={{ height: "300px" }}>
                <Box
                    sx={{
                        paddingX: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
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
                            {/* status */}
                            <Box sx={{ marginX: "auto", width: "90%" }}>
                                <div style={{ margin: "30px 0" }}>
                                    <Autocomplete
                                        noOptionsText="برجاء الاختيار من الحالات المتاحة"
                                        id="status"
                                        disablePortal
                                        options={statuses.map(
                                            (option) => option.status
                                        )}
                                        renderInput={(params) => (
                                            <>
                                                <TextField
                                                    color="info"
                                                    {...register("status")}
                                                    error={!!errors.status}
                                                    sx={{
                                                        width: "90%",
                                                    }}
                                                    {...params}
                                                    label="اسم الحالة"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        type: "text",
                                                    }}
                                                />
                                                <FormHelperText
                                                    error={!!errors.status}
                                                    sx={{
                                                        fontWeight: "bold",
                                                        letterSpacing: "0.1rem",
                                                    }}
                                                    id="component-helper-text"
                                                >
                                                    {errors?.status?.message}
                                                </FormHelperText>
                                            </>
                                        )}
                                    />
                                </div>
                            </Box>

                            {/* status */}
                            {/*  <FormControl
                                sx={{
                                    width: { xs: "100%", md: "49%" },
                                }}
                            >
                                <InputLabel
                                    error={!!errors.status}
                                    color="info"
                                    id="demo-simple-selectStatus-helper-label"
                                >
                                    نوع التسليم
                                </InputLabel>
                                <Select
                                    {...register("status")}
                                    labelId="demo-simple-selectStatus-helper-label"
                                    id="demo-simple-select-helper"
                                    value={status}
                                    label="اسم الحالة"
                                    color="info"
                                    onChange={handlestatusChange}
                                >
                                    {statuses.map((status, index) => (
                                        <MenuItem value={status.id} key={index}>
                                            {status.status}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText error={!!errors.status}>
                                    {errors?.status?.message}
                                </FormHelperText>
                            </FormControl> */}

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
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeOrderStatus;
