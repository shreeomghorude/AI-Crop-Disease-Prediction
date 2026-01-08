import React, { useContext } from "react";
import {
  Typography,
  Grid,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AppContext from "../AppContext";
import NavbarFinal from "./NavbarFinal";

function PredictDiseaseResult() {
  const { ans, tempUrl } = useContext(AppContext);
  const fallbackImage = "/mnt/data/Screenshot (138).png";

  if (!ans || Object.keys(ans).length === 0) {
    return (
      <>
        <NavbarFinal />
        <Box sx={{ pt: 6, textAlign: "center" }}>
          <Typography variant="h6">
            No prediction found. Please upload an image first.
          </Typography>
        </Box>
      </>
    );
  }

  // 🔥 CRITICAL FIX — UNWRAP RESPONSE
  const data = ans.prediction || ans;

  const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

  const crop = data.crop || data.Crop || "Unknown Crop";
  const disease = data.disease || data.Disease || "Unknown Disease";

  const causes = toArray(
    data.cause || data.Cause_of_disease
  );
  const preventions = toArray(
    data.prevention || data.How_to_prevent_OR_cure_the_disease
  );

  const treatments = toArray(data.treatment);
  const fertilizers = toArray(data.fertilizer);
  const dos = toArray(data.dos_and_donts?.do);
  const donts = toArray(data.dos_and_donts?.dont);

  const handleCopy = (arr) => {
    if (!arr.length) return;
    navigator.clipboard.writeText(arr.join("\n"));
  };

  return (
    <>
      <NavbarFinal />

      <Box sx={{ px: 4, py: 6, backgroundColor: "#F6FFF4", minHeight: "100vh" }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontFamily: "Libre Baskerville, serif",
            fontWeight: 700,
            mb: 4,
          }}
        >
          Disease Prediction Result
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* IMAGE */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
              <Box
                component="img"
                src={tempUrl || fallbackImage}
                alt="Leaf"
                sx={{
                  width: "100%",
                  maxWidth: 420,
                  height: 320,
                  objectFit: "cover",
                  borderRadius: 1,
                  mb: 2,
                }}
              />
              <Typography sx={{ fontWeight: 700 }}>{crop}</Typography>
              <Typography sx={{ color: "text.secondary" }}>
                <strong>Disease:</strong> {disease}
              </Typography>
            </Paper>
          </Grid>

          {/* DETAILS */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>

              <Typography sx={{ fontWeight: 700 }}>Cause of Disease</Typography>
              <List dense>
                {causes.map((c, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                    <ListItemText primary={c} />
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700 }}>
                  Prevention / Cure Methods
                </Typography>
                <IconButton size="small" onClick={() => handleCopy(preventions)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
              <List dense>
                {preventions.map((p, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                    <ListItemText primary={p} />
                  </ListItem>
                ))}
              </List>

              <Typography sx={{ fontWeight: 700, mt: 3 }}>Treatment</Typography>
              <List dense>
                {treatments.map((t, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                    <ListItemText primary={t} />
                  </ListItem>
                ))}
              </List>

              <Typography sx={{ fontWeight: 700, mt: 3 }}>
                Fertilizer Recommendation
              </Typography>
              <List dense>
                {fertilizers.map((f, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                    <ListItemText primary={f} />
                  </ListItem>
                ))}
              </List>

              <Typography sx={{ fontWeight: 700, mt: 3 }}>Do’s</Typography>
              <List dense>
                {dos.map((d, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>✔</ListItemIcon>
                    <ListItemText primary={d} />
                  </ListItem>
                ))}
              </List>

              <Typography sx={{ fontWeight: 700, mt: 2 }}>Don’ts</Typography>
              <List dense>
                {donts.map((d, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>✖</ListItemIcon>
                    <ListItemText primary={d} />
                  </ListItem>
                ))}
              </List>

            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default PredictDiseaseResult;
