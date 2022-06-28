import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin } from '../login/loginSlice';
import Todolist from '../todolist/Todolist';
import { fetchtodos } from '../todolist/todolistAPI'

function Home() {
    const [todos, setTodos] = useState([])

    const loadInitData = async () => {
        const todoList = await fetchtodos()
        setTodos(todoList);
    }

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            loadInitData()
        }

        return () => {
            mounted = false;
        };
    }, [])

    return (
        <Todolist todos={todos?.data?.data} />
    )
}

export default Home