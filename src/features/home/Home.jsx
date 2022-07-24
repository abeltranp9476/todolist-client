import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin } from '../login/loginSlice';
import { useNavigate } from 'react-router-dom';
import { tokenUtils } from '../../utils/authentication.js';
import Todolist from '../todolist/Todolist';
import {
    fetchTodos,
    fetchTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    doTodo,
} from '../todolist/todolistAPI'


import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import TodolistForm from '../todolist/TodolistForm';
import { notification } from '../notification/notificationSlice'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const theme = createTheme();

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const session = useSelector(selectLogin);
    const [todos, setTodos] = useState([])
    const [isUpdate, setIsUpdate] = useState(false);
    const [itemUpdate, setItemUpdate] = useState(null);
    const [itemValues, setItemValues] = useState([]);
    const [isRefreshSelection, setIsRefreshSelection] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    const handlePageChange = (event, page) => {
        setPage(page)
    }

    const handleLimitChange = (event) => {
        setLimit(event.target.value)
    }

    const loadInitData = async () => {
        setIsLoading(true);
        const todoList = await fetchTodos({
            page: page,
            limit: limit,
        })
        setTodos(todoList)
        setIsRefreshSelection(false);
        setIsLoading(false);
    }

    useEffect(() => {
        if (!tokenUtils.getUserId()) navigate('/login');
        loadInitData();
    }, [page, limit])

    const handleIsUpdate = async (item) => {
        setIsUpdate(true)
        setItemUpdate(item)
        const response = await fetchTodo(item)
        setItemValues(response.data.data)
    }

    const handleReset = () => {
        setIsUpdate(false)
        setItemUpdate(null)
        setItemValues([]);
    }

    const handleDelete = async (items) => {
        await deleteTodo(items)
        dispatch(notification({
            type: 'success',
            message: 'Se ha eliminado correctamente.'
        }));
        setIsRefreshSelection(true);
        loadInitData()
    }

    const handleDo = async (items) => {
        await doTodo(items)
        dispatch(notification({
            type: 'success',
            message: 'Se ha cambiado el estado correctamente.'
        }));
        setIsRefreshSelection(true);
        loadInitData()
    }

    const handleClick = async (values) => {
        if (isUpdate) {
            await updateTodo(itemUpdate, values.name, values.description);
            dispatch(notification({
                type: 'success',
                message: 'Se ha editado correctamente.'
            }));
        } else {
            await createTodo(values.name, values.description);
            dispatch(notification({
                type: 'success',
                message: 'Se ha creado correctamente.'
            }));
        }
        loadInitData()
    }

    return (
        <ThemeProvider theme={theme} >
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Grid container spacing={2} sx={{ m: 1, bgcolor: 'background.paper' }}>
                    <Grid item xs={8}>
                        <Item>
                            <Todolist
                                todosAll={todos}
                                handleIsUpdate={handleIsUpdate}
                                handleDelete={handleDelete}
                                handleDo={handleDo}
                                handlePageChange={handlePageChange}
                                handleLimitChange={handleLimitChange}
                                itemUpdate={itemUpdate}
                                isRefreshSelection={isRefreshSelection || false}
                                isLoading={isLoading}
                                page={page}
                                limit={limit}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <TodolistForm
                                isUpdate={isUpdate || false}
                                handleReset={handleReset}
                                handleClick={handleClick}
                                itemValues={itemValues}
                            />
                        </Item>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default Home