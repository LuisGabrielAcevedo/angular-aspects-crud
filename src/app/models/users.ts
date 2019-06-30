import { AppModel } from './abstract-model/app-model';

export default class Users extends AppModel {
    public resource: string = "users";
    public default_model: UserInterface = {
        birthday: '',
        email: '',
        first_name: '',
        last_name: '',
        country_id: null
    }
}

export interface UserInterface {
    birthday: string;
    email: string;
    first_name: string;
    id?: number;
    last_name: string;
    country_id: number;
}