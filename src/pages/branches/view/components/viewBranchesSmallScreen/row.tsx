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
import EditBranchesDetails from "../../../components/editBranchesDetail";
import DeleteHandler from "../../../components/deleteHandeler";

/* types */
type props = {
    index: number;
    branch: string;
    addedDate: string;

    id: number;
};
const RowInMobile = ({ index, addedDate, id, branch }: props) => {
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
            {/*Edit Branches Details modal */}
            <EditBranchesDetails
                open={openEditBranchesDetails}
                handleClose={handleCloseEditBranchesDetails}
                id={id}
                branch={branch}
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
                        {branch}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {/* id */}
                    <Typography>الرقم : {index + 1}</Typography>

                    {/* branch name */}
                    <Typography> اسم الفرع : {branch}</Typography>

                    {/* added date */}
                    <Typography> تاريخ الاضافه : {addedDate}</Typography>

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
                                onClick={handleClickOpenEditBranchesDetails}
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
            <DeleteHandler
                id={id}
                openDeleteHandler={openDeleteHandler}
                handleDeleteHandlerClose={handleDeleteHandlerClose}
                branch={branch}
            />
        </>
    );
};

export default RowInMobile;
