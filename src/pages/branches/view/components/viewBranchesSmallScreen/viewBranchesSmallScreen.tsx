/* MUI */
import { Paper } from "@mui/material";

/* types */
import { BranchesRow } from "../../../../../components/types";
import RowInMobile from "./row";

type ViewPermissionsSmallScreenProps = {
    rows: BranchesRow[];
    pageNumber: number;
};

export const ViewBranchesSmallScreen = ({
    pageNumber,
    rows,
}: ViewPermissionsSmallScreenProps) => {
    return (
        <Paper sx={{ width: "100%" }}>
            {/* view Permissions*/}
            {rows.map((row, index) => (
                <RowInMobile
                    key={index}
                    data={row}
                    index={index}
                    pageNumber={pageNumber}
                />
            ))}
        </Paper>
    );
};
