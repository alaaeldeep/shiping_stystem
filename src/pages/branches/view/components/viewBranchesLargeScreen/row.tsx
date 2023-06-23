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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

/* date formatter */
import moment from "moment";
import "moment/dist/locale/ar";

/* components */
import EditBranchesDetails from "../../../components/editBranchesDetail";
import DeleteHandler from "../../../components/deleteHandeler";
import { StatusSwitch } from "../../../../employes/view/components/viewEmployeeLargeScreen/row";
import ChangeStatusHandler from "../../../components/ChangeStatusHandeler";

/* store */
import { useOwnStore } from "../../../../../store";

/* types */
import { BranchesRow } from "../../../../../components/types";

type props = {
    labelId: string;
    index: number;
    data: BranchesRow;
    pageNumber: number;
};

const Row = ({ index, labelId, data, pageNumber }: props) => {
    /* store */
    const canActivateBranchesEdit = useOwnStore(
        (store) => store.user.permissions?.Branches?.[2]
    );
    const canActivateBranchesDelete = useOwnStore(
        (store) => store.user.permissions?.Branches?.[3]
    );

    /* delete */
    const [openDeleteHandler, setOpenDeleteHandler] = useState(false);
    const handleDeleteHandlerOpen = () => {
        setOpenDeleteHandler(true);
    };
    const handleDeleteHandlerClose = () => {
        setOpenDeleteHandler(false);
    };
    /* edit */
    const [openEditBranchesDetails, setOpenEditBranchesDetails] =
        useState(false);
    const handleClickOpenEditBranchesDetails = () => {
        setOpenEditBranchesDetails(true);
    };
    const handleCloseEditBranchesDetails = () => {
        setOpenEditBranchesDetails(false);
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
            {/*Edit Branches Details modal */}
            <EditBranchesDetails
                pageNumber={pageNumber}
                branch={data.name}
                open={openEditBranchesDetails}
                handleClose={handleCloseEditBranchesDetails}
                id={data.id}
                status={data.status}
            />{" "}
            {/* change status */}
            <ChangeStatusHandler
                data={data}
                handleClose={handleCloseOpenChangeStatus}
                openStatusHandler={openChangeStatus}
            />
            {/* view all branches */}
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
                    {/* branche name */}
                    <TableCell align="center">{data.name}</TableCell>
                    {/* added date */}
                    <TableCell align="center">
                        {" "}
                        {moment(data.date).locale("ar").format("LLLL")}
                    </TableCell>
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
                            disabled={!canActivateBranchesEdit}
                        />
                    </TableCell>
                    {/* settings */}
                    {canActivateBranchesDelete || canActivateBranchesEdit ? (
                        <TableCell align="center">
                            {canActivateBranchesEdit && (
                                <IconButton
                                    onClick={handleClickOpenEditBranchesDetails}
                                >
                                    <EditIcon
                                        style={{
                                            color: "#7AA874",
                                        }}
                                    />
                                </IconButton>
                            )}
                            {canActivateBranchesDelete && (
                                <IconButton onClick={handleDeleteHandlerOpen}>
                                    <DeleteForeverIcon
                                        style={{
                                            color: "#DF2E38",
                                        }}
                                    />
                                </IconButton>
                            )}
                        </TableCell>
                    ) : null}
                </>
            }{" "}
            {/* delete handler */}
            <DeleteHandler
                id={data.id}
                openDeleteHandler={openDeleteHandler}
                handleDeleteHandlerClose={handleDeleteHandlerClose}
                branch={data.name}
            />{" "}
        </TableRow>
    );
};

export default Row;
