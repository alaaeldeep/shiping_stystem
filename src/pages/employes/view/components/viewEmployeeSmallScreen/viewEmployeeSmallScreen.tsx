/* React staff */
import { useState } from "react";

/* MUI */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* types */
import { EmployeeRow } from "../../../../../components/types";
import RowInSmallScreen from "./row";

type ViewEmployeeSmallScreenProps = {
    rows: EmployeeRow[];
};

export const ViewEmployeeSmallScreen = ({
    rows,
}: ViewEmployeeSmallScreenProps) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Paper sx={{ width: "100%" }}>
            {/* view employees*/}
            {rows.map((row, index) => (
                <RowInSmallScreen key={index} index={index} data={row} />
            ))}
        </Paper>
    );
};
