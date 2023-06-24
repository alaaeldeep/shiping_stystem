/* react staff */
import { useEffect, useState } from "react";

/* router */
import { useNavigate } from "react-router-dom";

/* MUI */
import {
    useMediaQuery,
    Skeleton,
    Stack,
    Typography,
    Pagination,
    Box,
    Toolbar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Button,
} from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

/* date formatter */
/* date formatter */
import moment from "moment";
//import "moment/dist/locale/en";

/* react query */
import UseReportQuery from "../../../hooks/reports/useGetQuery";

/* store */
import { useOwnStore } from "../../../store";

/* components */
import { ViewReportsLargeScreen } from "./components/ViewReportsLargeScreen/viewOrderLargeScreen";
import { ViewReportsSmallScreen } from "./components/ViewReportsSmallScreen/viewOrderSmallScreen";

/*react query  */
import UseQuery from "../../../hooks/serverState/useQuery";

/* motion */
import { motion } from "framer-motion";
import { statuses } from "../../../utils/converter";

/* types */

const headCells: any = [
    {
        id: "id",
        label: "الرقم التسلسلي",
    },
    {
        id: "addedDate",
        label: "التاريخ",
    },

    {
        id: "state",

        label: "المحافظة",
    },
    {
        id: "orderCost",

        label: "تكلفة الطلب",
    },
    {
        id: "Status",
        label: " تكلفة الشحن ",
    },
    {
        id: "assignToRepresentative",
        label: "قيمة الشركة",
    },
    {
        id: "settings",
        label: "عرض التفاصيل",
    },
];

const ViewReports = () => {
    /* pagination */
    const [pageNumber, setPageNumber] = useState(1);
    const handlePageNumber = (value: number) => {
        setPageNumber(value);
    };
    const [status, setstatus] = useState<string>("0");
    const handelStatusChange = (event: SelectChangeEvent) => {
        setstatus(event.target.value as string);
    };
    const [date, setDate] = useState<{
        startdateTime: any;
        enddateTime: any;
    }>({ startdateTime: null, enddateTime: null });

    const handelDate = (date: any) => {
        setDate({
            startdateTime: moment(date[0]?.$d)
                .locale("en")
                .format("YYYY-MM-DD HH:mm:ss"),
            enddateTime: moment(date[1]?.$d)
                .locale("en")
                .format("YYYY-MM-DD HH:mm:ss"),
        });
    };

    /* fetch */
    const { data, isLoading, isError, refetch } = UseReportQuery(
        pageNumber,
        date.startdateTime,
        date.enddateTime,
        +status
    );
    /*  const { data, isLoading, isError } = UseQuery(
        date.enddateTime && date.startdateTime
            ? `/Orders/GetAllReportAsNoTrakingAsync?pageNumber=${pageNumber}&status=${status}&startdateTime=${date.startdateTime}&enddateTime=${date.enddateTime}`
            : `/Orders/GetAllReportAsNoTrakingAsync?pageNumber=${pageNumber}&status=${status}`
    ); */
    useEffect(() => {
        refetch();
    }, []);
    const navigate = useNavigate();
    /* store */
    const canActivateOrdersAdd = useOwnStore(
        (store) => store.user.permissions?.Orders?.[0]
    );
    const canActivateOrdersView = useOwnStore(
        (store) => store.user.permissions?.Orders?.[1]
    );

    const matches = useMediaQuery("(min-width:1070px)");

    const searchSubmit = () => {
        const request = { ...date, status };
        console.log(request);
        refetch();
    };

    if (isError) {
        setTimeout(() => navigate("/home"), 2000);
        return <div></div>;
    }

    return (
        <>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                }}
            >
                <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.3,
                    }}
                    style={{
                        flex: "1 1 100%",
                    }}
                >
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        التقارير
                    </Typography>
                </motion.div>
            </Toolbar>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    alignItems: "center",
                    margin: { xs: "0", md: " 0 0  0 20px" },
                }}
            >
                <Box
                    sx={{
                        /*   margin: "20px 0", */
                        width: {
                            xs: "90%",
                            md: "22%",
                        },
                        margin: "0 0 10px 10px",
                    }}
                >
                    <FormControl
                        sx={{
                            width: "100%",
                            /*  width: "22%", */
                        }}
                    >
                        <InputLabel
                            color="info"
                            id="demo-simple-select-helper-label"
                        >
                            الحالة
                        </InputLabel>
                        <Select
                            /*  {...register("stateId")} */
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            defaultValue={"0"}
                            value={status}
                            label="الحالة"
                            color="info"
                            onChange={handelStatusChange}
                        >
                            {statuses.map(
                                (status: {
                                    id: number;
                                    orderStatus: string;
                                }) => (
                                    <MenuItem
                                        key={status.id}
                                        value={status.id.toString()}
                                    >
                                        {status.orderStatus}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                </Box>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateRangePicker"]}>
                        <DateRangePicker
                            sx={{
                                width: {
                                    xs: "80%",
                                    md: "90%",
                                },
                                margin: "0 0 10px 10px",
                            }}
                            onChange={(value) => handelDate(value)}
                            localeText={{ start: "من", end: "الي" }}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                {/* btn search */}
                <Button
                    variant="contained"
                    sx={{
                        width: {
                            xs: "90%",
                            md: "22%",
                        },
                        margin: "0 0 10px 10px",
                        height: "50px",
                    }}
                    onClick={searchSubmit}
                >
                    بحث
                </Button>
            </Box>
            {isLoading ? (
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={500} />
                </Stack>
            ) : matches ? (
                <ViewReportsLargeScreen
                    rows={data?.data.data}
                    headCell={headCells}
                />
            ) : (
                <ViewReportsSmallScreen rows={data?.data.data} />
            )}{" "}
            {/* pagination */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: " 20px",
                }}
            >
                {data?.data.totalPages > 1 && (
                    <Pagination
                        count={data?.data.totalPages}
                        size={matches ? "large" : "small"}
                        page={pageNumber}
                        onChange={(_e, value) => handlePageNumber(value)}
                    />
                )}
            </Box>
            {data?.data.data?.length === 0 && (
                <Typography
                    height={"150px"}
                    sx={{
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    لم يتم اضافة تقارير حتي الان
                </Typography>
            )}
        </>
    );
};

export default ViewReports;
