import { api } from '../../utils/api';
import { tokenUtils } from '../../utils/authentication';

export const fetchLogin = async (email, password) => {
  const form = new FormData();
  form.append('email', email);
  form.append('password', password);
  form.append('device', 'react');

  return await api.post('http://localhost/todo-list-api/public/api/login', form);
}

export const fetchGetUser = async (id) => {
  const data = await tokenUtils.getAuthenticationToken();
  let token = null;
  if (data) {
    token = data.split(':')[1];
  }

  try {
    return await api.get(`http://localhost/todo-list-api/public/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    tokenUtils.clearAuthenticationToken();
  }
}

export const fetchLogout = async () => {
  const data = await tokenUtils.getAuthenticationToken();
  let token = null;
  if (data) {
    token = data.split(':')[1];
  }

  return await api.post(`http://localhost/todo-list-api/public/api/logout`, [], {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}