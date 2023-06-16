import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
    Typography,
    Button,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

/* zod */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* hooks form */
import { useForm } from "react-hook-form";

/* components */
import TransitionsModal from "./modal";
import { useState } from "react";

/* types */
export type SpecialPackage = {
    state: string;
    city: string;
    shippingCost: string;
};

const Form3 = () => {
    const schema = z.object({
        branch: z.string().nonempty("برجاء اختيار الفرع"),
        state: z.string().nonempty("برجاء اختيار المحافظه"),
        city: z.string().nonempty("برجاء اختيار المدينه"),
        shippingCost: z.string().nonempty("برجاء ادخال تكلفه الشحن"),
    });
    type FormValue = z.infer<typeof schema>;
    const { register, control, handleSubmit, formState } = useForm<FormValue>({
        defaultValues: {},
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const { errors } = formState;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [SpecialPackage, setSpecialPackage] = useState<SpecialPackage[]>([
        { state: "القاهره", city: "شبين", shippingCost: "50" },
    ]);
    const handleAddSpecialPackage = (newPackage: SpecialPackage) => {
        setSpecialPackage((prev) => [...prev, newPackage]);
    };
    const handelDeleteSpecialPackage = (row: SpecialPackage) => {
        setSpecialPackage((prev) =>
            prev.filter((oldPackage) => oldPackage.state !== row.state)
        );
    };
    return (
        <>
            <Typography component={"span"} sx={{ mt: 2, mb: 1 }}>
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
                    <Box sx={{ marginX: "auto", width: "90%" }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <Typography>
                                هل تريد اضافه اسعار مميزه لبعض المدن ؟
                            </Typography>
                            <Button color="info" onClick={handleOpen}>
                                اضافه مدينه
                            </Button>
                        </Box>
                        {SpecialPackage.length > 0 && (
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                اسم المحافظه
                                            </TableCell>
                                            <TableCell align="center">
                                                المدينه
                                            </TableCell>
                                            <TableCell align="center">
                                                سعر الشحن
                                            </TableCell>
                                            <TableCell align="center">
                                                ازاله
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {SpecialPackage.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{
                                                    "&:last-child td, &:last-child th":
                                                        {
                                                            border: 0,
                                                        },
                                                }}
                                            >
                                                <TableCell
                                                    onClick={() =>
                                                   
                                                    }
                                                    align="center"
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {row.state}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.city}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.shippingCost}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    onClick={() =>
                                                        handelDeleteSpecialPackage(
                                                            row
                                                        )
                                                    }
                                                >
                                                    {/* <IconButton>
                                        <EditIcon />
                                    </IconButton> */}
                                                    <IconButton>
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        <TransitionsModal
                            open={open}
                            handleClose={handleClose}
                            handleAddSpecialPackage={handleAddSpecialPackage}
                        />{" "}
                    </Box>
                </Box>
            </Typography>
        </>
    );
};
export default Form3;
/* 

                                        <Form3 />
                           



*/
