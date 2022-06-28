import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

import PropTypes from 'prop-types'

function Todolist(props) {
    const todos = props.todos

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

            {
                todos?.map((todo, index) => (
                    <ListItem
                        key={todo.id.toString()}
                        secondaryAction={
                            <Checkbox edge="end" />
                        }
                    >
                        <ListItemButton>
                            <ListItemText id={todo.id.toString()} primary={todo.name} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List >
    )
}

Todolist.propTypes = {}

export default Todolist
