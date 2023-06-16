/* react staff */
import { useState } from "react";

/* MUI */
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

/* components  */
import ViewTraderDetails from "../../../components/viewTraderDetail";

/* types */
import { TraderRow } from "../../../../../components/types";
import EditTraderDetails from "../../../components/editTraderDetails";

type ViewTraderLargeScreenProps = {
    index: number;
    data: TraderRow;
};
const RowInLargeScreen = ({ index, data }: ViewTraderLargeScreenProps) => {
    const [openEditTraderDetails, setOpenEditTraderDetails] = useState(false);
    const handleClickOpenEditTraderDetails = () => {
        setOpenEditTraderDetails(true);
    };
    const handleCloseEditTraderDetails = () => {
        setOpenEditTraderDetails(false);
    };

    const [openViewTraderDetails, setOpenViewTraderDetails] = useState(false);
    const handleClickOpenViewTraderDetails = () => {
        setOpenViewTraderDetails(true);
    };
    const handleCloseViewTraderDetails = () => {
        setOpenViewTraderDetails(false);
    };
    return (
        <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
            {/* view trader details */}
            <ViewTraderDetails
                data={data}
                open={openViewTraderDetails}
                handleClose={handleCloseViewTraderDetails}
            />
            {/* edit trader details */}
            <EditTraderDetails
                data={data}
                open={openEditTraderDetails}
                handleClose={handleCloseEditTraderDetails}
            />
            {/* view all traders */}
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
                    {/* trader name */}
                    <TableCell align="center">{data.userName}</TableCell>
                    {/* storeName */}
                    <TableCell align="center">{data.storeName}</TableCell>
                    {/* email */}
                    {/* <TableCell align="center">{row.email}</TableCell> */}
                    {/* phone */}
                    {/*  <TableCell align="center">{data.phoneNumber}</TableCell> */}
                    {/* branch */}
                    <TableCell align="center">{data.branch.branch}</TableCell>

                    {/* status */}
                    <TableCell align="center">
                        <IconButton>//</IconButton>
                    </TableCell>
                    {/* settings */}
                    <TableCell align="center">
                        <IconButton onClick={handleClickOpenViewTraderDetails}>
                            <ZoomOutMapIcon
                                style={{
                                    color: "#E86A33",
                                }}
                            />
                        </IconButton>
                        <IconButton onClick={handleClickOpenEditTraderDetails}>
                            <EditIcon
                                style={{
                                    color: "#7AA874",
                                }}
                            />
                        </IconButton>
                    </TableCell>
                </>
            }
        </TableRow>
    );
};

export default RowInLargeScreen;
