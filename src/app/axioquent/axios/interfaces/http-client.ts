import { HttpClientPromise } from "./http-client-promise";

export interface HttpClient {
    setBaseUrl(baseUrl: string): void

    setWithCredentials(withCredientials: boolean): void

    get(url: string): HttpClientPromise;

    delete(url: string): HttpClientPromise;

    head(url: string): HttpClientPromise;

    post(url: string, data?: any): HttpClientPromise;

    put(url: string, data?: any): HttpClientPromise;

    patch(url: string, data?: any): HttpClientPromise;

    getImplementingClient(): any;
}
