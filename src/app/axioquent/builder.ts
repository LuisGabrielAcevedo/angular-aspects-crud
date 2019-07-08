import { QueryMethods } from './interfaces/query-methods';
import { Response } from "./response/response";
import { Model } from './model';
import { HttpClient } from 'src/app/axioquent/axios/interfaces/http-client';
import { Query } from './query';
import { FilterSpec } from './filter/filter-spec';

export class Builder implements QueryMethods {
    protected type: any;
    private httpClient: HttpClient;
    private query: Query;
    private forceSingular: boolean;

    constructor(
        type: typeof Model,
        queriedRelationName?: string,
        baseModelType?: string,
        forceSingular: boolean = false
    ) {
        this.type = type;
        let modelInstance: Model = (new (<any> type)());
        baseModelType = baseModelType
            ? baseModelType
            : modelInstance.getResource();
        this.query = new Query(baseModelType, queriedRelationName);
        this.httpClient = type.getHttpClient();
        this.forceSingular = forceSingular;
    }

    public get(page: number = 0): Promise<Response> {
        return <Promise<any>> this.getHttpClient().get(this.query.toString()).then(resp => {
            return resp.getData();
        })
    }

    public find(id: number): Promise<Response> {
        return <Promise<any>> this.getHttpClient().get(this.query.toString(id)).then(resp => {
            return resp.getData();
        })
    }

    public where(attribute: string, value: string): Builder
    {
        this.query.addFilter(new FilterSpec(attribute, value));
        return this;
    }

    private getHttpClient(): HttpClient {
        return this.httpClient;
    }
}