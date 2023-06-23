/* MUI */
import { Paper } from "@mui/material";

/* components */
import RowInMobile from "./row";

/* types */
import { CityRow } from "../../../../../components/types";

type ViewCitiesSmallScreenProps = {
    rows: CityRow[];
};

export const ViewCitiesSmallScreen = ({ rows }: ViewCitiesSmallScreenProps) => {
    return (
        <Paper sx={{ width: "100%" }}>
            {/* view States*/}
            {rows.map((row, index) => (
                <RowInMobile key={index} data={row} index={index} />
            ))}
        </Paper>
    );
};
