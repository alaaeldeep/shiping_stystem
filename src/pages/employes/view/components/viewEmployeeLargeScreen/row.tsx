/* react staff */
import { useState } from "react";

/* MUI */
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

/* components */
import EditEmployeeDetails from "../../../components/editEmployeeDetails";
import ViewEmployeeDetails from "../../../components/viewEmployeeDetail";

/* types */
import { EmployeeGET } from "../../../../../components/types";

type props = {
    index: number;
    data: EmployeeGET;
};
const RowInLargeScreen = ({ index, data }: props) => {
    const [openEditEmployeeDetails, setOpenEditEmployeeDetails] =
        useState(false);
    const handleClickOpenEditEmployeeDetails = () => {
        setOpenEditEmployeeDetails(true);
    };
    const handleCloseEditEmployeeDetails = () => {
        setOpenEditEmployeeDetails(false);
    };

    const [openViewEmployeeDetails, setOpenViewEmployeeDetails] =
        useState(false);
    const handleClickOpenViewEmployeeDetails = () => {
        setOpenViewEmployeeDetails(true);
    };
    const handleCloseViewEmployeeDetails = () => {
        setOpenViewEmployeeDetails(false);
    };

    return (
        <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
            {/* edit details */}
            <EditEmployeeDetails
                data={data}
                handleClose={handleCloseEditEmployeeDetails}
                open={openEditEmployeeDetails}
            />
            {/* view details */}
            <ViewEmployeeDetails
                open={openViewEmployeeDetails}
                data={data}
                handleClose={handleCloseViewEmployeeDetails}
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
                    {/* employee name */}
                    <TableCell align="center">{data.userName}</TableCell>
                    {/* email */}
                    {/*   <TableCell align="center">{email}</TableCell> */}
                    {/* phone */}
                    {/*  <TableCell align="center">{phone}</TableCell> */}
                    {/* branch */}
                    <TableCell align="center">{data.branch.branch}</TableCell>
                    {/* role */}
                    <TableCell align="center">{data.role.role}</TableCell>
                    {/* status */}
                    <TableCell align="center">
                        <IconButton>//</IconButton>
                    </TableCell>
                    {/* settings */}
                    <TableCell align="center">
                        <IconButton
                            onClick={handleClickOpenViewEmployeeDetails}
                        >
                            <ZoomOutMapIcon
                                style={{
                                    color: "#E86A33",
                                }}
                            />
                        </IconButton>
                        <IconButton
                            onClick={handleClickOpenEditEmployeeDetails}
                        >
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
