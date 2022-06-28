import { api } from '../../utils/api';
import { tokenUtils } from '../../utils/authentication';

export const fetchtodos = async () => {
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