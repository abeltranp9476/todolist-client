import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { selectNotification } from './notificationSlice';

function Notification() {
    const notifications = useSelector(selectNotification);
    const type = notifications.notify.type;
    const message = notifications.notify.message;

    useEffect(() => {
        if (message) {
            if (type === 'error') {
                toast.error(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            if (type === 'success') {
                toast.success(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }, [notifications])


    return null
}

export default Notification
