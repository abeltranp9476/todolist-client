import { fetchTodos } from './todolistAPI'

export const getTodo = async () => {
    return await fetchTodos();
}