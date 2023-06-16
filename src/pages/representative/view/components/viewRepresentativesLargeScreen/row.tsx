/* MUI */
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

/* components  */
import DeleteHandler from "../../../components/deleteHandeler";
import EditRepresentativeDetail from "../../../components/editRepresentativeDetail";
import ViewRepresentativeDetails from "../../../components/viewPersentativeDetail";

/* react staff */
import { useState } from "react";
import { RepresentativeRow } from "../../../../../components/types";

/* types */
type props = {
    index: number;
    data: RepresentativeRow;
};
const RowInLargeScreen = ({ index, data }: props) => {
    const [openViewRepresentativeDetails, setOpenViewRepresentativeDetails] =
        useState(false);
    const [openEditRepresentativeDetails, setOpenEditRepresentativeDetails] =
        useState(false);
    const [openDeleteHandler, setOpenDeleteHandler] = useState(false);
    const handleDeleteHandlerOpen = () => {
        setOpenDeleteHandler(true);
    };
    const handleDeleteHandlerClose = () => {
        setOpenDeleteHandler(false);
    };
    const handleClickOpenViewRepresentativeDetails = () => {
        setOpenViewRepresentativeDetails(true);
    };
    const handleClickOpenEditRepresentativeDetails = () => {
        setOpenEditRepresentativeDetails(true);
    };
    const handleCloseViewRepresentativeDetails = () => {
        setOpenViewRepresentativeDetails(false);
    };
    const handleCloseEditRepresentativeDetails = () => {
        setOpenEditRepresentativeDetails(false);
    };
    return (
        <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
            {/*Edit city Details modal */}
            <EditRepresentativeDetail
                data={data}
                open={openEditRepresentativeDetails}
                handleClose={handleCloseEditRepresentativeDetails}
            />
            {/*View city Details modal */}
            <ViewRepresentativeDetails
                data={data}
                open={openViewRepresentativeDetails}
                handleClose={handleCloseViewRepresentativeDetails}
            />
            {/* view all representative  */}
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
                    {/* representative userName */}
                    <TableCell align="center">{data.userName}</TableCell>

                    {/* phone */}
                    <TableCell align="center">{data.phoneNumber}</TableCell>

                    {/* branch */}
                    <TableCell align="center">{data.branch.branch}</TableCell>

                    {/* status */}
                    <TableCell align="center">
                        <IconButton>//</IconButton>
                    </TableCell>

                    {/* settings */}
                    <TableCell align="center">
                        <IconButton
                            onClick={handleClickOpenViewRepresentativeDetails}
                        >
                            <ZoomOutMapIcon
                                style={{
                                    color: "#E86A33",
                                }}
                            />
                        </IconButton>
                        <IconButton
                            onClick={handleClickOpenEditRepresentativeDetails}
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

                    {/*delete State Details modal */}
                    <DeleteHandler
                        userName={data.userName}
                        id={data.id}
                        openDeleteHandler={openDeleteHandler}
                        handleDeleteHandlerClose={handleDeleteHandlerClose}
                    />
                </>
            }
        </TableRow>
    );
};

export default RowInLargeScreen;
