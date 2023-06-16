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

/* components */
import EditEmployeeDetails from "../../../components/editEmployeeDetails";
import ViewEmployeeDetails from "../../../components/viewEmployeeDetail";

/* types */
import { EmployeeGET } from "../../../../../components/types";

type ViewEmployeeSmallScreenProps = {
    index: number;
    data: EmployeeGET;
};
const RowInSmallScreen = ({ index, data }: ViewEmployeeSmallScreenProps) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [openEditEmployeeDetails, setOpenEditEmployeeDetails] =
        useState(false);
    const handleClickOpenEditEmployeeDetails = () => {
        setOpenEditEmployeeDetails(true);
    };
    const handleCloseEditEmployeeDetails = () => {
        setOpenEditEmployeeDetails(false);
    };

    const [openViewEmployeeDetails, setOpenViewEmployeeDetails] =
        useState(false);
    const handleClickOpenViewEmployeeDetails = () => {
        setOpenViewEmployeeDetails(true);
    };
    const handleCloseViewEmployeeDetails = () => {
        setOpenViewEmployeeDetails(false);
    };
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            {/* edit details */}
            <EditEmployeeDetails
                data={data}
                handleClose={handleCloseEditEmployeeDetails}
                open={openEditEmployeeDetails}
            />
            {/* view details */}
            <ViewEmployeeDetails
                open={openViewEmployeeDetails}
                data={data}
                handleClose={handleCloseViewEmployeeDetails}
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
                        {index}
                    </Typography>
                    {/*  name */}
                    <Typography sx={{ color: "text.secondary" }}>
                        {data.userName}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>الاسم : {data.userName}</Typography>

                    <Typography>الفرع : {data.branch.branch}</Typography>
                    <Typography>الصلاحيات : {data.role.role}</Typography>
                    <Typography>الحاله : {"//"}</Typography>
                    <Typography>
                        الاعدادات :{" "}
                        {
                            <>
                                <IconButton
                                    onClick={handleClickOpenViewEmployeeDetails}
                                >
                                    <ZoomOutMapIcon
                                        style={{
                                            color: "#E86A33",
                                        }}
                                    />
                                </IconButton>
                                <IconButton
                                    onClick={handleClickOpenEditEmployeeDetails}
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
