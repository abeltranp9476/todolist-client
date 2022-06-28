import { fetchtodos } from './todolistAPI'

export const getTodo = async () => {
    return await fetchtodos();
}