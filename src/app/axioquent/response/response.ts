import { Query } from "../query";
import { HttpClientResponse } from '../axios/interfaces/http-client-response';

export abstract class Response {
    private _query: Query | undefined;

    private axiosResponse: HttpClientResponse;

    constructor(
        query: Query | undefined,
        axiosResponse: HttpClientResponse,
    ) {
        this._query = query;
        this.axiosResponse = axiosResponse;
    }

    public getHttpClientResponse(): HttpClientResponse {
        return this.axiosResponse;
    }

    protected get query(): Query | undefined {
        return this._query;
    }
}