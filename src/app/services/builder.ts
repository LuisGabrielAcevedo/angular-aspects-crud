import {Aspect} from './aspect';
import {Observable} from 'rxjs';
import {AspectInterface} from 'src/app/interfaces/aspect';
import {AspectsResponseInterface} from '../interfaces/aspects-response';

export class Builder {
    initializationPromise = null;
    model_class;
    aspects_table: Aspect[] = [];
    index_aspects: Aspect[] = [];
    search_fields: string[] = [];

    constructor(model_class) {
        this.model_class = model_class;
        this.initializationPromise = this.buildAspects();
    }

    private getAspects = (): Observable<AspectsResponseInterface> =>
        this.model_class.getAspectsFromAPI()

    public aspects() {
        return this.aspects_table;
    }

    public indexAspects() {
        return this.index_aspects;
    }

    public formAspects() {
        return this.aspects_table.filter(aspect => aspect.isEditable());
    }

    public importableAspects() {
        return this.aspects_table.filter(aspect => aspect.isImportable());
    }

    private buildAspects() {
        return new Promise((resolve) => {
            this.getAspects().subscribe(resp => {
                resp.aspects.forEach(aspect => this.aspects_table.push(this.getAspectFromApiObject(aspect)));
                resp.index_aspects.forEach(aspect => this.index_aspects.push(this.getAspectFromApiObject(aspect)));
                this.setSearch(resp.search_fields);
                this.customizeAspects();
                resolve(this);
            });
        });
    }

    private getAspectFromApiObject = (aspect: AspectInterface): Aspect =>
        this.addNewAspect(
            aspect.name,
            aspect.accessor,
            aspect.type,
            aspect.default_value,
            aspect.nullable,
            aspect.options
        )

    public addNewAspect(name: string, accessor: string, type: string, default_value: string, nullable: boolean, options: {}) {
        return new Aspect(
            name,
            accessor,
            type,
            default_value,
            nullable,
            options
        );
    }

    public customizeAspects() {
        // Hook
    }

    public setSearch = (args) => this.search_fields = args;

}
