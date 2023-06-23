/* react staff */
import { useState } from "react";

/* MUI */
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

/* date formatter */
import moment from "moment";
import "moment/dist/locale/ar";

/* components */
import EditOrderDetails from "../../../components/editOrderDetails";
import ViewOrderDetails from "../../../components/viewOrderDetail";

/* types */
import { OrderRow } from "../../../../../components/types";

/* myStore */
import { useOwnStore } from "../../../../../store";
import ChangeOrderStatus from "../../../components/changeOrderStatus";
import AssignToRepresentative from "../../../components/assignToRepresentative";

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

    /* Assign To Representative */
    const [openAssignToRepresentative, setOpenAssignToRepresentative] =
        useState(false);
    const handleClickAssignToRepresentative = () => {
        setOpenAssignToRepresentative(true);
    };
    const handleCloseAssignToRepresentative = () => {
        setOpenAssignToRepresentative(false);
    };

    /* store */
    const mode = useOwnStore((store) => store.mode);

    return (
        <TableRow
            hover
            tabIndex={-1}
            sx={{ cursor: "pointer", position: "relative" }}
        >
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
            />{" "}
            {/* Assign To Representative */}
            <AssignToRepresentative
                open={openAssignToRepresentative}
                data={data}
                handleClose={handleCloseAssignToRepresentative}
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
                    <TableCell align="center">
                        {moment(data.date).locale("ar").format("LLLL")}
                    </TableCell>

                    {/* state */}
                    <TableCell align="center">{data.state.name}</TableCell>
                    {/* cost  */}
                    <TableCell align="center">{data.orderCost} جنيه</TableCell>
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
                    {/* assign to representative */}
                    <TableCell align="center">
                        <IconButton onClick={handleClickAssignToRepresentative}>
                            <AssignmentIndIcon
                                style={
                                    mode === "dark"
                                        ? {
                                              color: "#99DBF5",
                                          }
                                        : {
                                              color: "#2B2A4C",
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
                </>
            }
        </TableRow>
    );
};

export default RowInLargeScreen;
