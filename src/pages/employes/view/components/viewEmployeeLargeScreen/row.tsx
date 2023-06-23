/* react staff */
import { useState } from "react";

/* MUI */
import {
    TableCell,
    TableRow,
    IconButton,
    Switch,
    Typography,
    FormControlLabel,
    styled,
    SwitchProps,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

/* store */
import { useOwnStore } from "../../../../../store";

/* components */
import EditEmployeeDetails from "../../../components/editEmployeeDetails";
import ViewEmployeeDetails from "../../../components/viewEmployeeDetail";
import ChangeStatusHandler from "../../../components/ChangeEmployeeStatusHandeler";

/* types */
import { EmployeeGET } from "../../../../../components/types";

/*  */

export const StatusSwitch = styled((props: SwitchProps) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor:
                    theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
                opacity: 1,
                border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));

type props = {
    index: number;
    data: EmployeeGET;
};
const RowInLargeScreen = ({ index, data }: props) => {
    const canActivateEmployeeEdit = useOwnStore(
        (store) => store.user.permissions?.Employees?.[2]
    );
    /* status */
    const handleChange = () => {
        handleClickOpenChangeStatus();
    };
    /* edit employee */
    const [openEditEmployeeDetails, setOpenEditEmployeeDetails] =
        useState(false);
    const handleClickOpenEditEmployeeDetails = () => {
        setOpenEditEmployeeDetails(true);
    };
    const handleCloseEditEmployeeDetails = () => {
        setOpenEditEmployeeDetails(false);
    };
    /* view employee */
    const [openViewEmployeeDetails, setOpenViewEmployeeDetails] =
        useState(false);
    const handleClickOpenViewEmployeeDetails = () => {
        setOpenViewEmployeeDetails(true);
    };
    const handleCloseViewEmployeeDetails = () => {
        setOpenViewEmployeeDetails(false);
    };
    /* change status employee */
    const [openChangeStatus, setOpenChangeStatus] = useState(false);
    const handleClickOpenChangeStatus = () => {
        setOpenChangeStatus(true);
    };
    const handleCloseOpenChangeStatus = () => {
        setOpenChangeStatus(false);
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
            {/* change status */}
            <ChangeStatusHandler
                data={data}
                handleClose={handleCloseOpenChangeStatus}
                openStatusHandler={openChangeStatus}
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
                        {index + 1}
                    </TableCell>
                    {/* employee name */}
                    <TableCell align="center">{data.userName}</TableCell>
                    {/* email */}
                    {/*   <TableCell align="center">{email}</TableCell> */}
                    {/* phone */}
                    {/*  <TableCell align="center">{phone}</TableCell> */}
                    {/* branch */}
                    <TableCell align="center">{data.branch.name}</TableCell>
                    {/* role */}
                    <TableCell align="center">{data.role.name}</TableCell>
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
                            disabled={!canActivateEmployeeEdit}
                            /*  checked={false} */
                        />
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

                        {canActivateEmployeeEdit && (
                            <IconButton
                                onClick={handleClickOpenEditEmployeeDetails}
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
