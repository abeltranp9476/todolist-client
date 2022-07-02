import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types'

import { notification } from '../notification/notificationSlice'

function Todolist(props) {
    const dispatch = useDispatch();
    const { todos } = props
    const [updatingId, setUpdatingId] = useState(0);

    const handleClick = (id) => {
        setUpdatingId(id)
    }


    const handleFinish = (id) => {
        dispatch(notification({
            type: 'success',
            message: 'Tarea finalizada.'
        }));
    }

    return (
        <>
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                {
                    todos?.map((todo, index) => (
                        <ListItem
                            key={todo.id.toString()}
                            secondaryAction={
                                <Checkbox edge="end" onClick={(e) => { handleFinish(todo.id) }} />
                            }
                        >
                            <ListItemButton>
                                <ListItemText
                                    id={todo.id.toString()}
                                    primary={todo.name}
                                    value={todo.id}
                                    onClick={(e) => { handleClick(todo.id) }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List >
            {
                (updatingId) ? (
                    <>
                        Se está editando {updatingId}
                    </>
                ) : (
                    <>
                        No se está editando
                    </>
                )
            }
        </>
    )
}

Todolist.propTypes = {}

export default Todolist
