/* react staff */
import { useState } from "react";

/* MUI */
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Box,
    Button,
    FormHelperText,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* motion */
import { motion } from "framer-motion";

/* hooks form */
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* toast */
import { toast } from "react-toastify";

/* react query */
import { UseMutateStatus } from "../../../../hooks/orders/useEditMutate";

/* utils */
import {
    RepresentativeStatusesOptions,
    AdminStatusesOptions,
} from "../../../../utils/converter";

/* types */
import { OrderRow } from "../../../../components/types";
import NumericInputField from "../../../../components/inputFields/numericInputField";

/* store */
import { useOwnStore } from "../../../../store";

type OrderDetailsProps = {
    open: boolean;
    data: OrderRow;
    handleClose: () => void;
};

const ChangeOrderStatus = ({ open, handleClose, data }: OrderDetailsProps) => {
    const userType = useOwnStore((store) => store.user.userType);

    const [status, setStatus] = useState<string>("");

    const { mutate, isLoading } = UseMutateStatus();
    const handelStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };
    const schema = z.object({
        orderStatus: z.string().nonempty({ message: "برجاء تحديد حالة الطلب" }),
        receivedCost: z.any(),
        receivedShippingCost: z.any(),
    });
    type FormValue = z.infer<typeof schema>;
    const {
        register,
        control,
        handleSubmit,
        formState,
        getValues,
        setError,
        resetField,
    } = useForm<FormValue>({
        defaultValues: {},
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;

    /* 🚀 make the request 🚀  */
    const onSubmit = (requestData: FormValue) => {
        if (
            !Math.abs(+getValues("receivedCost")) &&
            ["3", "6"].includes(status)
        ) {
            setError("receivedCost", {
                message: " برجاء ادخال المبلغ المستلم ",
            });
            toast.warn(" برجاء ادخال المبلغ المستلم ", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000,
                theme: "dark",
            });
        }
        if (
            !Math.abs(+getValues("receivedShippingCost")) &&
            ["3", "6", "8", "9"].includes(status)
        ) {
            setError("receivedShippingCost", {
                message: " برجاء ادخال مبلغ الشحن المستلم ",
            });
            toast.warn(" برجاء ادخال مبلغ الشحن المستلم ", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000,
                theme: "dark",
            });
        }

        if (!["3", "6", "8", "9"].includes(status)) {
            mutate(
                {
                    id: data.id,
                    userType: userType,
                    orderStatus: +requestData.orderStatus,
                },
                {
                    onSuccess: () => {
                        {
                            handleClose();
                        }
                    },
                }
            );
        }

        if (
            ["8", "9"].includes(status) &&
            Math.abs(+getValues("receivedShippingCost"))
        ) {
            resetField("receivedShippingCost");
            console.log({
                id: data.id,
                userType: userType,
                orderStatus: +requestData.orderStatus,
                receivedShippingCost: Math.abs(
                    +requestData.receivedShippingCost
                ),
            });
            mutate(
                {
                    id: data.id,
                    userType: userType,
                    orderStatus: +requestData.orderStatus,
                    receivedCost: Math.abs(+requestData.receivedCost),
                    receivedShippingCost: Math.abs(
                        +requestData.receivedShippingCost
                    ),
                },
                {
                    onSuccess: () => {
                        {
                            handleClose();
                        }
                    },
                }
            );
        }

        if (
            ["3", "6"].includes(status) &&
            Math.abs(+getValues("receivedShippingCost")) &&
            Math.abs(+getValues("receivedCost"))
        ) {
            resetField("receivedCost");
            resetField("receivedShippingCost");
            mutate(
                {
                    id: data.id,
                    userType: userType,
                    orderStatus: +requestData.orderStatus,
                    receivedCost: Math.abs(+requestData.receivedCost),
                    receivedShippingCost: Math.abs(
                        +requestData.receivedShippingCost
                    ),
                },
                {
                    onSuccess: () => {
                        {
                            handleClose();
                        }
                    },
                }
            );
        }
    };

    const onError = () => {
        toast.warn("برجاء اختيار حالة الطلب ", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000,
            theme: "dark",
        });
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"md"}
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
            </motion.div>

            {/* content=> view OrderDetails */}
            <DialogContent>
                <Box
                    sx={{
                        marginX: "20px",
                        paddingX: "20px",

                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        mb: 2,
                        borderRadius: "25px",
                        boxShadow:
                            "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                    }}
                >
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
                                <div style={{ margin: "20px 0" }}>
                                    <FormControl
                                        sx={{
                                            width: "90%",
                                        }}
                                    >
                                        <InputLabel
                                            error={!!errors.orderStatus}
                                            color="info"
                                            id="demo-simple-select-helper-label"
                                        >
                                            اسم الحالة
                                        </InputLabel>
                                        <Select
                                            {...register("orderStatus")}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={status}
                                            label="اسم الحالة"
                                            color="info"
                                            onChange={handelStatusChange}
                                        >
                                            {userType === "Employee"
                                                ? AdminStatusesOptions.map(
                                                      (status: {
                                                          id: number;
                                                          orderStatus: string;
                                                      }) => (
                                                          <MenuItem
                                                              key={status.id}
                                                              value={status.id.toString()}
                                                          >
                                                              {
                                                                  status.orderStatus
                                                              }
                                                          </MenuItem>
                                                      )
                                                  )
                                                : RepresentativeStatusesOptions.map(
                                                      (status: {
                                                          id: number;
                                                          orderStatus: string;
                                                      }) => (
                                                          <MenuItem
                                                              key={status.id}
                                                              value={status.id.toString()}
                                                          >
                                                              {
                                                                  status.orderStatus
                                                              }
                                                          </MenuItem>
                                                      )
                                                  )}
                                        </Select>
                                        <FormHelperText
                                            error={!!errors.orderStatus}
                                        >
                                            {errors?.orderStatus?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </div>
                                {/* received Cost*/}
                                {["3", "6"].includes(status) && (
                                    <div style={{ margin: "20px 0" }}>
                                        <NumericInputField
                                            register={register}
                                            errors={errors.receivedCost}
                                            fieldName="receivedCost"
                                            label="المبلغ المستلم"
                                            largeWidth="90%"
                                            smallWidth="90%"
                                        />
                                    </div>
                                )}

                                {/* received shipping Cost*/}
                                {["3", "6", "8", "9"].includes(status) && (
                                    <div style={{ margin: "20px 0" }}>
                                        <NumericInputField
                                            register={register}
                                            errors={errors.receivedShippingCost}
                                            fieldName="receivedShippingCost"
                                            label="مبلغ الشحن المستلم"
                                            largeWidth="90%"
                                            smallWidth="90%"
                                        />
                                    </div>
                                )}
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
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeOrderStatus;
