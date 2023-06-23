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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* date formatter */
import moment from "moment";
import "moment/dist/locale/ar";

/* store */
import { useOwnStore } from "../../../../../store";

/* components */
import EditBranchesDetails from "../../../components/editBranchesDetail";
import DeleteHandler from "../../../components/deleteHandeler";
import ChangeStatusHandler from "../../../components/ChangeStatusHandeler";
import { StatusSwitch } from "../../../../employes/view/components/viewEmployeeLargeScreen/row";

/* types */
import { BranchesRow } from "../../../../../components/types";

/* types */
type props = {
    index: number;
    data: BranchesRow;
    pageNumber: number;
};
const RowInMobile = ({ index, data, pageNumber }: props) => {
    /* store */
    const canActivateBranchesEdit = useOwnStore(
        (store) => store.user.permissions?.Branches?.[2]
    );
    const canActivateBranchesDelete = useOwnStore(
        (store) => store.user.permissions?.Branches?.[3]
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
            {/*Edit Branches Details modal */}
            <EditBranchesDetails
                pageNumber={pageNumber}
                open={openEditBranchesDetails}
                handleClose={handleCloseEditBranchesDetails}
                id={data.id}
                branch={data.name}
                status={data.status}
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
                        اسم الفرع : {data.name}
                    </Typography>

                    {/* added date */}
                    <Typography sx={{ marginBottom: "5px" }}>
                        {" "}
                        تاريخ الاضافه :{" "}
                        {moment(data.date).locale("ar").format("LLLL")}
                    </Typography>
                    {/*  status */}
                    <Typography sx={{ marginBottom: "5px" }}>
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
                                disabled={!canActivateBranchesEdit}
                            />
                        }
                    </Typography>

                    {/* settings */}
                    {canActivateBranchesDelete || canActivateBranchesEdit ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Typography>الاعدادات : </Typography>
                            <Box>
                                {canActivateBranchesEdit && (
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
                                {canActivateBranchesDelete && (
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
            </Accordion>
            <DeleteHandler
                id={data.id}
                openDeleteHandler={openDeleteHandler}
                handleDeleteHandlerClose={handleDeleteHandlerClose}
                branch={data.name}
            />
        </>
    );
};

export default RowInMobile;
