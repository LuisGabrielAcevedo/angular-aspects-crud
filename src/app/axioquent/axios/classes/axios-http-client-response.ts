import {AxiosResponse} from "axios";
import { HttpClientResponse } from '../interfaces/http-client-response';

export class AxiosHttpClientResponse implements HttpClientResponse {
    private axiosResponse: AxiosResponse;
    constructor(axiosResponse: AxiosResponse) {
        this.axiosResponse = axiosResponse;
    }

    getData(): any {
        return this.axiosResponse.data;
    }

    getUnderlying(): any {
        return this.axiosResponse;
    }
}