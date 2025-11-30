import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

export default function SignUp() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {

        if (!firstName || !email || !password) {
            toast.error("Please fill all required fields");
            return;
        }

        const userData = {
            firstname: firstName,
            lastname: lastName,
            email,
            password
        };

        // ---- API CALL (Using Proxy -> No CORS) ----
        fetch("/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error);
                } else {
                    toast.success("Registration Successful!");
                    navigate("/login");
                }
            })
            .catch(() => {
                toast.error("Something went wrong!");
            });
    };

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ backgroundColor: "#CCEDD2", minHeight: '100vh' }}>
                    <CssBaseline />

                    {/* LEFT IMAGE */}
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={6}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?agriculture&wallpapers)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />

                    {/* RIGHT FORM */}
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={6}
                        component={Paper}
                        elevation={10}
                        square
                        sx={{ backgroundColor: "#CCEDD2" }}
                    >
                        <Box
                            sx={{
                                my: 2,
                                mx: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <AppRegistrationIcon />
                            </Avatar>

                            <Typography variant="h5" sx={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                Registration
                            </Typography>

                            <Box sx={{ mt: 1 }}>
                                <Form>

                                    {/* FIRST NAME */}
                                    <Form.Group style={{ paddingBottom: '13px' }}>
                                        <Form.Label style={{ fontWeight: 'bold' }}>First Name*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            style={{ borderRadius: '30px', height: '30px' }}
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </Form.Group>

                                    {/* LAST NAME */}
                                    <Form.Group style={{ paddingBottom: '13px' }}>
                                        <Form.Label style={{ fontWeight: 'bold' }}>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            style={{ borderRadius: '30px', height: '30px' }}
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Form.Group>

                                    {/* EMAIL */}
                                    <Form.Group style={{ paddingBottom: '13px' }}>
                                        <Form.Label style={{ fontWeight: 'bold' }}>Email*</Form.Label>
                                        <Form.Control
                                            type="email"
                                            style={{ borderRadius: '30px', height: '30px' }}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    {/* PASSWORD */}
                                    <Form.Group style={{ paddingBottom: '13px' }}>
                                        <Form.Label style={{ fontWeight: 'bold' }}>Password*</Form.Label>
                                        <Form.Control
                                            type="password"
                                            style={{ borderRadius: '30px', height: '30px' }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group>

                                    {/* SUBMIT */}
                                    <Form.Group style={{ paddingTop: '20px', textAlign: 'center' }}>
                                        <Button variant="primary" onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                    </Form.Group>

                                </Form>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>

            <ToastContainer />
        </>
    );
}
