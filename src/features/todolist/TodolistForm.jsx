import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { useFormik, Formik } from 'formik';
import { ThemeProvider } from '@emotion/react';


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
                <Formik>
                    <TextField
                        size="small"
                        fullWidth
                        id="name"
                        name="name"
                        label="Nombre"
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </Formik>

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
                    multiline="10"
                    maxRows="4"
                    onChange={formik.handleChange}
                    value={formik.values.description}
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
                            variant="outlined"
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
