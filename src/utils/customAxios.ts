import axios from 'axios';

const customAxios = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 8000,
    headers: {
        Accept: 'application/json',
        'x-rapidapi-host': 'famous-quotes4.p.rapidapi.com',
        'x-rapidapi-key': '<your-key-here>',
    },
});

export default customAxios

