import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography';
import { Checkbox } from '@mui/material';
import { TablePagination } from '@mui/material';
import Chip from '@mui/material/Chip';
import * as moment from 'moment'
import { useFormik, Formik, Form, Field } from 'formik'
import TodolistChangeState from './TodolistChangeState';
import Mycheckbox from '../Mycheckbox/Mycheckbox';


function Todolist(props) {

    const {
        todosAll,
        handleIsUpdate,
        handleDelete,
        handleDo,
        handlePageChange,
        handleLimitChange,
        isRefreshSelection,
        page,
        limit,
    } = props

    const [initialValues, setInitialValues] = useState({
        itemsSelected: []
    });

    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    })

    const isChecked = (value) => {
        return false
    }


    useEffect(() => {
        if (isRefreshSelection) {
            formik.setFieldValue('itemsSelected', [])
            formik.resetForm({ 'itemsSelected': [] })
        }
    }, [isRefreshSelection])


    useEffect(() => {
        setSelectedCustomerIds(formik.values.itemsSelected);
    }, [formik.values.itemsSelected])


    const todos = todosAll?.data?.data




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
                                <Formik
                                    initialValues={initialValues}
                                >
                                    <Form>
                                        <Mycheckbox
                                            id={todo.id}
                                            value={todo.id}
                                            name="itemsSelected"
                                            edge="start"
                                            onChange={formik.handleChange} />
                                    </Form>
                                </Formik>
                            }
                        >
                            <ListItemButton>
                                <ListItemText
                                    primary={
                                        <>
                                            {
                                                (todo.made_at) ? (
                                                    <Chip
                                                        label={moment(todo.made_at, "YYYYMMDD").fromNow()}
                                                        size="small"
                                                        variant="outlined"
                                                        color="success"
                                                    />
                                                ) : (
                                                    <>
                                                    </>
                                                )

                                            }
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
                                            </Typography>
                                        </>
                                    }
                                    value={todo.id}
                                    onClick={(e) => { handleIsUpdate(todo.id) }}
                                />

                            </ListItemButton>
                        </ListItem >
                    ))
                }

            </List >
            <TablePagination
                component="div"
                count={todosAll?.data?.meta?.total}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </>

    )
}

Todolist.propTypes = {}

export default Todolist
