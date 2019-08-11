export interface AspectsStoreRequestInterface {
    modelClass: any;
    resource: string;
}

export interface AspectsStoreResourceInformation {
    [key: string]: {
        indexAspects?: any;
        formAspects?: any;
        searchFields?: any;
        columns?: any;
    };
}
