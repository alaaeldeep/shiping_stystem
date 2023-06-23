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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* components */
import EditStatesDetails from "../../../components/editCityDetail";
import ChangeStatusHandler from "../../../components/ChangeStatusHandeler";
import { StatusSwitch } from "../../../../employes/view/components/viewEmployeeLargeScreen/row";

/*  */

/* types */
import { CityRow } from "../../../../../components/types";
type props = {
    index: number;
    data: CityRow;
};
const RowInMobile = ({ index, data }: props) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    /* edit */
    const [openEditStatesDetails, setOpenEditStatesDetails] = useState(false);
    const handleClickOpenEditStatesDetails = () => {
        setOpenEditStatesDetails(true);
    };
    const handleCloseEditStatesDetails = () => {
        setOpenEditStatesDetails(false);
    };
    /* status */
    const handleChangeStatus = () => {
        handleClickOpenChangeStatus();
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
            {/*Edit States Details modal */}
            <EditStatesDetails
                data={data}
                open={openEditStatesDetails}
                handleClose={handleCloseEditStatesDetails}
            />{" "}
            {/* change status */}
            <ChangeStatusHandler
                data={data}
                handleClose={handleCloseOpenChangeStatus}
                openStatusHandler={openChangeStatus}
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
                        {data.name}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {/* id */}
                    <Typography sx={{ marginBottom: "5px" }}>
                        الرقم : {index + 1}
                    </Typography>

                    {/* city name */}
                    <Typography sx={{ marginBottom: "5px" }}>
                        {" "}
                        المدينة : {data.name}
                    </Typography>
                    {/* state name */}
                    <Typography sx={{ marginBottom: "5px" }}>
                        {" "}
                        المحافظة : {data.state.name}
                    </Typography>
                    {/* state name */}
                    <Typography sx={{ marginBottom: "5px" }}>
                        {" "}
                        تكلفة الشحن : {data.shippingCost}
                    </Typography>
                    {/*  status */}
                    <Typography sx={{ marginBottom: "5px" }}>
                        {" "}
                        الحالة :{" "}
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
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>{" "}
        </>
    );
};

export default RowInMobile;
