import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography';

import { useFormik } from 'formik'
import TodolistChangeState from './TodolistChangeState';


function Todolist(props) {

    const {
        todos,
        handleIsUpdate,
        handleDelete,
        handleDo,
        isRefreshSelection,
    } = props


    const formik = useFormik({
        initialValues: {
            itemsSelected: []
        },
    })

    useEffect(() => {
        if (isRefreshSelection) {
            formik.setFieldValue('itemsSelected', [])
            formik.resetForm()
            //console.log('Se ha mandado a refrescar');
        }
    }, [isRefreshSelection])

    return (
        <>
            <Typography
                variant="h6"
                noWrap
                component="div"
                color="inherit"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                {
                    (todos?.length) ? (
                        <>
                            Lista de tareas
                        </>
                    ) : (
                        <>
                            No hay tareas
                        </>
                    )

                }
            </Typography>

            <TodolistChangeState
                handleDelete={handleDelete}
                handleDo={handleDo}
                items={formik.values.itemsSelected}
            />

            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>

                {
                    todos?.map((todo, index) => (
                        <ListItem
                            key={todo.id.toString()}
                            secondaryAction={
                                <Checkbox
                                    id={todo.id}
                                    value={todo.id}
                                    name="itemsSelected"
                                    edge="start"
                                    onClick={formik.handleChange}

                                />
                            }
                        >
                            <ListItemButton>
                                <ListItemText
                                    primary={
                                        <Typography
                                            type="body2"
                                            style={
                                                (todo.made_at !== null) ? (
                                                    { textDecoration: 'line-through' }
                                                ) : (
                                                    { textDecoration: '' }
                                                )

                                            }

                                        >
                                            {todo.name}
                                        </Typography>}
                                    value={todo.id}
                                    onClick={(e) => { handleIsUpdate(todo.id) }}
                                />

                            </ListItemButton>
                        </ListItem>
                    ))
                }

            </List >

        </>
    )
}

Todolist.propTypes = {}

export default Todolist
