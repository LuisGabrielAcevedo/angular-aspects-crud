export class Country {
    name: string;
    id: number;
    constructor(country?: CountryInterface) {
        this.name = country ? country.name : '';
        this.id = country ? country.id : null;
    }
}

export interface CountryInterface {
    name: string;
    id?: number;
}