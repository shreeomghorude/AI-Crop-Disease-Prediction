import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/open-sans";
import "@fontsource/libre-baskerville/400-italic.css";
import NavbarFinal from "./NavbarFinal";

const theme = createTheme();

function Home() {
  const navigate = useNavigate();

  const handleSignUp = () => navigate("/sign-up");
  const handleLogin = () => navigate("/login");

  return (
    <>
      <NavbarFinal />

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Grid
          container
          sx={{
            height: "calc(100vh - 70px)", // adjust if needed
            overflow: "hidden",
            backgroundColor: "#D2F6C5",
          }}
        >
          {/* LEFT SECTION */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "80px",
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Libre Baskerville",
                fontWeight: "bold",
                fontSize: "45px",
                marginBottom: "20px",
              }}
            >
              Empowering Farmers
            </Typography>

            <Typography
              sx={{
                fontFamily: "Libre Baskerville",
                fontWeight: "bold",
                fontSize: "45px",
                marginBottom: "40px",
              }}
            >
              Through Innovation
            </Typography>

            {/* BUTTONS */}
            <Box sx={{ display: "flex", gap: 3, marginTop: "20px" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSignUp}
                sx={{
                  width: "150px",
                  height: "50px",
                  borderRadius: "10px",
                  fontFamily: "Open Sans",
                  fontWeight: "bold",
                  ":hover": { backgroundColor: "#AF5", color: "black" },
                }}
              >
                Signup <HowToRegIcon sx={{ ml: 1 }} />
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={handleLogin}
                sx={{
                  width: "150px",
                  height: "50px",
                  borderRadius: "10px",
                  fontFamily: "Open Sans",
                  fontWeight: "bold",
                  ":hover": { backgroundColor: "#AF5", color: "black" },
                }}
              >
                Login <LoginIcon sx={{ ml: 1 }} />
              </Button>
            </Box>
          </Grid>

          {/* RIGHT IMAGE */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              height: "81vh",
              backgroundImage: "url('/homepage1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default Home;
