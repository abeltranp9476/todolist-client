import { api } from '../../utils/api';
import { tokenUtils } from '../../utils/authentication';

export const fetchChangePassword = async (formData) => {

    const data = await tokenUtils.getAuthenticationToken();
    let token = null;
    if (data) {
        token = data.split(':')[1];
    }

    const form = new FormData();
    form.append('password', formData.password);
    form.append('new_password', formData.newPassword);
    form.append('new_password_confirmation', formData.newPasswordConfirmation);

    return await api.post(`http://localhost/todo-list-api/public/api/user/change_password`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

}