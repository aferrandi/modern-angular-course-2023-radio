import { Injectable, effect, inject, signal } from "@angular/core";
import { Todo, Post, RadioCountry, RadioStation } from '../models'
import { LocalStorageService } from "../utilities/local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class State {
    private key = 'store';
    store = signal<StoreType>(initialStoreState);

    private _localStorageService = inject(LocalStorageService)

    constructor() {
        const localStore = this._localStorageService.getItem(this.key);
        if(localStore) {
            this.store.set(localStore);
        }
        this._localStorageService.setItem(this.key, this.store());
    }
}

export interface StoreType {
    loading: boolean;
    error: string;
    todos: Todo[];
    posts: Post[];
    radioCountries: RadioCountry[],
    radioStations: RadioStation[],
}

const initialStoreState: StoreType = {
    loading: false,
    error: '',
    todos: [],
    posts: [],
    radioCountries: [],
    radioStations: []
}