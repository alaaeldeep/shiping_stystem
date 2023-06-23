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

/* store */
import { useOwnStore } from "../../../../store/index";

/* components  */
import CustomTableHead from "../../../../components/table/tableHead";
import EditWeightSetting from "../EditWeightSetting";
/* types */
import { WeightSettingRow } from "../../../../components/types";
import { headCells } from "../../../permissionsPage/add/addPermissionPage";

type ViewPermissionsLargeScreenProps = {
    data: WeightSettingRow;
};

const weightSettingHeadCells1 = [
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
const weightSettingHeadCells2 = [
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
];
export const ViewWeightSettingLargeScreen = ({
    data,
}: ViewPermissionsLargeScreenProps) => {
    const canActivateSettingsEdit = useOwnStore(
        (store) => store.user.permissions?.Settings?.[2]
    );

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
                    <CustomTableHead
                        headCell={
                            canActivateSettingsEdit
                                ? weightSettingHeadCells1
                                : weightSettingHeadCells2
                        }
                    />
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
                                    {canActivateSettingsEdit && (
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
                                    )}
                                </>
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
