import { api } from '../../utils/api';

export const fetchRegister = async (data) => {
  const form = new FormData();
  form.append('firstname', data.values.firstname);
  form.append('lastname', data.values.lastname);
  form.append('nic', data.values.nic);
  form.append('email', data.values.email);
  form.append('country', data.values.country);
  form.append('password', data.values.password);
  form.append('password_confirmation', data.values.rePassword);

  return await api.post('http://localhost/mercazona-core/public/api/users', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}