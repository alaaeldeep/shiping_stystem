/* router */
import { useNavigate } from "react-router-dom";

/* MUI */
import { Button, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/* motion */
import { motion } from "framer-motion";

type Props = {
    pageName: string;
    destination: string;
    btnTitle: string;
    addIcon: boolean;
    addBtn: boolean;
};
export function TableToolbar({
    pageName,
    destination,
    btnTitle,
    addIcon,
    addBtn,
}: Props) {
    const navigate = useNavigate();

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
            }}
        >
            <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.3,
                }}
                style={{
                    flex: "1 1 100%",
                    /*  display: "flex",
                    justifyContent: "center",
                    marginTop: "6rem", */
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
            </motion.div>

            <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.3,
                }}
            >
                {addBtn && (
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
                                sx={{
                                    display: { xs: "none", md: "inline-block" },
                                }}
                            />
                        ) : (
                            <ArrowBackIcon
                                sx={{
                                    display: { xs: "none", md: "inline-block" },
                                }}
                            />
                        )}{" "}
                        <Typography fontSize="0.9rem">{btnTitle}</Typography>
                    </Button>
                )}
            </motion.div>
        </Toolbar>
    );
}
