import { AppModel } from './abstract-model/app-model';

export default class Countries extends AppModel {
    public resource: string = "countries";
    public default_model: CountryInterface = {
        name: ''
    }
}

export interface CountryInterface {
    name: string;
    id?: number;
}