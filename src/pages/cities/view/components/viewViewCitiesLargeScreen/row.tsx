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
import EditCityDetails from "../../../components/editCityDetail";

/* types */
import { CityRow } from "../../../../../components/types";
import { StatusSwitch } from "../../../../employes/view/components/viewEmployeeLargeScreen/row";
import ChangeStatusHandler from "../../../components/ChangeStatusHandeler";

/* types */
type props = {
    data: CityRow;
    labelId: string;
    index: number;
};

const Row = ({ labelId, index, data }: props) => {
    /* edit */
    const [openEditCityDetails, setOpenEditCityDetails] = useState(false);
    const handleClickOpenEditStateDetails = () => {
        setOpenEditCityDetails(true);
    };
    const handleCloseEditStateDetails = () => {
        setOpenEditCityDetails(false);
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
        <TableRow hover tabIndex={-1} key={data.id} sx={{ cursor: "pointer" }}>
            {/*Edit city Details modal */}

            {/* change status */}
            <ChangeStatusHandler
                data={data}
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
                    {/* city name */}
                    <TableCell align="center">{data.name}</TableCell>

                    {/* state */}
                    <TableCell align="center">{data.state.name}</TableCell>

                    {/* shippingCost */}
                    <TableCell align="center">{data.shippingCost}</TableCell>

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
                        <IconButton onClick={handleClickOpenEditStateDetails}>
                            <EditIcon
                                style={{
                                    color: "#7AA874",
                                }}
                            />
                        </IconButton>
                    </TableCell>
                    <EditCityDetails
                        open={openEditCityDetails}
                        handleClose={handleCloseEditStateDetails}
                        data={data}
                    />
                </>
            }
        </TableRow>
    );
};

export default Row;
