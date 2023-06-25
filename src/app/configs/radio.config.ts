import axios from 'axios';

export const apiRadio = axios.create({
    baseURL: 'http://at1.api.radio-browser.info/json/'
});

apiRadio.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('token');
    if(token && token.length > 0) {
        config.headers['token'] = token;
    }
    return config;
});

export const RadioEndPoints = {
    countries: "countries",
    stations: "stations"
} as const;

export type RadioEndPointsKeys = keyof typeof RadioEndPoints;
    