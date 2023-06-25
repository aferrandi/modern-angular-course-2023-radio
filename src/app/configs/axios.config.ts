import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});

api.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('token');
    if(token && token.length > 0) {
        config.headers['token'] = token;
    }
    return config;
});

export const EndPoints = {
    todos: "todos",
    posts: "posts"
} as const;

export type EndPointsKeys = keyof typeof EndPoints;