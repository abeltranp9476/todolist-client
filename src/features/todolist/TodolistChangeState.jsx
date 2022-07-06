import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Delete } from '@mui/icons-material';

function TodolistChangeState(props) {
    const {
        handleDelete,
        items,
    } = props

    return (
        <>
            {
                (items.length) ? (
                    <>
                        <label htmlFor="icon-button-file">
                            <IconButton
                                color="primary"
                                aria-label="Eliminar"
                                component="span"
                                onClick={(e) => { handleDelete(items) }}
                            >
                                <Delete />
                            </IconButton>
                        </label>
                    </>
                ) : (
                    <>
                    </>
                )
            }

        </>
    )
}

TodolistChangeState.propTypes = {}

export default TodolistChangeState
