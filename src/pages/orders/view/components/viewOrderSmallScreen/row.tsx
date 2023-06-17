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
import PrintIcon from "@mui/icons-material/Print";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

/* components */
import EditOrderDetails from "../../../components/editOrderDetails";
import ViewOrderDetails from "../../../components/viewOrderDetail";
import ChangeOrderStatus from "../../../components/changeOrderStatus";

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
                        {data.date}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>المحافظة : {data.state.name}</Typography>

                    <Typography>تكلفة الطلب : {data.OrderCost}</Typography>

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

                    <Typography>
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
