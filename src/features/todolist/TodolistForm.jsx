import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';

import { useFormik, Formik } from 'formik';
import { ThemeProvider } from '@emotion/react';
import { toast } from 'react-toastify';

function TodolistForm(props) {

    const {
        isUpdate,
        handleReset,
        handleClick,
        itemValues,
    } = props

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
    })

    const handleClickThis = () => {
        handleClick(formik.values);
        handleReset();
        formik.resetForm();
    }

    const handleResetThis = () => {
        handleReset();
        formik.resetForm();
    }


    useEffect(() => {
        formik.setFieldValue('name', itemValues.name)
        formik.setFieldValue('description', itemValues.description)
    }, [itemValues])


    return (
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { mb: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color="inherit"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    {
                        (isUpdate) ? (
                            <>
                                Actualizar
                            </>
                        ) : (
                            <>
                                Crear
                            </>
                        )
                    }
                </Typography>


                <TextField
                    size="small"
                    fullWidth
                    id="name"
                    name="name"
                    label="Nombre"
                    variant="standard"
                    onChange={formik.handleChange}
                    value={formik.values.name || ""}
                />


            </Box>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { mb: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    size="small"
                    fullWidth
                    id="description"
                    name="description"
                    label="Descripcion"
                    variant="standard"
                    multiline={false}
                    maxRows="4"
                    onChange={formik.handleChange}
                    value={formik.values.description || ""}
                />
            </Box>

            <Stack spacing={2} direction="row">
                <Button
                    variant="outlined"
                    onClick={handleClickThis}
                >
                    {
                        (isUpdate) ? (
                            <>
                                Cambiar
                            </>
                        ) : (
                            <>
                                Agregar
                            </>
                        )
                    }

                </Button>

                {
                    (props.isUpdate) ? (
                        <Button
                            variant=""
                            onClick={handleResetThis}
                        >
                            Cancelar
                        </Button>
                    ) : (
                        <>
                        </>
                    )
                }

            </Stack>
        </>
    )
}

TodolistForm.propTypes = {}

export default TodolistForm
