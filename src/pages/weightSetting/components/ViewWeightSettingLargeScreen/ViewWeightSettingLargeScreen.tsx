/* react staff */
import { useState } from "react";

/* MUI */
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

/* components  */
import CustomTableHead from "../../../../components/table/tableHead";
import EditWeightSetting from "../EditWeightSetting";
/* types */
import { WeightSettingRow } from "../../../../components/types";

type ViewPermissionsLargeScreenProps = {
    data: WeightSettingRow;
};

const weightSettingHeadCells = [
    {
        id: "id",
        label: " تكلفة الشحن الافتراضية تبدء من 0 الي وزن ",
    },
    {
        id: "name",
        label: "سعر كل كـجم اضافي",
    },
    {
        id: "name",
        label: "تكلفة الشحن للقري",
    },

    {
        id: "settings",
        label: "الاعدادات",
    },
];
export const ViewWeightSettingLargeScreen = ({
    data,
}: ViewPermissionsLargeScreenProps) => {
    const [openWeightSetting, setOpenWeightSetting] = useState(false);
    const handleClickOpenWeightSetting = () => {
        setOpenWeightSetting(true);
    };
    const handleCloseWeightSetting = () => {
        setOpenWeightSetting(false);
    };
    return (
        <>
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}
                >
                    <CustomTableHead headCell={weightSettingHeadCells} />
                    <TableBody>
                        <TableRow
                            hover
                            tabIndex={-1}
                            sx={{ cursor: "pointer" }}
                        >
                            {/*Edit Weight Setting modal */}
                            <EditWeightSetting
                                data={data}
                                open={openWeightSetting}
                                handleClose={handleCloseWeightSetting}
                            />

                            {
                                <>
                                    {/* default Weight */}
                                    <TableCell
                                        align="center"
                                        component="th"
                                        id="defaultWeight"
                                        scope="row"
                                        padding="none"
                                    >
                                        {data.defaultWeight} كـجـم
                                    </TableCell>

                                    {/*  over Cost PerKG */}
                                    <TableCell align="center">
                                        {data.overCostPerKG} جنـيه
                                    </TableCell>

                                    {/* village Shiping Cost*/}
                                    <TableCell align="center">
                                        {data.villageShipingCost} جنـيه
                                    </TableCell>

                                    {/* settings */}
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={
                                                handleClickOpenWeightSetting
                                            }
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
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
