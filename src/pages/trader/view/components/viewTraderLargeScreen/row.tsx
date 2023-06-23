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

/* store */
import { useOwnStore } from "../../../../../store/index";

/* components  */
import ViewTraderDetails from "../../../components/viewTraderDetail";
import EditTraderDetails from "../../../components/editTraderDetails";
import { StatusSwitch } from "../../../../employes/view/components/viewEmployeeLargeScreen/row";
import ChangeStatusHandler from "../../../components/ChangeStatusHandeler";

/* types */
import { TraderRow } from "../../../../../components/types";

type ViewTraderLargeScreenProps = {
    index: number;
    data: TraderRow;
};
const RowInLargeScreen = ({ index, data }: ViewTraderLargeScreenProps) => {
    /* store */
    const canActivateTradersEdit = useOwnStore(
        (store) => store.user.permissions?.Traders?.[2]
    );

    /* edit */
    const [openEditTraderDetails, setOpenEditTraderDetails] = useState(false);
    const handleClickOpenEditTraderDetails = () => {
        setOpenEditTraderDetails(true);
    };
    const handleCloseEditTraderDetails = () => {
        setOpenEditTraderDetails(false);
    };
    /* view */
    const [openViewTraderDetails, setOpenViewTraderDetails] = useState(false);
    const handleClickOpenViewTraderDetails = () => {
        setOpenViewTraderDetails(true);
    };
    const handleCloseViewTraderDetails = () => {
        setOpenViewTraderDetails(false);
    };
    /* status */
    const handleChange = () => {
        handleClickOpenChangeStatus();
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
            {/* change status */}
            <ChangeStatusHandler
                data={data}
                handleClose={handleCloseOpenChangeStatus}
                openStatusHandler={openChangeStatus}
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
                            disabled={!canActivateTradersEdit}
                        />
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
                        {canActivateTradersEdit && (
                            <IconButton
                                onClick={handleClickOpenEditTraderDetails}
                            >
                                <EditIcon
                                    style={{
                                        color: "#7AA874",
                                    }}
                                />
                            </IconButton>
                        )}
                    </TableCell>
                </>
            }
        </TableRow>
    );
};

export default RowInLargeScreen;
