import { React, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Form } from 'react-bootstrap';
import { Typography, Grid } from '@mui/material';
import { Button } from 'react-bootstrap';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import "@fontsource/open-sans";
import NavbarFinal from './NavbarFinal';
import AppContext from '../AppContext';

function PredictDisease() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { setTempUrl, setAns } = useContext(AppContext);

    const handleImage = (e) => {
        const uploaded = e.target.files[0];
        if (!uploaded) return;

        setFile(uploaded);
        setTempUrl(URL.createObjectURL(uploaded));
    };

    const handlePredict = async () => {
        if (!file) {
            alert("Please upload an image first!");
            return;
        }

        const data = new FormData();
        data.append("image", file); // FIXED FIELD NAME ✔

        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/crop/upload", // FIXED ENDPOINT ✔
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}` // REQUIRED ✔
                    }
                }
            );

            console.log("Prediction Response:", response.data);

            const result = response.data.prediction;

            // Save result to context
            setAns({
                Crop: result.crop,
                Disease: result.disease,
                Cause_of_disease: Array.isArray(result.cause) ? result.cause : [result.cause],
                How_to_prevent_OR_cure_the_disease: Array.isArray(result.prevention) ? result.prevention : [result.prevention]
            });

            setLoading(false);
            navigate("/predict-disease-result");

        } catch (err) {
            console.log("Prediction Error:", err);
            setLoading(false);
            alert("Prediction failed - check backend!");
        }
    };

    return (
        <>
            <NavbarFinal />

            <Grid 
                container 
                item 
                md={12} 
                xs={12}
                alignItems="center" 
                justifyContent="center"
                sx={{ display: "grid", minHeight: "50vh" }}
            >

                <Typography sx={{ marginBottom: "20px", fontWeight: 'bold' }}>
                    Upload Crop Leaf Image
                </Typography>

                <Form.Group style={{ paddingBottom: "20px" }}>
                    <Form.Control type='file' accept="image/*" onChange={handleImage} />
                </Form.Group>

                <Button variant='primary' onClick={handlePredict}>
                    Predict
                </Button>

                <Fade in={loading} unmountOnExit>
                    <CircularProgress sx={{ marginTop: '20px' }} />
                </Fade>
            </Grid>
        </>
    );
}

export default PredictDisease;
