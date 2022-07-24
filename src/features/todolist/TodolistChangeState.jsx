import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Delete, CheckOutlined } from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

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
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-start"
                            spacing={1}
                        >
                            <label htmlFor="icon-button-file">
                                <Tooltip title="Eliminar">
                                    <IconButton
                                        color="primary"
                                        aria-label="Eliminar"
                                        component="span"
                                        onClick={(e) => { handleDelete(items) }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </label>

                            <label htmlFor="icon-button-file">
                                <Tooltip title="Marcar realizada">
                                    <IconButton
                                        color="primary"
                                        aria-label="Do"
                                        component="span"
                                        onClick={(e) => { handleDo(items) }}
                                    >
                                        <CheckOutlined />
                                    </IconButton>
                                </Tooltip>
                            </label>
                        </Stack>
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
