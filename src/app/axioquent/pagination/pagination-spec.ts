import {QueryParam} from '../query-params';

export abstract class PaginationSpec {
    public abstract getPaginationParameters(): QueryParam[];
    public abstract setPage(value: number);
    public abstract setPageLimit(pageLimit: number);
}