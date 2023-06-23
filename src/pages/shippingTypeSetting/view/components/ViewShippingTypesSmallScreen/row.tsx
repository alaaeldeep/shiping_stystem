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
import EditShippingTypeDetails from "../../../components/editShippingDetail";
import DeleteHandler from "../../../components/deleteHandeler";

/* types */
import { ShippingTypeRow } from "../../../../../components/types";

/* store */
import { useOwnStore } from "../../../../../store";

/* types */
type props = {
    index: number;
    data: ShippingTypeRow;
};
const RowInMobile = ({ index, data }: props) => {
    const canActivateSettingsEdit = useOwnStore(
        (store) => store.user.permissions?.Settings?.[2]
    );
    const canActivateSettingsDelete = useOwnStore(
        (store) => store.user.permissions?.Settings?.[3]
    );
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const [openEditBranchesDetails, setOpenEditBranchesDetails] =
        useState(false);
    const [openDeleteHandler, setOpenDeleteHandler] = useState(false);
    const handleDeleteHandlerOpen = () => {
        setOpenDeleteHandler(true);
    };
    const handleDeleteHandlerClose = () => {
        setOpenDeleteHandler(false);
    };

    const handleClickOpenEditBranchesDetails = () => {
        setOpenEditBranchesDetails(true);
    };
    const handleCloseEditBranchesDetails = () => {
        setOpenEditBranchesDetails(false);
    };

    return (
        <>
            {/*Edit shippingSetting */}
            <EditShippingTypeDetails
                open={openEditBranchesDetails}
                handleClose={handleCloseEditBranchesDetails}
                id={data?.id}
                name={data.name}
                cost={data.cost}
            />{" "}
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

                    {/* branch name */}
                    <Typography sx={{ color: "text.secondary" }}>
                        {data.name}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {/* id */}
                    <Typography sx={{ marginBottom: "5px" }}>
                        الرقم : {index + 1}
                    </Typography>

                    {/* branch name */}
                    <Typography sx={{ marginBottom: "5px" }}>
                        {" "}
                        نوع الشحن : {data.name}
                    </Typography>

                    {/* added date */}
                    <Typography sx={{ marginBottom: "5px" }}>
                        {" "}
                        تكلفة الشحن : {data.cost} جنيه
                    </Typography>
                    {/*  status */}
                    {/*                    <Typography sx={{ marginBottom: "5px" }}>
                        {" "}
                        الحالة :{" "}
                        {
                            <FormControlLabel
                                control={
                                    <StatusSwitch
                                        sx={{ m: 1 }}
                                        defaultChecked
                                    />
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
                            />
                        }
                    </Typography> */}

                    {/* settings */}
                    {canActivateSettingsDelete || canActivateSettingsEdit ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Typography>الاعدادات : </Typography>
                            <Box>
                                {canActivateSettingsEdit && (
                                    <IconButton
                                        onClick={
                                            handleClickOpenEditBranchesDetails
                                        }
                                    >
                                        <EditIcon
                                            style={{
                                                color: "#7AA874",
                                            }}
                                        />
                                    </IconButton>
                                )}
                                {canActivateSettingsDelete && (
                                    <IconButton
                                        onClick={handleDeleteHandlerOpen}
                                    >
                                        <DeleteForeverIcon
                                            style={{
                                                color: "#DF2E38",
                                            }}
                                        />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    ) : null}
                </AccordionDetails>
            </Accordion>{" "}
            <DeleteHandler
                id={data.id}
                openDeleteHandler={openDeleteHandler}
                handleDeleteHandlerClose={handleDeleteHandlerClose}
                name={data.name}
            />
        </>
    );
};

export default RowInMobile;
