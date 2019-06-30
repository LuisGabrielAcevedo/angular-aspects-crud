import { PaginationSpec } from './pagination/pagination-spec';
import { FilterSpec } from './filter/filter-spec';
import { Option } from './option/option';
import { SortSpec } from './sort/sort-spec';

export class Query {
    protected resource: string;
    protected queriedRelationName: string | undefined;
    protected idToFind: string | number;
    protected paginationSpec: PaginationSpec;
    protected include: string[];
    protected filters: FilterSpec[];
    protected options: Option[];
    protected sort: SortSpec[];

    constructor(resource: string, queriedRelationName: string | undefined = undefined) {
        this.resource = resource;
        this.queriedRelationName = queriedRelationName;
        this.include = [];
        this.filters = [];
        this.options = [];
        this.sort = [];
    }

    public getPaginationSpec(): PaginationSpec {
        return this.paginationSpec;
    }

    public toString(id?: number): string {
        return id ? `${this.resource}/${id}` : this.resource;
    }

    public addFilter = (filter: FilterSpec) => void this.filters.push(filter);
}