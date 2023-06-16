/* react staff */
import { useState } from "react";

/* MUI */
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import PrintIcon from "@mui/icons-material/Print";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

/* components */
import EditOrderDetails from "../../../components/editEmployeeDetails";
import ViewOrderDetails from "../../../components/viewEmployeeDetail";

/* types */
import { OrderRow } from "../../../../../components/types";

/* myStore */
import { useOwnStore } from "../../../../../store";
import ChangeOrderStatus from "../../../components/changeOrderStatus";

type props = {
    index: number;
    data: OrderRow;
};
const RowInLargeScreen = ({ index, data }: props) => {
    /* edit order */
    const [openEditOrderDetails, setOpenEditOrderDetails] = useState(false);
    const handleClickOpenEditOrderDetails = () => {
        setOpenEditOrderDetails(true);
    };
    const handleCloseEditOrderDetails = () => {
        setOpenEditOrderDetails(false);
    };

    /* view order details*/
    const [openViewOrderDetails, setOpenViewOrderDetails] = useState(false);
    const handleClickOpenViewOrderDetails = () => {
        setOpenViewOrderDetails(true);
    };
    const handleCloseViewOrderDetails = () => {
        setOpenViewOrderDetails(false);
    };

    /* change order status */
    const [openChangeOrderStatus, setOpenChangeOrderStatus] = useState(false);
    const handleClickChangeOrderStatus = () => {
        setOpenChangeOrderStatus(true);
    };
    const handleCloseChangeOrderStatus = () => {
        setOpenChangeOrderStatus(false);
    };
    const mode = useOwnStore((store) => store.mode);
    return (
        <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
            {/* edit details */}
            <EditOrderDetails
                data={data}
                handleClose={handleCloseEditOrderDetails}
                open={openEditOrderDetails}
            />
            {/* view details */}
            <ViewOrderDetails
                open={openViewOrderDetails}
                data={data}
                handleClose={handleCloseViewOrderDetails}
            />
            {/* change order status */}
            <ChangeOrderStatus
                open={openChangeOrderStatus}
                data={data}
                handleClose={handleCloseChangeOrderStatus}
            />
            {/* view all employees */}
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
                        {data.id}
                    </TableCell>

                    {/* addedDate name */}
                    <TableCell align="center">{data.addedDate}</TableCell>

                    {/* state */}
                    <TableCell align="center">{data.StateId.state}</TableCell>
                    {/* cost  */}
                    <TableCell align="center">{data.OrderCost}</TableCell>
                    {/* status */}
                    <TableCell align="center">
                        <IconButton onClick={handleClickChangeOrderStatus}>
                            <PublishedWithChangesIcon
                                style={
                                    mode === "dark"
                                        ? {
                                              color: "#F9D00F",
                                          }
                                        : {
                                              color: "#DA2D2D",
                                          }
                                }
                            />
                        </IconButton>
                    </TableCell>
                    {/* settings */}
                    <TableCell align="center">
                        <IconButton onClick={handleClickOpenViewOrderDetails}>
                            <ZoomOutMapIcon
                                style={{
                                    color: "#E86A33",
                                }}
                            />
                        </IconButton>
                        <IconButton onClick={handleClickOpenEditOrderDetails}>
                            <EditIcon
                                style={{
                                    color: "#7AA874",
                                }}
                            />
                        </IconButton>
                    </TableCell>
                    {/* print */}
                    <TableCell align="center">
                        <IconButton>
                            <PrintIcon
                                style={
                                    mode === "dark"
                                        ? {
                                              color: "#ACDCEE",
                                          }
                                        : {
                                              color: "#475053",
                                          }
                                }
                            />
                        </IconButton>
                    </TableCell>
                </>
            }
        </TableRow>
    );
};

export default RowInLargeScreen;
