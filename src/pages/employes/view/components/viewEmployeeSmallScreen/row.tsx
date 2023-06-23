/* React staff */
import { useState } from "react";

/* MUI */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControlLabel,
    IconButton,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

/* store */
import { useOwnStore } from "../../../../../store";

/* components */
import EditEmployeeDetails from "../../../components/editEmployeeDetails";
import ViewEmployeeDetails from "../../../components/viewEmployeeDetail";
import ChangeStatusHandler from "../../../components/ChangeEmployeeStatusHandeler";
import { StatusSwitch } from "../viewEmployeeLargeScreen/row";

/* types */
import { EmployeeGET } from "../../../../../components/types";

type ViewEmployeeSmallScreenProps = {
    index: number;
    data: EmployeeGET;
};
const RowInSmallScreen = ({ index, data }: ViewEmployeeSmallScreenProps) => {
    const canActivateEmployeeEdit = useOwnStore(
        (store) => store.user.permissions?.Employees?.[2]
    );

    const [expanded, setExpanded] = useState<string | false>(false);
    const [openEditEmployeeDetails, setOpenEditEmployeeDetails] =
        useState(false);
    /* edit */
    const handleClickOpenEditEmployeeDetails = () => {
        setOpenEditEmployeeDetails(true);
    };
    const handleCloseEditEmployeeDetails = () => {
        setOpenEditEmployeeDetails(false);
    };
    /* view */
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

    /* change status employee */
    const [openChangeStatus, setOpenChangeStatus] = useState(false);
    const handleClickOpenChangeStatus = () => {
        setOpenChangeStatus(true);
    };
    const handleCloseOpenChangeStatus = () => {
        setOpenChangeStatus(false);
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
                        الفرع : {data.branch.name}
                    </Typography>
                    <Typography sx={{ marginBottom: "5px" }}>
                        الصلاحيات : {data.role.name}
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
                            onChange={handleClickOpenChangeStatus}
                            disabled={!canActivateEmployeeEdit}
                        />
                    </Typography>
                    <Typography sx={{ marginBottom: "5px" }}>
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
                                {canActivateEmployeeEdit && (
                                    <IconButton
                                        onClick={
                                            handleClickOpenEditEmployeeDetails
                                        }
                                    >
                                        <EditIcon
                                            style={{
                                                color: "#7AA874",
                                            }}
                                        />
                                    </IconButton>
                                )}
                            </>
                        }
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default RowInSmallScreen;
