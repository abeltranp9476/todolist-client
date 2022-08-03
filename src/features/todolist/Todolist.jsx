import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography';
import { Checkbox } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { TablePagination } from '@mui/material';
import Chip from '@mui/material/Chip';
import * as moment from 'moment'
import TodolistChangeState from './TodolistChangeState';

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
        isLoading,
    } = props

    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedCustomerIds.indexOf(id);
        let newSelectedCustomerIds = [];

        if (selectedIndex === -1) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
        } else if (selectedIndex === 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
        } else if (selectedIndex === selectedCustomerIds.length - 1) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds.slice(0, selectedIndex),
                selectedCustomerIds.slice(selectedIndex + 1)
            );
        }

        setSelectedCustomerIds(newSelectedCustomerIds);
    };

    const handleSelectAll = (event) => {
        let newSelectedCustomerIds;

        if (event.target.checked) {
            newSelectedCustomerIds = customers.map((customer) => customer.id);
        } else {
            newSelectedCustomerIds = [];
        }

        setSelectedCustomerIds(newSelectedCustomerIds);
    };

    useEffect(() => {
        if (isRefreshSelection) {
            setSelectedCustomerIds([]);
        }
    }, [isRefreshSelection])


    const todos = todosAll?.data?.data;

    return (
        <>
            {
                (isLoading) ? (
                    <>
                        <Stack spacing={1}>
                            <Skeleton animation="wave" variant="text" height={40} />
                            <Skeleton animation="wave" variant="rectangular" height={60} width="75%" />
                            <Skeleton animation="wave" variant="circular" width={80} height={40} />
                            <Skeleton animation="wave" variant="rectangular" height={30} />
                            <Skeleton animation="wave" variant="rectangular" height={60} width="41%" />
                            <Skeleton animation="wave" variant="circular" width={80} height={40} />
                            <Skeleton animation="wave" variant="rectangular" height={30} />
                        </Stack>
                    </>
                ) : (
                    <>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            color="inherit"
                            sx={{ display: { xs: 'block', sm: 'block' } }}
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
                            items={selectedCustomerIds}
                        />

                        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>

                            {
                                todos?.map((todo, index) => (
                                    <ListItem
                                        key={todo.id}
                                        secondaryAction={
                                            <Checkbox
                                                value={todo.id}
                                                name="itemsSelected"
                                                edge="start"
                                                checked={selectedCustomerIds.indexOf(todo.id) !== -1}
                                                onChange={(event) => handleSelectOne(event, todo.id)}
                                            />

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
                            count={todosAll?.data?.meta?.total || 0}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleLimitChange}
                            page={page}
                            rowsPerPage={limit}
                            rowsPerPageOptions={[5, 10, 25]}
                        />
                    </>
                )
            }
        </>
    )
}

Todolist.propTypes = {}

export default Todolist
