/* router */
import { useNavigate } from "react-router";

/* MUI */
import {
    Skeleton,
    Stack,
    useMediaQuery,
    Typography,
    Pagination,
    Box,
} from "@mui/material";

/* react query */
import UseQuery from "../../../hooks/serverState/useQuery";

/* components */
import { ViewBranchesLargeScreen } from "./components/ViewShippingTypesLargeScreen/ViewShippingTypesLargeScreen";
import { ViewBranchesSmallScreen } from "./components/ViewShippingTypesSmallScreen/ViewShippingTypesSmallScreen";
import { TableToolbar } from "../../../components/table/tableToolBar";

/* react staff */
import { useEffect, useRef, useState } from "react";

/* store */
import { useOwnStore } from "../../../store";

const headCells: any = [
    {
        id: "id",
        label: "الرقم",
    },
    {
        id: "name",
        label: " نوع الشحن",
    },
    {
        id: "shhipingCost",
        label: " تكلفه الشحن",
    },
    /*    {
        id: "status",
        label: "الحاله",
    }, */
    {
        id: "settings",
        label: "الاعدادات",
    },
];
const ViewShippingTypes = () => {
    /* store */
    const canActivateSettingsAdd = useOwnStore(
        (store) => store.user.permissions?.Settings?.[0]
    );
    const canActivateSettingsView = useOwnStore(
        (store) => store.user.permissions?.Settings?.[1]
    );

    const { data, isLoading, isError } = UseQuery("/ShippingTypeSettings");
    /* pagination */
    const [pageNumber, setPageNumber] = useState(1);
    const handlePageNumber = (value: number) => {
        setPageNumber(value);
    };
    /* fetch */
    /*  const { data, isLoading, isError } = UseQuery(
        `/branches?_page=${pageNumber}`
    ); */
    const [asyncData, setAsyncData] = useState(data?.data);

    /* mobile view */
    const matches = useMediaQuery("(min-width:1070px)");
    useEffect(() => setAsyncData(data?.data), [data?.data]);
    console.log(asyncData);
    //console.log(asyncData);
    const navigate = useNavigate();

    if (isError) {
        setTimeout(() => navigate("/home"), 2000);
        return <Stack spacing={2} sx={{ width: "100%" }}></Stack>;
    }

    return (
        <>
            <TableToolbar
                pageName="أنواع الشحن"
                btnTitle="اضف نوع"
                destination="/shippingType/add"
                addIcon={true}
                addBtn={!!canActivateSettingsAdd && !!canActivateSettingsView}
            />
            {isLoading ? (
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={500} />
                </Stack>
            ) : matches ? (
                <ViewBranchesLargeScreen rows={data?.data} />
            ) : (
                <ViewBranchesSmallScreen rows={data?.data} />
            )}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: " 20px",
                }}
            ></Box>
            {data?.data.length === 0 && (
                <Typography
                    height={"150px"}
                    sx={{
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    لم يتم اضافة فروع حتي الان
                </Typography>
            )}
        </>
    );
};

export default ViewShippingTypes;
