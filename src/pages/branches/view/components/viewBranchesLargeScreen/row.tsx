/* MUI */
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

/* components */
import EditBranchesDetails from "../../../components/editBranchesDetail";
import DeleteHandler from "../../../components/deleteHandeler";

/* react staff */
import { useState } from "react";

/* types */
import { BranchesRow } from "../../../../../components/types";
type prop = { labelId: string; index: number };

const Row = ({ id, branch, addedDate, index, labelId }: BranchesRow & prop) => {
    const [openEditPermissionDetails, setOpenEditPermissionDetails] =
        useState(false);
    const [openDeleteHandler, setOpenDeleteHandler] = useState(false);
    const handleDeleteHandlerOpen = () => {
        setOpenDeleteHandler(true);
    };
    const handleDeleteHandlerClose = () => {
        setOpenDeleteHandler(false);
    };

    const handleClickOpenEditPermissionDetails = () => {
        setOpenEditPermissionDetails(true);
    };
    const handleCloseEditPermissionDetails = () => {
        setOpenEditPermissionDetails(false);
    };
    return (
        <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
            {/*Edit Branches Details modal */}
            <EditBranchesDetails
                branch={branch}
                open={openEditPermissionDetails}
                handleClose={handleCloseEditPermissionDetails}
                id={id}
            />
            {/* view all branches */}
            {
                <>
                    {/* id */}
                    <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                    >
                        {index + 1}
                    </TableCell>
                    {/* branche name */}
                    <TableCell align="center">{branch}</TableCell>
                    {/* added date */}
                    <TableCell align="center">{addedDate}</TableCell>
                    {/* status */}
                    <TableCell align="center">//</TableCell>
                    {/* settings */}
                    <TableCell align="center">
                        <IconButton
                            onClick={handleClickOpenEditPermissionDetails}
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
                    </TableCell>

                    {/* delete handler */}
                    <DeleteHandler
                        id={id}
                        openDeleteHandler={openDeleteHandler}
                        handleDeleteHandlerClose={handleDeleteHandlerClose}
                        branch={branch}
                    />
                </>
            }
        </TableRow>
    );
};

export default Row;
