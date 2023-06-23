/* React staff */
import { useState } from "react";

/* MUI */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

/* date formatter */
import moment from "moment";
import "moment/dist/locale/ar";

/* components */
import EditOrderDetails from "../../../components/editOrderDetails";
import ViewOrderDetails from "../../../components/viewOrderDetail";
import ChangeOrderStatus from "../../../components/changeOrderStatus";
import AssignToRepresentative from "../../../components/assignToRepresentative";

/* types */
import { OrderRow } from "../../../../../components/types";

/* store */
import { useOwnStore } from "../../../../../store";

type ViewOrderSmallScreenProps = {
    index: number;
    data: OrderRow;
};
const RowInSmallScreen = ({ index, data }: ViewOrderSmallScreenProps) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    /* edit order */
    const [openEditOrderDetails, setOpenEditOrderDetails] = useState(false);
    const handleClickOpenEditOrderDetails = () => {
        setOpenEditOrderDetails(true);
    };
    const handleCloseEditOrderDetails = () => {
        setOpenEditOrderDetails(false);
    };

    /* view order details*/
    const [openViewOrderDetails, setOpenViewOrderDetails] = useState(false);
    const handleClickOpenViewOrderDetails = () => {
        setOpenViewOrderDetails(true);
    };
    const handleCloseViewOrderDetails = () => {
        setOpenViewOrderDetails(false);
    };

    /* change order status */
    const [openChangeOrderStatus, setOpenChangeOrderStatus] = useState(false);
    const handleClickChangeOrderStatus = () => {
        setOpenChangeOrderStatus(true);
    };
    const handleCloseChangeOrderStatus = () => {
        setOpenChangeOrderStatus(false);
    };
    /* Assign To Representative */
    const [openAssignToRepresentative, setOpenAssignToRepresentative] =
        useState(false);
    const handleClickAssignToRepresentative = () => {
        setOpenAssignToRepresentative(true);
    };
    const handleCloseAssignToRepresentative = () => {
        setOpenAssignToRepresentative(false);
    };

    const mode = useOwnStore((store) => store.mode);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            {/* edit details */}
            <EditOrderDetails
                data={data}
                handleClose={handleCloseEditOrderDetails}
                open={openEditOrderDetails}
            />
            {/* view details */}
            <ViewOrderDetails
                open={openViewOrderDetails}
                data={data}
                handleClose={handleCloseViewOrderDetails}
            />
            {/* change order status */}
            <ChangeOrderStatus
                open={openChangeOrderStatus}
                data={data}
                handleClose={handleCloseChangeOrderStatus}
            />{" "}
            {/* Assign To Representative */}
            <AssignToRepresentative
                open={openAssignToRepresentative}
                data={data}
                handleClose={handleCloseAssignToRepresentative}
            />
            <Accordion
                sx={{ px: 5 }}
                expanded={expanded === index.toString()}
                onChange={handleChange(index.toString())}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    {/* id */}
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        {data.id}
                    </Typography>
                    {/*  added date */}
                    <Typography sx={{ color: "text.secondary" }}>
                        {moment(data.date).locale("ar").format("LLLL")}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ marginBottom: "5px" }}>
                        المحافظة : {data.state.name}
                    </Typography>

                    <Typography sx={{ marginBottom: "5px" }}>
                        تكلفة الطلب : {data.orderCost} جنيه
                    </Typography>

                    <div>
                        تغيير الحالة :{" "}
                        {
                            <IconButton onClick={handleClickChangeOrderStatus}>
                                <PublishedWithChangesIcon
                                    style={
                                        mode === "dark"
                                            ? {
                                                  color: "#F9D00F",
                                              }
                                            : {
                                                  color: "#DA2D2D",
                                              }
                                    }
                                />
                            </IconButton>
                        }
                    </div>
                    <div>
                        اسناد الي مندوب :{" "}
                        {
                            <IconButton
                                onClick={handleClickAssignToRepresentative}
                            >
                                <AssignmentIndIcon
                                    style={
                                        mode === "dark"
                                            ? {
                                                  color: "#99DBF5",
                                              }
                                            : {
                                                  color: "#2B2A4C",
                                              }
                                    }
                                />
                            </IconButton>
                        }
                    </div>

                    <Typography sx={{ marginBottom: "5px" }}>
                        الاعدادات :{" "}
                        {
                            <>
                                <IconButton
                                    onClick={handleClickOpenViewOrderDetails}
                                >
                                    <ZoomOutMapIcon
                                        style={{
                                            color: "#E86A33",
                                        }}
                                    />
                                </IconButton>
                                <IconButton
                                    onClick={handleClickOpenEditOrderDetails}
                                >
                                    <EditIcon
                                        style={{
                                            color: "#7AA874",
                                        }}
                                    />
                                </IconButton>
                            </>
                        }
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default RowInSmallScreen;
