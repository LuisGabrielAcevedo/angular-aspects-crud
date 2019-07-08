import { Response } from "../response/response";
import { Builder } from '../builder';

export interface QueryMethods {
    get(page: number): Promise<Response>;
    find(id: number): Promise<Response>;
    where(attribute: string, value: string): Builder;
}