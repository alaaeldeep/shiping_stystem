import { Paper, Box, Typography } from "@mui/material";

import { useNavigate } from "react-router";

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2, height: 500 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "30px",
                        justifyContent: "space-around",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Typography sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
                        404 ⛔{" "}
                    </Typography>{" "}
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "1rem",
                                md: "1.5rem",
                                textAlign: "center",
                            },
                        }}
                    >
                        هذه الصفحه لم تعد موجوده , او انك كتبت رابط خطأ{" "}
                        <span
                            style={{ color: "#4F709C", cursor: "pointer" }}
                            onClick={() => navigate("/")}
                        >
                            الذهاب للصفحه الرئيسية
                        </span>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default PageNotFound;
