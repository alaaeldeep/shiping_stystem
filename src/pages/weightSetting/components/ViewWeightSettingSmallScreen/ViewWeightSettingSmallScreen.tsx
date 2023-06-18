/* React staff */
import { useState } from "react";

/* MUI */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Paper,
    IconButton,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* components */
import EditWeightSetting from "../EditWeightSetting";

/* types */
import { WeightSettingRow } from "../../../../components/types";

type props = {
    data: WeightSettingRow;
};

export const ViewWeightSettingSmallScreen = ({ data }: props) => {
    const [expanded, setExpanded] = useState<string | false>("panel1");
    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const [openEditWeightSetting, setOpenEditWeightSetting] = useState(false);
    const handleClickOpenEditWeightSetting = () => {
        setOpenEditWeightSetting(true);
    };
    const handleCloseEditWeightSetting = () => {
        setOpenEditWeightSetting(false);
    };
    return (
        <Paper sx={{ width: "100%" }}>
            {/*  */}
            <EditWeightSetting
                open={openEditWeightSetting}
                handleClose={handleCloseEditWeightSetting}
                data={data}
            />
            <Accordion
                sx={{ px: 5 }}
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1-header"
                >
                    {/* id */}
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        اعدادات الوزن
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {/* default Weight */}
                    <Typography>
                        {" "}
                        <span style={{ fontWeight: "600" }}>
                            تكلفة الشحن الافتراضية تبدء من 0 كـجم الي وزن :
                        </span>{" "}
                        {data.defaultWeight} كـجم
                    </Typography>

                    {/*  over Cost PerKG */}
                    <Typography>
                        {" "}
                        سعر كل كـجم اضافي : {data.overCostPerKG} جنـيه
                    </Typography>

                    {/* village Shiping Cost*/}
                    <Typography>
                        {" "}
                        تكلفة الشحن للقري : {data.villageShipingCost} جنـيه
                    </Typography>

                    {/* settings */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography>الاعدادات : </Typography>
                        <Box>
                            <IconButton
                                onClick={handleClickOpenEditWeightSetting}
                            >
                                <EditIcon
                                    style={{
                                        color: "#7AA874",
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>{" "}
        </Paper>
    );
};
