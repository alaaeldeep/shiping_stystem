/* React staff */
import { useState } from "react";

/* MUI */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    IconButton,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* components */
import EditStatesDetails from "../../../components/editCityDetail";
import DeleteHandler from "../../../components/deleteHandeler";

/* types */
type props = {
    index: number;
    state: string;
    id: number;
    city: string;
    shippingCost: number;
};
const RowInMobile = ({ index, state, id, city, shippingCost }: props) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const [openEditStatesDetails, setOpenEditStatesDetails] = useState(false);
    const [openDeleteHandler, setOpenDeleteHandler] = useState(false);
    const handleDeleteHandlerOpen = () => {
        setOpenDeleteHandler(true);
    };
    const handleDeleteHandlerClose = () => {
        setOpenDeleteHandler(false);
    };

    const handleClickOpenEditStatesDetails = () => {
        setOpenEditStatesDetails(true);
    };
    const handleCloseEditStatesDetails = () => {
        setOpenEditStatesDetails(false);
    };

    return (
        <>
            {/*Edit States Details modal */}
            <EditStatesDetails
                city={city}
                shippingCost={shippingCost}
                open={openEditStatesDetails}
                handleClose={handleCloseEditStatesDetails}
                id={id}
                state={state}
            />
            <Accordion
                key={index}
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

                    {/* city name */}
                    <Typography sx={{ color: "text.secondary" }}>
                        {city}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {/* id */}
                    <Typography>الرقم : {index + 1}</Typography>

                    {/* city name */}
                    <Typography> المدينة : {city}</Typography>
                    {/* state name */}
                    <Typography> المحافظة : {state}</Typography>
                    {/* state name */}
                    <Typography> تكلفة الشحن : {shippingCost}</Typography>

                    {/* settings */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography>الاعدادات : </Typography>
                        <Box>
                            <IconButton
                                onClick={handleClickOpenEditStatesDetails}
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
                    </Box>
                </AccordionDetails>
            </Accordion>{" "}
            {/*delete State Details modal */}
            <DeleteHandler
                city={city}
                id={id}
                openDeleteHandler={openDeleteHandler}
                handleDeleteHandlerClose={handleDeleteHandlerClose}
            />
        </>
    );
};

export default RowInMobile;
