/* react staff */
import { useState } from "react";

/* MUI */
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

/* components */
import EditShippingTypeDetails from "../../../components/editShippingDetail";
import DeleteHandler from "../../../components/deleteHandeler";

/* store */
import { useOwnStore } from "../../../../../store";

/* types */
import { ShippingTypeRow } from "../../../../../components/types";

type props = { labelId: string; index: number; data: ShippingTypeRow };

const Row = ({ index, labelId, data }: props) => {
    const canActivateSettingsEdit = useOwnStore(
        (store) => store.user.permissions?.Settings?.[2]
    );
    const canActivateSettingsDelete = useOwnStore(
        (store) => store.user.permissions?.Settings?.[3]
    );
    /* delete */
    const [openDeleteHandler, setOpenDeleteHandler] = useState(false);
    const handleDeleteHandlerOpen = () => {
        setOpenDeleteHandler(true);
    };
    const handleDeleteHandlerClose = () => {
        setOpenDeleteHandler(false);
    };
    /* edit */
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
            {/*Edit Branches Details modal */}
            <EditShippingTypeDetails
                name={data.name}
                open={openEditPermissionDetails}
                handleClose={handleCloseEditPermissionDetails}
                id={data.id}
                cost={data.cost}
            />
            {/* change status */}
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
                    {/* shipping type */}
                    <TableCell align="center">{data.name}</TableCell>

                    {/* shipping cost  */}
                    <TableCell align="center">{data.cost} جنيه</TableCell>

                    {/* settings */}
                    {canActivateSettingsEdit || canActivateSettingsDelete ? (
                        <TableCell align="center">
                            {canActivateSettingsEdit && (
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

                            {canActivateSettingsDelete && data.id !== 1 && (
                                <IconButton onClick={handleDeleteHandlerOpen}>
                                    <DeleteForeverIcon
                                        style={{
                                            color: "#DF2E38",
                                        }}
                                    />
                                </IconButton>
                            )}
                        </TableCell>
                    ) : null}
                </>
            }
            {/* delete handler */}
            <DeleteHandler
                id={data.id}
                openDeleteHandler={openDeleteHandler}
                handleDeleteHandlerClose={handleDeleteHandlerClose}
                name={data.name}
            />{" "}
        </TableRow>
    );
};

export default Row;
