export default class User {
    birthday: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    country: number;
    constructor(user?: UserInterface) {
        this.id = user ? user.id : null;
        this.first_name = user ? user.first_name : '';
        this.last_name =  user ? user.last_name : '';
        this.email = user ? user.email : '';
        this.birthday = user ? user.birthday : '';
        this.country = user ? user.country : null;
    }
}

export interface UserInterface {
    birthday: string;
    email: string;
    first_name: string;
    id?: number;
    last_name: string;
    country: number;
}