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
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* date formatter */
import moment from "moment";
import "moment/dist/locale/ar";

/* components */
import ViewPermissionDetails from "../../../components/viewPermissionDetail";
import EditPermissionDetails from "../../../components/editPermissionDetail";
import DeleteHandler from "../../../components/deleteHandeler";

/* store */
import { useOwnStore } from "../../../../../store";

/* types */
import { PermissionGET } from "../../../../../components/types";

/* types */
type props = { index: number; data: PermissionGET };

const RowInMobile = ({ index, data }: props) => {
    const canActivatePrivilegesEdit = useOwnStore(
        (store) => store.user.permissions?.Privileges?.[2]
    );
    const canActivatePrivilegesDelete = useOwnStore(
        (store) => store.user.permissions?.Privileges?.[3]
    );

    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const [openViewPermissionDetails, setOpenViewPermissionDetails] =
        useState(false);
    const [openEditPermissionDetails, setOpenEditPermissionDetails] =
        useState(false);
    const [openDeleteHandler, setOpenDeleteHandler] = useState(false);
    const handleDeleteHandlerOpen = () => {
        setOpenDeleteHandler(true);
    };
    const handleDeleteHandlerClose = () => {
        setOpenDeleteHandler(false);
    };
    const handleClickOpenViewPermissionDetails = () => {
        setOpenViewPermissionDetails(true);
    };
    const handleCloseViewPermissionDetails = () => {
        setOpenViewPermissionDetails(false);
    };
    const handleClickOpenEditPermissionDetails = () => {
        setOpenEditPermissionDetails(true);
    };
    const handleCloseEditPermissionDetails = () => {
        setOpenEditPermissionDetails(false);
    };

    return (
        <>
            {/*View Permission Details modal */}
            <ViewPermissionDetails
                open={openViewPermissionDetails}
                handleClose={handleCloseViewPermissionDetails}
                id={data.id}
                roleName={data.roleName}
                selectedPermissions={data.permissions}
            />
            {/*Edit Permission Details modal */}
            <EditPermissionDetails
                open={openEditPermissionDetails}
                handleClose={handleCloseEditPermissionDetails}
                id={data.id}
                roleName={data.roleName}
                selectedPermissions={data.permissions}
            />
            {/* delete permission */}
            <DeleteHandler
                id={data.id}
                openDeleteHandler={openDeleteHandler}
                handleDeleteHandlerClose={handleDeleteHandlerClose}
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

                    {/* pemsion name */}
                    <Typography sx={{ color: "text.secondary" }}>
                        {data.roleName}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {/* id */}
                    <Typography sx={{ marginBottom: "5px" }}>
                        الرقم : {index + 1}
                    </Typography>
                    {/* permission name */}
                    <Typography sx={{ marginBottom: "5px" }}>
                        {" "}
                        الصلاحية : {data.roleName}
                    </Typography>
                    <Typography sx={{ marginBottom: "5px" }}>
                        {" "}
                        تاريخ الاضافه :{" "}
                        {moment(data.addedDate).locale("ar").format("LLLL")}
                    </Typography>{" "}
                    {/* settings */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography sx={{ marginBottom: "5px" }}>
                            الاعدادات :{" "}
                        </Typography>
                        <Box>
                            <IconButton
                                onClick={handleClickOpenViewPermissionDetails}
                            >
                                <ZoomOutMapIcon
                                    style={{
                                        color: "#E86A33",
                                    }}
                                />
                            </IconButton>
                            {canActivatePrivilegesEdit && (
                                <IconButton
                                    onClick={
                                        handleClickOpenEditPermissionDetails
                                    }
                                >
                                    <EditIcon
                                        style={{
                                            color: "#7AA874",
                                        }}
                                    />
                                </IconButton>
                            )}
                            {canActivatePrivilegesDelete && (
                                <IconButton onClick={handleDeleteHandlerOpen}>
                                    <DeleteForeverIcon
                                        style={{
                                            color: "#DF2E38",
                                        }}
                                    />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>{" "}
        </>
    );
};

export default RowInMobile;
