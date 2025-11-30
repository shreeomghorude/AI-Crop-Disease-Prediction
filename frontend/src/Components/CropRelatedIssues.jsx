import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavbarFinal from "./NavbarFinal";
import cropDiseasePrediction from "../Images/cropDiseasePrediction.png";
// import cropPrediction from "../Images/cropPrediction.png";
import "@fontsource/open-sans";
import { useNavigate } from "react-router-dom";

function CropRelatedIssues() {
    const navigate = useNavigate();

    const goToDiseasePredict = () => navigate("/predict-disease");
    // const goToCropPredict = () => navigate("/crop-predict");

    return (
        <>
            <NavbarFinal />

            <Container className="pt-4">
                <Row className="justify-content-center">

                    {/* Crop Disease */}
                    <Col xs={12} md={6} lg={4} className="mb-4">
                        <Card
                            style={{
                                width: "100%",
                                backgroundColor: "#99F3BD",
                                borderColor: "black",
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 0 8px rgba(0,0,0,0.15)"
                            }}
                        >
                            <Card.Img variant="top" src={cropDiseasePrediction} />

                            <Card.Body>
                                <Card.Title
                                    style={{
                                        fontFamily: "Open Sans",
                                        fontWeight: "bold",
                                        textAlign: "center"
                                    }}
                                >
                                    Plant Disease Prediction
                                </Card.Title>

                                <Card.Text
                                    style={{
                                        fontFamily: "Open Sans",
                                        textAlign: "center",
                                        fontSize: "15px"
                                    }}
                                >
                                    Predict plant diseases using AI along with
                                    detailed explanation and prevention steps.
                                </Card.Text>

                                <div className="d-flex justify-content-center">
                                    <Button
                                        onClick={goToDiseasePredict}
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontWeight: "bold",
                                            backgroundColor: "#32FF6A",
                                            borderColor: "black",
                                            color: "black",
                                            padding: "8px 18px",
                                            transition: "0.3s"
                                        }}
                                        onMouseOver={(e) =>
                                            (e.target.style.backgroundColor = "#2ad65a")
                                        }
                                        onMouseOut={(e) =>
                                            (e.target.style.backgroundColor = "#32FF6A")
                                        }
                                    >
                                        Predict Crop Disease
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Crop Suggestion */}
                    {/* <Col xs={12} md={6} lg={4} className="mb-4">
                        <Card
                            style={{
                                width: "100%",
                                backgroundColor: "#99F3BD",
                                borderColor: "black",
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 0 8px rgba(0,0,0,0.15)"
                            }}
                        >
                            <Card.Img variant="top" src={cropPrediction} />

                            <Card.Body>
                                <Card.Title
                                    style={{
                                        fontFamily: "Open Sans",
                                        fontWeight: "bold",
                                        textAlign: "center"
                                    }}
                                >
                                    Crop Prediction
                                </Card.Title>

                                <Card.Text
                                    style={{
                                        fontFamily: "Open Sans",
                                        textAlign: "center",
                                        fontSize: "15px"
                                    }}
                                >
                                    AI-based model recommends the best crop to
                                    grow based on soil and weather conditions.
                                </Card.Text>

                                <div className="d-flex justify-content-center">
                                    <Button
                                        onClick={goToCropPredict}
                                        style={{
                                            fontFamily: "Open Sans",
                                            fontWeight: "bold",
                                            backgroundColor: "#32FF6A",
                                            borderColor: "black",
                                            color: "black",
                                            padding: "8px 18px",
                                            transition: "0.3s"
                                        }}
                                        onMouseOver={(e) =>
                                            (e.target.style.backgroundColor = "#2ad65a")
                                        }
                                        onMouseOut={(e) =>
                                            (e.target.style.backgroundColor = "#32FF6A")
                                        }
                                    >
                                        Predict Crop
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col> */}

                </Row>
            </Container>
        </>
    );
}

export default CropRelatedIssues;
