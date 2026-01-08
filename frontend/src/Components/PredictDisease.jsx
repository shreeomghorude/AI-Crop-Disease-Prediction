import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Box, Typography, Paper, Button, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NavbarFinal from "./NavbarFinal";
import AppContext from "../AppContext";

function PredictDisease() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setTempUrl, setAns } = useContext(AppContext);

  const handleImage = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;

    setFile(uploaded);
    const previewUrl = URL.createObjectURL(uploaded);
    setPreview(previewUrl);
    setTempUrl(previewUrl);
  };

  const handlePredict = async () => {
    if (!file) {
      alert("Please upload a crop leaf image first!");
      return;
    }

    const data = new FormData();
    data.append("image", file);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/crop/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAns(response.data.prediction || response.data);
      setLoading(false);
      navigate("/predict-disease-result");
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Prediction failed. Please try again.");
    }
  };

  return (
    <>
      <NavbarFinal />

      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E9FFE1",
          px: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 480,
            p: 4,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Crop Disease Prediction
          </Typography>

          <Typography
            sx={{ color: "text.secondary", mb: 3 }}
          >
            Upload a clear image of the crop leaf to detect disease
          </Typography>

          {/* Image Preview */}
          {preview && (
            <Box
              component="img"
              src={preview}
              alt="Preview"
              sx={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                borderRadius: 2,
                mb: 2,
                border: "1px solid #ddd",
              }}
            />
          )}

          {/* Upload Button */}
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2 }}
            fullWidth
          >
            Choose Leaf Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImage}
            />
          </Button>

          {/* Predict Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#2E7D32",
              "&:hover": { backgroundColor: "#1B5E20" },
              py: 1.2,
            }}
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Disease"}
          </Button>

          {/* Loader */}
          {loading && (
            <CircularProgress sx={{ mt: 3 }} />
          )}
        </Paper>
      </Box>
    </>
  );
}

export default PredictDisease;
