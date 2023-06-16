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
import { TraderRow } from "../../../../../components/types";
import EditTraderDetails from "../../../components/editTraderDetails";

type props = {
    index: number;
    data: TraderRow;
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
            {/* edit trader details */}
            <EditTraderDetails
                data={data}
                open={openEditTraderDetails}
                handleClose={handleCloseEditTraderDetails}
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
                        {data.userName}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>الاسم : {data.userName}</Typography>
                    <Typography>اسم المتجر : {data.storeName}</Typography>
                    <Typography>رقم الهاتف : {data.phoneNumber}</Typography>
                    <Typography>الفرع : {data.branch.branch}</Typography>

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
