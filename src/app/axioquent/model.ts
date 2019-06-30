import { HttpClient } from './axios/interfaces/http-client';
import { AxiosHttpClient } from './axios-http-client';
import { Builder } from 'src/app/axioquent/builder';
import { HttpClientResponse } from './axios/interfaces/http-client-response';
import { AttributesMap } from './attribute/attributes.map';
import { ModelResource } from './interfaces/resource-model';

export abstract class Model {
    public abstract getBaseUrl(): string;
    protected resource: string;
    protected static pageSize: number = 50;
    protected static paginationPageNumberParamName: string = 'page[number]';
    protected static paginationPageSizeParamName: string = 'page[size]';
    protected static paginationOffsetParamName: string = 'page[offset]';
    protected static paginationLimitParName: string = 'page[limit]';
    private id: number | undefined;
    private static httpClient: HttpClient;
    private attributes: AttributesMap<any>;

    constructor() {
        this.attributes = new AttributesMap();
        if (!Model.httpClient) Model.httpClient = new AxiosHttpClient();
        this.initHttpClient();
    }

    private initHttpClient(): void {
        Model.httpClient.setBaseUrl(this.getBaseUrl());
    }

    public getResource(): string {
        return this.resource;
    }

    public static getHttpClient(): HttpClient {
        return this.httpClient;
    }

    public static all(page?: number): Promise<any> {
        return new Builder(this).get(page);
    }

    public static find(id: number): Promise<any> {
        return new Builder(this).find(id);
    }

    public static where(attribute: string, value: string): Builder
    {
        return new Builder(this)
            .where(attribute, value);
    }

    public save(): Promise<any> {
        const payload: any = this.attributes.toArray();
        if (this.id) {
            return Model.httpClient.put(this.getResource() + `/${this.id}`, payload)
                .then((resp: HttpClientResponse) => {
                    return resp.getData();
                });
        } else {
            return Model.httpClient.post(this.getResource(), payload)
                .then((resp: HttpClientResponse) => {
                    return resp.getData();
                });
        }

    }

    public create(modelResource: ModelResource): void {
        this.id = modelResource.id ? modelResource.id : undefined;
        for (let key in modelResource) {
            this.setAttribute(key, modelResource[key]);
        }
    }

    public delete(id?: number): Promise<void> {
        if (id) this.id = id;
        if (!this.id) throw new Error('Cannot delete a model with no ID.');
        return Model.httpClient
            .delete(this.getResource() + `/${this.id}`)
            .then(function () { });
    }

    protected setAttribute(attributeName: string, value: any): void {
        this.attributes.set(attributeName, value);
    }

    public getApiId(): number | undefined {
        return this.id;
    }
}