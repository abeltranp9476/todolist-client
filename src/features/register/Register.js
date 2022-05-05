import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetchRegister } from './registerAPI';

const theme = createTheme();

export default function Register() {

    const [formState, setformState] = useState({
        values: {},
    });

    const stractSelectField = (field, value, files) => {
        if (field === 'checkbox')
            if (value === 'disponible') return 'indisponible';
            else return 'disponible';
        else if (field === 'file') return files[0];
        return value;
    }

    const handleChange = event => {
        event.persist();

        setformState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    stractSelectField(event.target.type, event.target.value, event.target.files)
            }
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        fetchRegister(formState);
    }

    return (
        <ThemeProvider theme={theme}>
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
                        Nueva cuenta
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstname"
                            label="Nombre"
                            name="name"
                            autoComplete="off"
                            autoFocus
                            onChange={handleChange}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Dirección de correo"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="rePassword"
                            label="Repetir contraseña"
                            type="Password"
                            id="password"
                            autoComplete="off"
                            onChange={handleChange}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Crear cuenta
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/login" className="body2">
                                    Iniciar sesión
                                </Link>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    )
}
