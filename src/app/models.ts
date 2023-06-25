export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface RadioCountry   {
    name: string;
    iso_3166_1: string;
    stationcount: number;
}

export interface RadioStation   {
    name: string;
    country: string;
    state: string;
    favicon: string;
    homepage: string;
    urlcache: string;
}
