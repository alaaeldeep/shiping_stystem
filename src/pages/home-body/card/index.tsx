/* MUI */
import { Box, Grid, Paper, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

/* router */
import { useNavigate } from "react-router";

/* motion */
import { motion } from "framer-motion";

/* styles */
import styles from "./styles.module.css";

export type CardProp = {
    orderStatus: string | undefined;
    numberOrder: number;
};

const Card = ({ orderStatus, numberOrder }: CardProp) => {
    const navigate = useNavigate();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center">
            <motion.div
                initial={{ x: 50, y: -20, opacity: 0, rotate: 7 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
                onClick={() => navigate(`orders/${orderStatus}`)}
            >
                <Paper
                    className={styles.cardContainer}
                    sx={{ borderRadius: "15px" }}
                >
                    <Box sx={{ width: "140px" }}>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    md: "1rem",
                                },
                            }}
                        >
                            {orderStatus}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1.9rem",
                                    md: "1.9rem",
                                },

                                fontWeight: "900",
                            }}
                        >
                            {numberOrder}
                        </Typography>
                    </Box>
                    <AutorenewIcon
                        sx={{
                            fontSize: {
                                xs: 30,
                                md: 35,
                            },
                        }}
                    />
                </Paper>
            </motion.div>
        </Grid>
    );
};

export default Card;
