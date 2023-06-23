/* React staff */
import { useState } from "react";

/* MUI */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    FormControlLabel,
    IconButton,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* components */
import ViewRepresentativeDetails from "../../../components/viewPersentativeDetail";
import EditRepresentativeDetail from "../../../components/editRepresentativeDetail";
import ChangeStatusHandler from "../../../components/ChangeStatusHandeler";
import { StatusSwitch } from "../../../../employes/view/components/viewEmployeeLargeScreen/row";

/* types */
import { RepresentativeGET } from "../../../../../components/types";

type props = {
    index: number;
    data: RepresentativeGET;
};

const RowInSmallScreen = ({ index, data }: props) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    /* status */
    const handleChangeStatus = () => {
        handleClickOpenChangeStatus();
    };
    /* view */
    const [openViewRepresentativeDetails, setOpenViewRepresentativeDetails] =
        useState(false);
    const handleClickOpenViewRepresentativeDetails = () => {
        setOpenViewRepresentativeDetails(true);
    };
    const handleCloseViewRepresentativeDetails = () => {
        setOpenViewRepresentativeDetails(false);
    };
    /* edit */
    const [openEditRepresentativeDetails, setOpenEditRepresentativeDetails] =
        useState(false);
    const handleClickOpenEditRepresentativeDetails = () => {
        setOpenEditRepresentativeDetails(true);
    };
    const handleCloseEditRepresentativeDetails = () => {
        setOpenEditRepresentativeDetails(false);
    };
    /* change status representative */
    const [openChangeStatus, setOpenChangeStatus] = useState(false);
    const handleClickOpenChangeStatus = () => {
        setOpenChangeStatus(true);
    };
    const handleCloseOpenChangeStatus = () => {
        setOpenChangeStatus(false);
    };
    return (
        <>
            {/*Edit city Details modal */}
            <EditRepresentativeDetail
                data={data}
                open={openEditRepresentativeDetails}
                handleClose={handleCloseEditRepresentativeDetails}
            />
            {/*View city Details modal */}
            <ViewRepresentativeDetails
                data={data}
                open={openViewRepresentativeDetails}
                handleClose={handleCloseViewRepresentativeDetails}
            />
            {/* change status */}
            <ChangeStatusHandler
                data={data}
                handleClose={handleCloseOpenChangeStatus}
                openStatusHandler={openChangeStatus}
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
                    <Typography sx={{ marginBottom: "5px" }}>
                        الاسم : {data.userName}
                    </Typography>
                    <Typography sx={{ marginBottom: "5px" }}>
                        رقم الهاتف : {data.phoneNumber}
                    </Typography>
                    <Typography sx={{ marginBottom: "5px" }}>
                        الفرع : {data.branch.name}
                    </Typography>

                    <Typography sx={{ marginBottom: "5px" }}>
                        الحاله :{" "}
                        <FormControlLabel
                            control={
                                <StatusSwitch sx={{ m: 1 }} defaultChecked />
                            }
                            label={
                                data.status ? (
                                    <Typography sx={{ color: "#65C466" }}>
                                        نشط
                                    </Typography>
                                ) : (
                                    <Typography sx={{ color: "#FEA1A1" }}>
                                        غير نشط
                                    </Typography>
                                )
                            }
                            checked={data.status}
                            onChange={handleChangeStatus}
                            /*  checked={false} */
                        />
                    </Typography>
                    <Box>
                        الاعدادات :{" "}
                        <IconButton
                            onClick={handleClickOpenViewRepresentativeDetails}
                        >
                            <ZoomOutMapIcon
                                style={{
                                    color: "#E86A33",
                                }}
                            />
                        </IconButton>
                        <IconButton
                            onClick={handleClickOpenEditRepresentativeDetails}
                        >
                            <EditIcon
                                style={{
                                    color: "#7AA874",
                                }}
                            />
                        </IconButton>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default RowInSmallScreen;
