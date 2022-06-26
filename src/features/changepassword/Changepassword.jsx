import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { changepassword } from './changepasswordSlice';

const theme = createTheme();

function Changepassword(props) {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleNewPassword = (event) => {
        setNewPassword(event.target.value);
    }

    const handleNewPasswordConfirmation = (event) => {
        setNewPasswordConfirmation(event.target.value);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(changepassword({
            password: password,
            newPassword: newPassword,
            newPasswordConfirmation: newPasswordConfirmation
        }));
    }



    return (
        <ThemeProvider theme={theme} >
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Cambiar contraseña
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña actual"
                            type="password"
                            id="password"
                            onChange={handlePassword}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="new_password"
                            label="Nueva contraseña"
                            type="password"
                            id="new_password"
                            onChange={handleNewPassword}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="new_password_confirmation"
                            label="Repetir contraseña"
                            type="password"
                            id="new_password_confirmation"
                            onChange={handleNewPasswordConfirmation}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Aceptar
                        </Button>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider >
    )
}

Changepassword.propTypes = {}

export default Changepassword
