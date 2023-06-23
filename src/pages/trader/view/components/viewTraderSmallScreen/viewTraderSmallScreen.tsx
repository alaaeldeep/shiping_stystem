/* MUI */
import { Paper } from "@mui/material";

/* components */
import RowInSmallScreen from "./row";
/* types */
import { TraderRow } from "../../../../../components/types";

type ViewTraderSmallScreenProps = {
    rows: TraderRow[];
};

export const ViewTraderSmallScreen = ({ rows }: ViewTraderSmallScreenProps) => {
    return (
        <Paper sx={{ width: "100%" }}>
            {/* view traders*/}
            {rows.map((row, index) => (
                <RowInSmallScreen key={index} index={index} data={row} />
            ))}
        </Paper>
    );
};
