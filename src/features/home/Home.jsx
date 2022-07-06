import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin } from '../login/loginSlice';
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

function Home() {
    const dispatch = useDispatch();
    const [todos, setTodos] = useState([])
    const [isUpdate, setIsUpdate] = useState(false);
    const [itemUpdate, setItemUpdate] = useState(null);
    const [itemValues, setItemValues] = useState([]);
    const [isRefreshSelection, setIsRefreshSelection] = useState(false);

    const loadInitData = async () => {
        const todoList = await fetchTodos()
        setTodos(todoList)
        setIsRefreshSelection(false)
    }

    useEffect(() => {
        loadInitData()
    }, [])

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
                <Grid container spacing={2} sx={{ m: 1 }}>
                    <Grid item xs={8}>
                        <Item>
                            <Todolist
                                todos={todos?.data?.data}
                                handleIsUpdate={handleIsUpdate}
                                handleDelete={handleDelete}
                                handleDo={handleDo}
                                itemUpdate={itemUpdate}
                                isRefreshSelection={isRefreshSelection}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <TodolistForm
                                isUpdate={isUpdate}
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