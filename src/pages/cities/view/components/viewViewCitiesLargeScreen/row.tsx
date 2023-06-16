/* react staff */
import { useState } from "react";

/* MUI */
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

/* components */
import DeleteHandler from "../../../components/deleteHandeler";
import EditCityDetails from "../../../components/editCityDetail";

/* types */
type props = {
    id: number;
    state: string;
    city: string;
    labelId: string;
    index: number;
    shippingCost: number;
};

const Row = ({ id, city, state, labelId, index, shippingCost }: props) => {
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
            {/*Edit city Details modal */}
            <EditCityDetails
                open={openEditStateDetails}
                handleClose={handleCloseEditStateDetails}
                id={id}
                state={state}
                city={city}
                shippingCost={shippingCost}
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
                    {/* city name */}
                    <TableCell align="center">{city}</TableCell>

                    {/* state */}
                    <TableCell align="center">{state}</TableCell>

                    {/* shippingCost */}
                    <TableCell align="center">{shippingCost}</TableCell>

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
                        id={id}
                        city={city}
                        openDeleteHandler={openDeleteHandler}
                        handleDeleteHandlerClose={handleDeleteHandlerClose}
                    />
                </>
            }
        </TableRow>
    );
};

export default Row;
