import { createSlice } from '@reduxjs/toolkit';
import { tokenUtils } from '../../utils/authentication';

import {
  fetchLogin,
  fetchGetUser,
  fetchLogout,
} from "./loginAPI";

import { notification } from "../notification/notificationSlice";

const initialState = {
  user: {},
  isAutentifiqued: 0,
  firstname: ''
};

export const loginSlice = createSlice({
  name: 'session',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setlogin: (state, action) => {
      state.user = action.payload;
      if (action.payload.user?.name) {
        state.firstname = action.payload.user.name;
        state.isAutentifiqued = 1;
      } else {
        state.firstname = action.payload.name;
        state.isAutentifiqued = 1;
      }
    },
    setLogout: (state, action) => {
      state.isAutentifiqued = 0;
      tokenUtils.clearAuthenticationToken();
    },
  },

});

export const { setlogin, setLogout } = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLogin = (state) => state.session;


export default loginSlice.reducer;


export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetchLogin(email, password);
    let accessToken = response?.data.data.token;
    let userId = response?.data.data.user.id;
    if (accessToken) {
      tokenUtils.setAuthenticationToken(userId + ':' + accessToken);
    }
    dispatch(setlogin(response?.data.data));
  } catch (e) {
    dispatch(notification({
      type: 'error',
      message: 'Atienda por favor! Algo puso mal...'
    }));
  }
}

export const getUser = (id) => async (dispatch) => {
  try {
    const response = await fetchGetUser(id);
    if (response?.data.data) {
      dispatch(setlogin(response.data.data));
    }
  } catch (e) {
    dispatch(notification({
      type: 'error',
      message: 'Se ha denegado el acceso... Autentifíquese.'
    }));
  }
}

export const logout = () => async (dispatch) => {
  await fetchLogout();
  dispatch(setLogout());
}