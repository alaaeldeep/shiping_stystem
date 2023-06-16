/* MUI */
import { IconButton } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";

/* store */
import { useOwnStore } from "../../store";
const ToggleTheme = () => {
    const { mode, changeMode } = useOwnStore();
    return (
        <IconButton onClick={changeMode} sx={{ display: "flex" }}>
            {mode === "dark" ? (
                <WbSunnyIcon style={{ color: "#FFEE63" }} />
            ) : (
                <BedtimeIcon style={{ color: "#2D4263" }} />
            )}
        </IconButton>
    );
};

export default ToggleTheme;
