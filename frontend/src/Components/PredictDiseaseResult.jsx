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

  // Fallback local image (from your uploaded screenshot). Environment will transform path to URL.
  const fallbackImage = "/mnt/data/Screenshot (138).png";

  // If no answer, show message
  if (!ans || !ans.Crop) {
    return (
      <>
        <NavbarFinal />
        <Box sx={{ pt: 6, textAlign: "center" }}>
          <Typography variant="h6" component="div" sx={{ fontFamily: "Open Sans" }}>
            No prediction found. Please upload an image first.
          </Typography>
        </Box>
      </>
    );
  }

  // Normalize fields to arrays for rendering
  const causes = Array.isArray(ans.Cause_of_disease)
    ? ans.Cause_of_disease
    : ans.Cause_of_disease
    ? [ans.Cause_of_disease]
    : [];

  const preventions = Array.isArray(ans.How_to_prevent_OR_cure_the_disease)
    ? ans.How_to_prevent_OR_cure_the_disease
    : ans.How_to_prevent_OR_cure_the_disease
    ? [ans.How_to_prevent_OR_cure_the_disease]
    : [];

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // small visual feedback could be added here (toast/snackbar)
        console.log("Copied to clipboard");
      })
      .catch(() => console.log("Copy failed"));
  };

  return (
    <>
      <NavbarFinal />

      <Box
        sx={{
          px: { xs: 2, md: 6 },
          py: { xs: 4, md: 6 },
          backgroundColor: "#F6FFF4",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            textAlign: "center",
            fontFamily: "Libre Baskerville, serif",
            fontWeight: "700",
            mb: 4,
          }}
        >
          Disease Prediction Result
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          {/* Image Column */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#ffffff",
              }}
            >
              <Box
                component="img"
                src={tempUrl || fallbackImage}
                alt="Predicted leaf"
                sx={{
                  width: "100%",
                  maxWidth: 420,
                  height: { xs: 220, md: 360 },
                  objectFit: "cover",
                  borderRadius: 1,
                  mb: 2,
                }}
              />

              <Typography
                component="div"
                sx={{ fontFamily: "Open Sans", fontWeight: "700", fontSize: 18 }}
              >
                {ans.Crop || "Unknown Crop"}
              </Typography>

              <Typography
                component="div"
                sx={{ fontFamily: "Open Sans", color: "text.secondary", mt: 1 }}
              >
                <strong>Disease:</strong> {ans.Disease || "Unknown"}
              </Typography>
            </Paper>
          </Grid>

          {/* Details Column */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 2,
                backgroundColor: "#FFFFFF",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
            >
              {/* Cause Section */}
              <Typography
                component="div"
                sx={{ fontFamily: "Open Sans", fontWeight: "700", mb: 1 }}
              >
                Cause of Disease
              </Typography>

              {causes.length ? (
                <List dense>
                  {causes.map((c, i) => (
                    <ListItem key={i} sx={{ pl: 0 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                      <ListItemText
                        primary={c}
                        primaryTypographyProps={{ variant: "body1", component: "div" }}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography component="div" sx={{ color: "text.secondary" }}>
                  Not available
                </Typography>
              )}

              {/* Prevention Section */}
              <Box sx={{ mt: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography component="div" sx={{ fontFamily: "Open Sans", fontWeight: "700" }}>
                  Prevention / Cure Methods
                </Typography>

                {/* Copy whole prevention text if it exists */}
                {preventions.length > 0 && (
                  <IconButton
                    aria-label="copy prevention"
                    onClick={() => handleCopy(preventions.join("\n"))}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              {preventions.length ? (
                <List dense sx={{ mt: 1 }}>
                  {preventions.map((p, idx) => (
                    <ListItem key={idx} sx={{ pl: 0 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                      <ListItemText
                        primary={p}
                        primaryTypographyProps={{ variant: "body1", component: "div" }}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography component="div" sx={{ color: "text.secondary", mt: 1 }}>
                  Not available
                </Typography>
              )}

              {/* Optional: raw JSON for debugging (hidden on small screens) */}
              {/* <Box sx={{ mt: 3 }}>
                <Typography component="div" sx={{ fontSize: 12, color: "text.secondary" }}>
                  <strong>Raw result (debug):</strong>
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: 12,
                    fontFamily: "monospace",
                    background: "#F7F7F7",
                    p: 1,
                    borderRadius: 1,
                    mt: 1,
                    overflowX: "auto",
                  }}
                >
                  {JSON.stringify(ans, null, 2)}
                </Typography>
              </Box> */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default PredictDiseaseResult;
