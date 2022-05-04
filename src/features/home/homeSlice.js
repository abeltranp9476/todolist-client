import { createSlice } from '@reduxjs/toolkit';
import { fetchGetCategories } from './homeAPI';
const initialState = {
    categories: [],
};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
    },

});

export const { setCategories } = homeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectHome = (state) => state.home;


export default homeSlice.reducer;

export const getCategories = (idReparto) => async (dispatch) => {
    const response = await fetchGetCategories(idReparto);
    dispatch(setCategories(response.data.data));
}
