/* MUI */
import { Paper } from "@mui/material";

/* components */
import RowInMobile from "./row";

/* types */
import { StateRow } from "../../../../../components/types";

type ViewStatesSmallScreenProps = {
    rows: StateRow[];
};

export const ViewStatesSmallScreen = ({ rows }: ViewStatesSmallScreenProps) => {
    return (
        <Paper sx={{ width: "100%" }}>
            {/* view States*/}
            {rows.map((row, index) => (
                <RowInMobile key={index} index={index} data={row} />
            ))}
        </Paper>
    );
};
