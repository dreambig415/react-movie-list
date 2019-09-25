import axios from 'axios';
import { BASE_URL, API_KEY } from './constants';

const client = axios.create({
    baseURL: BASE_URL,
});

const api = {
    movie: {
        list: async ({searchString, currentPage = 1}) => {
            const { data } = await client.get(`/?apikey=${API_KEY}${searchString}&page=${currentPage}`);
            return data;
        },
        read: async (id) => {
            const { data } = await client.get(`/?apikey=${API_KEY}&i=${id}`);
            return data;
        }
    }
}

export default api;
