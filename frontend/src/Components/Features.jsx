import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Grid, Typography, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/libre-baskerville/400-italic.css";
import "@fontsource/open-sans";

import cropRelatedIssues from "../Images/cropRelatedIssues.jpg";
import NavbarFinal from "./NavbarFinal";

const theme = createTheme();

function Features() {
    const navigate = useNavigate();

    return (
        <>
            <NavbarFinal />

            <ThemeProvider theme={theme}>
                <Grid container sx={{ minHeight: "100vh" }}>
                    <CssBaseline />

                    {/* Title */}
                    <Typography
                        sx={{
                            position: "absolute",
                            top: "140px",
                            left: "120px",
                            fontFamily: "Libre Baskerville",
                            fontWeight: "bold",
                            fontSize: "50px",
                        }}
                    >
                        Feature Section
                    </Typography>

                    {/* Content Section */}
                    <Grid item xs={12} sx={{ paddingTop: "150px" }}>
                        <Container>
                            <Row className="justify-content-center">
                                <Col
                                    xs={12}
                                    md={6}
                                    className="d-flex justify-content-center"
                                >
                                    {/* Feature Card */}
                                    <div
                                        style={{
                                            width: "300px",
                                            height: "300px",
                                            backgroundColor: "#99F3BD",
                                            borderRadius: "12px",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow:
                                                "0 0 10px rgba(0,0,0,0.2)",
                                            transition: "0.3s",
                                        }}
                                    >
                                        <img
                                            src={cropRelatedIssues}
                                            width="180px"
                                            height="180px"
                                            alt="Crop Related Issues"
                                            style={{ marginBottom: "20px" }}
                                        />

                                        <Typography
                                            sx={{
                                                fontFamily: "Open Sans",
                                                fontWeight: "bold",
                                                fontSize: "18px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                navigate("/crop-related-issues")
                                            }
                                        >
                                            Crop Related Issues
                                        </Typography>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
}

export default Features;
