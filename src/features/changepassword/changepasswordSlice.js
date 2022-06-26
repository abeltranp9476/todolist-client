import { notification } from '../notification/notificationSlice';
import { fetchChangePassword } from './changepasswordAPI';

export const changepassword = (data) => async (dispatch) => {
    try {

        const result = await fetchChangePassword(data);
        if (result?.data?.data?.result === 'Todo ok') {
            dispatch(notification({
                type: 'success',
                message: 'Su contraseña ha sido cambiada.'
            }));
        }
    } catch (error) {
        dispatch(notification({
            type: 'error',
            message: 'Lo sentimos. Revise los datos introducidos.'
        }));
    }
}