/* React staff */
import { useState } from "react";

/* MUI */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* types */
import { SpecialPackage } from "../../../../components/types";

type Props = {
    SpecialPackage: SpecialPackage[];
    setSpecialPackage: any;
};

export default function SpecialPackageInSmallScreen({
    SpecialPackage,
    setSpecialPackage,
}: Props) {
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handelDeleteSpecialPackage = (row: SpecialPackage) => {
        setSpecialPackage((prev: SpecialPackage[]) =>
            prev.filter(
                (oldPackage: SpecialPackage) => oldPackage.id !== row.id
            )
        );
    };

    return (
        <Paper sx={{ width: "100%" }}>
            {/* view States*/}
            {SpecialPackage.map((row: SpecialPackage, index: number) => (
                <Accordion
                    key={index}
                    sx={{ px: 5 }}
                    expanded={expanded === index.toString()}
                    onChange={handleChange(index.toString())}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        {/* id */}
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            {index + 1}
                        </Typography>

                        {/* city name */}
                        <Typography sx={{ color: "text.secondary" }}>
                            {row.city}
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {/* id */}
                        <Typography>الرقم : {index + 1}</Typography>

                        {/* city name */}
                        <Typography> المدينة : {row.city}</Typography>
                        {/* state name */}
                        <Typography> المحافظة : {row.state}</Typography>
                        {/* state name */}
                        <Typography>
                            {" "}
                            تكلفة الشحن : {row.shippingCost}
                        </Typography>

                        {/* settings */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Typography>ازالة : </Typography>
                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handelDeleteSpecialPackage(row)
                                    }
                                >
                                    <DeleteForeverIcon
                                        style={{
                                            color: "#DF2E38",
                                        }}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Paper>
    );
}
