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
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* store */
import { useOwnStore } from "../../../../../store/index";

/* components */
import ViewTraderDetails from "../../../components/viewTraderDetail";
import EditTraderDetails from "../../../components/editTraderDetails";
import ChangeStatusHandler from "../../../components/ChangeStatusHandeler";
import { StatusSwitch } from "../../../../employes/view/components/viewEmployeeLargeScreen/row";

/* types */
import { TraderRow } from "../../../../../components/types";

type props = {
    index: number;
    data: TraderRow;
};
const RowInSmallScreen = ({ index, data }: props) => {
    /* store */
    const canActivateTradersEdit = useOwnStore(
        (store) => store.user.permissions?.Traders?.[2]
    );
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
        }; /* status */
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
            />{" "}
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
                        اسم المتجر : {data.storeName}
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
                            disabled={!canActivateTradersEdit}
                            /*  checked={false} */
                        />
                    </Typography>
                    <Typography sx={{ marginBottom: "5px" }}>
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
                                {canActivateTradersEdit && (
                                    <IconButton
                                        onClick={
                                            handleClickOpenEditTraderDetails
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
