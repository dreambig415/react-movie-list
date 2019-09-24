import axios from 'axios';

const BASE_URL = 'http://www.omdbapi.com';
const client = axios.create({
    baseURL: BASE_URL,
});

const api = {
    movie: {
        list: async () => {
            const data = await client.get('/');
            return data;
        },
        read: async () => {
            const data = await client.get('/');
            return data;
        }
    }
}

export default api;
