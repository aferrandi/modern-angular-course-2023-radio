

import { Injectable } from '@angular/core';
import { RadioEndPointsKeys, apiRadio } from '../configs/radio.config';

@Injectable({
  providedIn: 'root'
})
export class RadioHttpService {
    async getCountries<T>(endpoint: RadioEndPointsKeys, from: number) {
      return await apiRadio.get<T>(`${endpoint}?offset=${from}&&limit=10`);
    }

    async getStations<T>(endpoint: RadioEndPointsKeys, country: string) {
      return await apiRadio.get<T>(`${endpoint}/bycountry/${country}?limit=100`);
    }

}

