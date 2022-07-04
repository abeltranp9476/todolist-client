import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Delete } from '@mui/icons-material';

function TodolistChangeState(props) {
    const {
        isSelectedItems,
        handleDelete,
        items,
    } = props

    return (
        <>
            {
                (isSelectedItems) ? (
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
