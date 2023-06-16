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
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* components */
import ViewTraderDetails from "../../../components/viewTraderDetail";

/* types */
import { TraderType } from "../../../../../components/types";

type props = {
    index: number;
    data: TraderType;
};
const RowInSmallScreen = ({ index, data }: props) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const [openEditTraderDetails, setOpenEditTraderDetails] = useState(false);
    const handleClickOpenEditTraderDetails = () => {
        setOpenEditTraderDetails(true);
    };
    const handleCloseEditTraderDetails = () => {
        setOpenEditTraderDetails(false);
    };

    const [openViewTraderDetails, setOpenViewTraderDetails] = useState(false);
    const handleClickOpenViewTraderDetails = () => {
        setOpenViewTraderDetails(true);
    };
    const handleCloseViewTraderDetails = () => {
        setOpenViewTraderDetails(false);
    };
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <>
            {/* view trader details */}
            <ViewTraderDetails
                data={data}
                open={openViewTraderDetails}
                handleClose={handleCloseViewTraderDetails}
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
                        {index + 1}
                    </Typography>
                    {/*  name */}
                    <Typography sx={{ color: "text.secondary" }}>
                        {data.traderData.userName}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>الاسم : {data.traderData.userName}</Typography>
                    <Typography>
                        اسم المتجر : {data.traderData.storeName}
                    </Typography>
                    <Typography>
                        رقم الهاتف : {data.traderData.phoneNumber}
                    </Typography>
                    <Typography>الفرع : {data.traderData.branchId}</Typography>

                    <Typography>الحاله : {"//"}</Typography>
                    <Typography>
                        الاعدادات :{" "}
                        {
                            <>
                                <IconButton
                                    onClick={handleClickOpenViewTraderDetails}
                                >
                                    <ZoomOutMapIcon
                                        style={{
                                            color: "#E86A33",
                                        }}
                                    />
                                </IconButton>
                                <IconButton
                                    onClick={handleClickOpenEditTraderDetails}
                                >
                                    <EditIcon
                                        style={{
                                            color: "#4AA96C",
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
