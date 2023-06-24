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

/* components */
import EditStateDetails from "../../../components/editStatesDetail";
import ChangeStatusHandler from "../../../components/ChangeStatusHandeler";
import { StatusSwitch } from "../../../../employes/view/components/viewEmployeeLargeScreen/row";

/* types */
import { StateRow } from "../../../../../components/types";
import { useOwnStore } from "../../../../../store";

/* types */
type props = {
    data: StateRow;
    labelId: string;
    index: number;
};

const Row = ({ labelId, index, data }: props) => {
    const canActivateStatesEdit = useOwnStore(
        (store) => store.user.permissions?.States?.[2]
    );
    /* edit */
    const [openEditStateDetails, setOpenEditStateDetails] = useState(false);
    const handleClickOpenEditStateDetails = () => {
        setOpenEditStateDetails(true);
    };
    const handleCloseEditStateDetails = () => {
        setOpenEditStateDetails(false);
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
            {/*Edit State Details modal */}
            <EditStateDetails
                open={openEditStateDetails}
                handleClose={handleCloseEditStateDetails}
                id={data.id}
                name={data.name}
                status={data.status}
            />{" "}
            {/* change status */}
            <ChangeStatusHandler
                id={data.id}
                name={data.name}
                status={data.status}
                handleClose={handleCloseOpenChangeStatus}
                openStatusHandler={openChangeStatus}
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
                    <TableCell align="center">{data.name}</TableCell>

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
                            disabled={!canActivateStatesEdit}
                        />
                    </TableCell>
                    {/* settings */}
                    {canActivateStatesEdit && (
                        <TableCell align="center">
                            <IconButton
                                onClick={handleClickOpenEditStateDetails}
                            >
                                <EditIcon
                                    style={{
                                        color: "#7AA874",
                                    }}
                                />
                            </IconButton>
                        </TableCell>
                    )}
                </>
            }
        </TableRow>
    );
};

export default Row;
