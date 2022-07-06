import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types'

import { useFormik } from 'formik'
import { notification } from '../notification/notificationSlice'
import TodolistChangeState from './TodolistChangeState';


function Todolist(props) {
    const dispatch = useDispatch();

    const {
        todos,
        handleIsUpdate,
        handleDelete,
        isRefreshSelection,
    } = props

    const [selectedItems, setSelectedItems] = useState([]);


    const formik = useFormik({
        initialValues: {
            itemsSelected: []
        },
    })

    useEffect(() => {
        if (isRefreshSelection) {
            formik.setFieldValue('itemsSelected', [])
            //console.log('Se ha mandado a refrescar');
        }
    }, [isRefreshSelection])


    return (
        <>
            <TodolistChangeState
                handleDelete={handleDelete}
                items={formik.values.itemsSelected}
            />
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

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
                                    id={todo.id.toString()}
                                    primary={todo.name}
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
