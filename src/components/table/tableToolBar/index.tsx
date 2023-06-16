/* router */
import { useNavigate } from "react-router-dom";

/* MUI */
import { Button, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
    pageName: string;
    destination: string;
    btnTitle: string;
    addIcon: boolean;
};
export function TableToolbar({
    pageName,
    destination,
    btnTitle,
    addIcon,
}: Props) {
    const navigate = useNavigate();

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
            }}
        >
            <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {pageName}
            </Typography>

            <Button
                variant="contained"
                sx={{
                    width: { xs: "160px", md: "250px" },
                    marginY: "10px",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                }}
                onClick={() => navigate(destination)}
            >
                {addIcon ? (
                    <AddIcon
                        sx={{ display: { xs: "none", md: "inline-block" } }}
                    />
                ) : (
                    <ArrowBackIcon
                        sx={{ display: { xs: "none", md: "inline-block" } }}
                    />
                )}{" "}
                <Typography fontSize="0.9rem">{btnTitle}</Typography>
            </Button>
        </Toolbar>
    );
}
