
import axios from 'axios';

const defaultAxios = axios.create({
    baseURL: 'http://localhost:3002',
    headers: {
        'Content-Type': 'application/json',
    },
});

export { defaultAxios };