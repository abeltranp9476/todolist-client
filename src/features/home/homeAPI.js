import { api } from '../../utils/api';
import { tokenUtils } from '../../utils/authentication';


export const fetchGetCategories = async (repartoId) => {
    const data = await tokenUtils.getAuthenticationToken();
    let token = null;
    if (data) {
        token = data.split('|')[1];
    }
    return await api.get(`http://localhost/mercazona-core/public/api/points?reparto=${repartoId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

}