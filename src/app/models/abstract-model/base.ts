import { Model } from '../../axioquent';
import { AxiosquentHeaders } from '../../axioquent/interfaces/axiosquent-headers';
import { Builder } from '../../aspects/builder';
// import { Model } from "axiosquent-ts";
// import { AxiosquentHeaders } from 'axiosquent-ts/dist/interfaces/axiosquent-headers';

export class Base extends Model {
    public getBaseUrl(): string {
        return 'https://api-crud-test.herokuapp.com';
    }

    public getHeaders(): AxiosquentHeaders {
        return {
            Authorization: 'token'
        };
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
