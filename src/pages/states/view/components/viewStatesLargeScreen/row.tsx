/* react staff */
import { useState } from "react";

/* MUI */
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

/* components */
import EditStateDetails from "../../../components/editStatesDetail";
import DeleteHandler from "../../../components/deleteHandeler";

/* types */
type props = { id: number; state: string; labelId: string; index: number };

const Row = ({ id, state, labelId, index }: props) => {
    const [openEditStateDetails, setOpenEditStateDetails] = useState(false);
    const [openDeleteHandler, setOpenDeleteHandler] = useState(false);
    const handleDeleteHandlerOpen = () => {
        setOpenDeleteHandler(true);
    };
    const handleDeleteHandlerClose = () => {
        setOpenDeleteHandler(false);
    };

    const handleClickOpenEditStateDetails = () => {
        setOpenEditStateDetails(true);
    };
    const handleCloseEditStateDetails = () => {
        setOpenEditStateDetails(false);
    };
    return (
        <TableRow hover tabIndex={-1} key={id} sx={{ cursor: "pointer" }}>
            {/*Edit State Details modal */}
            <EditStateDetails
                open={openEditStateDetails}
                handleClose={handleCloseEditStateDetails}
                id={id}
                state={state}
            />
            {/* view all State */}
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
                    {/* state name */}
                    <TableCell align="center">{state}</TableCell>

                    {/* status */}
                    <TableCell align="center">//</TableCell>
                    {/* settings */}
                    <TableCell align="center">
                        <IconButton onClick={handleClickOpenEditStateDetails}>
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
                    {/*delete State Details modal */}
                    <DeleteHandler
                        state={state}
                        id={id}
                        openDeleteHandler={openDeleteHandler}
                        handleDeleteHandlerClose={handleDeleteHandlerClose}
                    />
                </>
            }
        </TableRow>
    );
};

export default Row;
