import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    notify: {},
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setNotification: (state, action) => {
            state.notify = action.payload;
        },
    },

});

export const { setNotification } = notificationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNotification = (state) => state.notification;


export default notificationSlice.reducer;

export const notification = (options) => async (dispatch) => {
    dispatch(setNotification(options));
}