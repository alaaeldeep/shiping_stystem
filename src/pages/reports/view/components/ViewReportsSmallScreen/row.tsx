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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

/* date formatter */
import moment from "moment";
import "moment/dist/locale/ar";

/* components */

import ViewOrderDetails from "../../../components/viewOrderDetail";

/* types */
import { ReportRow } from "../../../../../components/types";

/* store */
import { useOwnStore } from "../../../../../store";

type ViewOrderSmallScreenProps = {
    index: number;
    data: ReportRow;
};
const RowInSmallScreen = ({ index, data }: ViewOrderSmallScreenProps) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    /* view order details*/
    const [openViewOrderDetails, setOpenViewOrderDetails] = useState(false);
    const handleClickOpenViewOrderDetails = () => {
        setOpenViewOrderDetails(true);
    };
    const handleCloseViewOrderDetails = () => {
        setOpenViewOrderDetails(false);
    };

    const mode = useOwnStore((store) => store.mode);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            {/* view details */}
            <ViewOrderDetails
                open={openViewOrderDetails}
                data={data}
                handleClose={handleCloseViewOrderDetails}
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

                    <Typography sx={{ marginBottom: "5px" }}>
                        تكلفة الشحن : {data.orderCost} جنيه
                    </Typography>

                    <Typography sx={{ marginBottom: "5px" }}>
                        قيمة الشركة : {data.companyOrderRatio} جنيه
                    </Typography>

                    <Typography sx={{ marginBottom: "5px" }}>
                        عرض التفاصيل :{" "}
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
                            </>
                        }
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default RowInSmallScreen;
