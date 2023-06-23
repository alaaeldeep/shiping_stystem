/* MUI */
import { Paper } from "@mui/material";

/* types */
import { RepresentativeGET } from "../../../../../components/types";
import RowInSmallScreen from "./row";

type ViewRepresentativesSmallScreenProps = {
    rows: RepresentativeGET[];
};

export const ViewRepresentativesSmallScreen = ({
    rows,
}: ViewRepresentativesSmallScreenProps) => {
    return (
        <Paper sx={{ width: "100%" }}>
            {/* view Representatives*/}
            {rows.map((row, index) => (
                <RowInSmallScreen key={index} data={row} index={index} />
            ))}
        </Paper>
    );
};
