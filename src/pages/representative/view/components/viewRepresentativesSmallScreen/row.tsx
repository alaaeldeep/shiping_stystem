/* React staff */
import { useState } from "react";

/* MUI */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* types */
import { RepresentativeRow, Data } from "../../../../../components/types";
import ViewRepresentativeDetails from "../../../components/viewPersentativeDetail";
import EditRepresentativeDetail from "../../../components/editRepresentativeDetail";
import DeleteHandler from "../../../components/deleteHandeler";

type props = {
    index: number;
    data: RepresentativeRow;
};

const RowInSmallScreen = ({ index, data }: props) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const [openViewRepresentativeDetails, setOpenViewRepresentativeDetails] =
        useState(false);
    const [openEditRepresentativeDetails, setOpenEditRepresentativeDetails] =
        useState(false);
    const [openDeleteHandler, setOpenDeleteHandler] = useState(false);
    const handleDeleteHandlerOpen = () => {
        setOpenDeleteHandler(true);
    };
    const handleDeleteHandlerClose = () => {
        setOpenDeleteHandler(false);
    };
    const handleClickOpenViewRepresentativeDetails = () => {
        setOpenViewRepresentativeDetails(true);
    };
    const handleClickOpenEditRepresentativeDetails = () => {
        setOpenEditRepresentativeDetails(true);
    };
    const handleCloseViewRepresentativeDetails = () => {
        setOpenViewRepresentativeDetails(false);
    };
    const handleCloseEditRepresentativeDetails = () => {
        setOpenEditRepresentativeDetails(false);
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
            {/*delete State Details modal */}
            <DeleteHandler
                userName={data.userName}
                id={data.id}
                openDeleteHandler={openDeleteHandler}
                handleDeleteHandlerClose={handleDeleteHandlerClose}
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
                    <Typography>رقم الهاتف : {data.phoneNumber}</Typography>
                    <Typography>الفرع : {data.branch.branch}</Typography>

                    <Typography>الحاله : {"//"}</Typography>
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
                        <IconButton onClick={handleDeleteHandlerOpen}>
                            <DeleteForeverIcon
                                style={{
                                    color: "#DF2E38",
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
