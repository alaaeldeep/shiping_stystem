/* react staff */
import { useState } from "react";

/* MUI */
import {
    TableCell,
    TableRow,
    IconButton,
    FormControlLabel,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

/* components  */
import ChangeStatusHandler from "../../../components/ChangeStatusHandeler";
import EditRepresentativeDetail from "../../../components/editRepresentativeDetail";
import ViewRepresentativeDetails from "../../../components/viewPersentativeDetail";
import { StatusSwitch } from "../../../../employes/view/components/viewEmployeeLargeScreen/row";

/* types */
import { RepresentativeGET } from "../../../../../components/types";

type props = {
    index: number;
    data: RepresentativeGET;
};
const RowInLargeScreen = ({ index, data }: props) => {
    /* status */
    const handleChange = () => {
        handleClickOpenChangeStatus();
    };
    /* view */
    const [openViewRepresentativeDetails, setOpenViewRepresentativeDetails] =
        useState(false);
    const handleClickOpenViewRepresentativeDetails = () => {
        setOpenViewRepresentativeDetails(true);
    };
    const handleCloseViewRepresentativeDetails = () => {
        setOpenViewRepresentativeDetails(false);
    };
    /* edit */
    const [openEditRepresentativeDetails, setOpenEditRepresentativeDetails] =
        useState(false);
    const handleClickOpenEditRepresentativeDetails = () => {
        setOpenEditRepresentativeDetails(true);
    };
    const handleCloseEditRepresentativeDetails = () => {
        setOpenEditRepresentativeDetails(false);
    };
    /* change status representative */
    const [openChangeStatus, setOpenChangeStatus] = useState(false);
    const handleClickOpenChangeStatus = () => {
        setOpenChangeStatus(true);
    };
    const handleCloseOpenChangeStatus = () => {
        setOpenChangeStatus(false);
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
            {/* change status */}
            <ChangeStatusHandler
                data={data}
                handleClose={handleCloseOpenChangeStatus}
                openStatusHandler={openChangeStatus}
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
                    <TableCell align="center">{data.branch.name}</TableCell>

                    {/* status */}
                    <TableCell align="center">
                        <FormControlLabel
                            control={
                                <StatusSwitch sx={{ m: 1 }} defaultChecked />
                            }
                            label={
                                data.status ? (
                                    <Typography sx={{ color: "#65C466" }}>
                                        نشط
                                    </Typography>
                                ) : (
                                    <Typography sx={{ color: "#FEA1A1" }}>
                                        غير نشط
                                    </Typography>
                                )
                            }
                            checked={data.status}
                            onChange={handleChange}
                            /*  checked={false} */
                        />
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
                    </TableCell>
                </>
            }
        </TableRow>
    );
};

export default RowInLargeScreen;
