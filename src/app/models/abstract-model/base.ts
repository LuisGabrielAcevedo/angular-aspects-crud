import { Builder } from '../../aspects/builder';
import { Model, AxiosquentHeaders } from "axiosquent-ts";

export class Base extends Model {
    public baseUrl(): string {
        return 'https://api-crud-test.herokuapp.com';
    }

    headers(): AxiosquentHeaders {
        const headers: AxiosquentHeaders = {};
        headers['Authorization'] = 'token'
        return headers;
    }
    
    public builderClass(): typeof Builder {
        return Builder;
    }

    public builder(): Promise<Builder> {
        const builderClass: typeof Builder = this.builderClass();
        const builder: Builder = new builderClass(this);
        return builder.initializationPromise;
    }
}
