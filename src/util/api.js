import axios from 'axios';
import { BASE_URL, API_KEY } from './constants';

const client = axios.create({
    baseURL: BASE_URL,
});

const api = {
    movie: {
        list: async (searchTerm) => {
            const { data } = await client.get(`/?apikey=${API_KEY}${searchTerm}`);
            return data;
        },
        read: async (id) => {
            const { data } = await client.get(`/?apikey=${API_KEY}&i=${id}`);
            return data;
        }
    }
}

export default api;
