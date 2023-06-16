/* MUI */
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

/* types */
import { PermissionGET } from "../../../../../components/types";

/* components */
import ViewPermissionDetails from "../../../components/viewPermissionDetail";
import EditPermissionDetails from "../../../components/editPermissionDetail";
import DeleteHandler from "../../../components/deleteHandeler";

/* react staff */
import { useState } from "react";

type props = { index: number; data: PermissionGET };
const Row = ({ index, data }: props) => {
    /* delete permissions */
    const [openDeleteHandler, setOpenDeleteHandler] = useState(false);
    const handleDeleteHandlerOpen = () => {
        setOpenDeleteHandler(true);
    };
    const handleDeleteHandlerClose = () => {
        setOpenDeleteHandler(false);
    };

    /* view permissions */
    const [openViewPermissionDetails, setOpenViewPermissionDetails] =
        useState(false);
    const handleClickOpenViewPermissionDetails = () => {
        setOpenViewPermissionDetails(true);
    };
    const handleCloseViewPermissionDetails = () => {
        setOpenViewPermissionDetails(false);
    };

    /* edit permission */
    const [openEditPermissionDetails, setOpenEditPermissionDetails] =
        useState(false);
    const handleClickOpenEditPermissionDetails = () => {
        setOpenEditPermissionDetails(true);
    };
    const handleCloseEditPermissionDetails = () => {
        setOpenEditPermissionDetails(false);
    };
    return (
        <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
            {/*View Permission Details modal */}
            <ViewPermissionDetails
                open={openViewPermissionDetails}
                handleClose={handleCloseViewPermissionDetails}
                id={data.id}
                roleName={data.roleName}
                selectedPermissions={data.rolePrivileges}
            />
            {/*Edit Permission Details modal */}
            <EditPermissionDetails
                open={openEditPermissionDetails}
                handleClose={handleCloseEditPermissionDetails}
                id={data.id}
                roleName={data.roleName}
                selectedPermissions={data.rolePrivileges}
            />
            {/* view all permisions */}
            {
                <>
                    {/* id */}
                    <TableCell
                        align="center"
                        component="th"
                        id={`enhanced-table-checkbox-${index}`}
                        scope="row"
                        padding="none"
                    >
                        {index + 1}
                    </TableCell>

                    {/* permision name */}
                    <TableCell align="center">{data.roleName}</TableCell>

                    {/* added date */}
                    <TableCell align="center">{data.addedDate}</TableCell>

                    {/* settings */}
                    <TableCell align="center">
                        <IconButton
                            onClick={handleClickOpenViewPermissionDetails}
                        >
                            <ZoomOutMapIcon
                                style={{
                                    color: "#E86A33",
                                }}
                            />
                        </IconButton>
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
                    <DeleteHandler
                        id={data.id}
                        openDeleteHandler={openDeleteHandler}
                        handleDeleteHandlerClose={handleDeleteHandlerClose}
                    />
                </>
            }
        </TableRow>
    );
};

export default Row;
