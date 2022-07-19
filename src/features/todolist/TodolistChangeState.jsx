import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Delete, CheckOutlined } from '@mui/icons-material';
import Chip from '@mui/material/Chip';

function TodolistChangeState(props) {
    const {
        handleDelete,
        handleDo,
        items,
    } = props

    return (
        <>
            {
                (items.length) ? (
                    <>
                        <Chip label={items.length} size="small" variant="outlined" />
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

                        <label htmlFor="icon-button-file">
                            <IconButton
                                color="primary"
                                aria-label="Do"
                                component="span"
                                onClick={(e) => { handleDo(items) }}
                            >
                                <CheckOutlined />
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
