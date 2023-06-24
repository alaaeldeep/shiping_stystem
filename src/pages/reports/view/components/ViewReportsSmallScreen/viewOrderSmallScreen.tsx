/* React staff */
import { useState } from "react";

/* MUI */
import { Paper } from "@mui/material";

/* types */
import { ReportRow } from "../../../../../components/types";
import RowInSmallScreen from "./row";

type ViewEmployeeSmallScreenProps = {
    rows: ReportRow[];
};

export const ViewReportsSmallScreen = ({
    rows,
}: ViewEmployeeSmallScreenProps) => {
    return (
        <Paper sx={{ width: "100%" }}>
            {/* view employees*/}
            {rows?.map((row, index) => (
                <RowInSmallScreen key={index} index={index} data={row} />
            ))}
        </Paper>
    );
};
