/* react staff */
import { useState } from "react";

/* MUI */
import { TableCell, TableRow, IconButton } from "@mui/material";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

/* date formatter */
import moment from "moment";
import "moment/dist/locale/ar";

/* components */

import ViewOrderDetails from "../../../components/viewOrderDetail";

/* types */
import { ReportRow } from "../../../../../components/types";

/* myStore */
import { useOwnStore } from "../../../../../store";

type props = {
    index: number;
    data: ReportRow;
};
const RowInLargeScreen = ({ index, data }: props) => {
    /* view order details*/
    const [openViewOrderDetails, setOpenViewOrderDetails] = useState(false);
    const handleClickOpenViewOrderDetails = () => {
        setOpenViewOrderDetails(true);
    };
    const handleCloseViewOrderDetails = () => {
        setOpenViewOrderDetails(false);
    };

    /* store */
    const mode = useOwnStore((store) => store.mode);

    return (
        <TableRow
            hover
            tabIndex={-1}
            sx={{ cursor: "pointer", position: "relative" }}
        >
            {/* view details */}
            <ViewOrderDetails
                open={openViewOrderDetails}
                data={data}
                handleClose={handleCloseViewOrderDetails}
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
                    {/* sipping cost */}
                    <TableCell align="center">
                        {data.orderShipingCost} جنيه
                    </TableCell>
                    {/* assign to representative */}
                    <TableCell align="center">
                        {data.companyOrderRatio} جنيه
                    </TableCell>
                    {/* view */}
                    <TableCell align="center">
                        <IconButton onClick={handleClickOpenViewOrderDetails}>
                            <ZoomOutMapIcon
                                style={{
                                    color: "#E86A33",
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
