import { useState } from 'react';
import { useNavigate } from 'react-router';
import "@fontsource/open-sans";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const defaultTheme = createTheme();

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log("Login button clicked");

        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            console.log("Sending login request...");

            const res = await axios.post(
                "http://localhost:5000/auth/login",   // FIXED URL ✔
                { email, password }
            );

            console.log("Login successful!");

            toast.success("Login Successful!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });

            // Save JWT & user info
            localStorage.setItem("token", res.data.token);       // ✔ REAL TOKEN NOW
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("firstname", res.data.firstname);

            navigate("/features");

        } catch (err) {
            console.error("Login failed:", err);
            toast.error(err.response?.data || "Invalid credentials");
        }
    };

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Grid 
                    container 
                    component="main" 
                    sx={{ height: '100vh', backgroundColor: "#CCEDD2" }}
                >
                    <CssBaseline />

                    {/* Centered Login Card */}
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        sx={{ height: "100vh" }}
                    >
                        <Box
                            sx={{
                                width: 400,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                borderRadius: '20px',
                                padding: '30px'
                            }}
                        >
                            <h3
                                style={{
                                    color: 'white',
                                    fontFamily: 'Open Sans',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}
                            >
                                Login
                            </h3>

                            <Form style={{ color: "white" }}>
                                <Form.Group style={{ paddingTop: '10px' }}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        style={{ borderRadius: "20px" }}
                                    />
                                </Form.Group>

                                <Form.Group style={{ paddingTop: '20px' }}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        style={{ borderRadius: "20px" }}
                                    />
                                </Form.Group>

                                {/* Login Button */}
                                <Form.Group style={{ paddingTop: '30px', textAlign: "center" }}>
                                    <Button
                                        variant='light'
                                        type="button"
                                        onClick={handleLogin}
                                        style={{
                                            fontFamily: 'Open Sans',
                                            fontWeight: 'bold',
                                            width: "120px"
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Form.Group>
                            </Form>

                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>

            <ToastContainer />
        </>
    );
}

export default Login;
