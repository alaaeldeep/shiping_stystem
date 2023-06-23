/* MUI */
import { Paper } from "@mui/material";

/* types */
import { PermissionGET } from "../../../../../components/types";
import RowInMobile from ".";

type ViewPermissionsSmallScreenProps = {
    rows: PermissionGET[];
};

export const ViewPermissionsSmallScreen = ({
    rows,
}: ViewPermissionsSmallScreenProps) => {
    return (
        <Paper sx={{ width: "100%" }}>
            {/* view Permissions*/}
            {rows.map((row, index) => (
                <RowInMobile data={row} index={index} key={index} />
            ))}
        </Paper>
    );
};
