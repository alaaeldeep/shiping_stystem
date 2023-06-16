/* MUI */
import { Paper } from "@mui/material";

/* types */
import { BranchesRow } from "../../../../../components/types";
import RowInMobile from "./row";

type ViewPermissionsSmallScreenProps = {
    rows: BranchesRow[];
};

export const ViewBranchesSmallScreen = ({
    rows,
}: ViewPermissionsSmallScreenProps) => {
    return (
        <Paper sx={{ width: "100%" }}>
            {/* view Permissions*/}
            {rows.map((row, index) => (
                <>
                    <RowInMobile
                        id={row.id}
                        index={index}
                        branch={row.branch}
                        addedDate={row.addedDate}
                    />
                </>
            ))}
        </Paper>
    );
};
