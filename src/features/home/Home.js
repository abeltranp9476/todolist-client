import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin } from '../login/loginSlice';



function Home() {
    const session = useSelector(selectLogin);
    const dispatch = useDispatch();


    return (
        <>
            <h1>Bienvenido</h1>
        </>
    )
}

export default Home