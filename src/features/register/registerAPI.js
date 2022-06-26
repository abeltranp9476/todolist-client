import { api } from '../../utils/api';

export const fetchRegister = async (data) => {
  const form = new FormData();
  form.append('name', data.values.name);
  form.append('email', data.values.email);
  form.append('password', data.values.password);
  form.append('password_confirmation', data.values.rePassword);

  return await api.post('http://localhost/todo-list-api/public/api/register', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}