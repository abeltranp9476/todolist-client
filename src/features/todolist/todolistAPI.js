import { api } from '../../utils/api';
import { tokenUtils } from '../../utils/authentication';

export const fetchTodos = async () => {
    const data = await tokenUtils.getAuthenticationToken();
    let token = null;
    if (data) {
        token = data.split(':')[1];
    }

    return await api.get('todo', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

}

export const fetchTodo = async (id) => {
    const data = await tokenUtils.getAuthenticationToken();
    let token = null;
    if (data) {
        token = data.split(':')[1];
    }

    return await api.get(`todo/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

}

export const createTodo = async (name, description) => {
    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('device', 'react');

    const data = await tokenUtils.getAuthenticationToken();
    let token = null;
    if (data) {
        token = data.split(':')[1];
    }

    return await api.post('todo', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const updateTodo = async (id, name, description) => {
    const form = new FormData()
    form.append('name', name)
    form.append('description', description)
    form.append('device', 'react')
    form.append('_method', 'PUT')

    const data = await tokenUtils.getAuthenticationToken()
    let token = null
    if (data) {
        token = data.split(':')[1]
    }

    return await api.post(`todo/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteTodo = async (ids) => {
    const form = new FormData()
    form.append('device', 'react')
    form.append('ids', ids);
    form.append('_method', 'DELETE')

    const data = await tokenUtils.getAuthenticationToken()
    let token = null
    if (data) {
        token = data.split(':')[1]
    }

    return await api.post('todo/delete', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}