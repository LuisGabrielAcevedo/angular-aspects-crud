import {Aspect} from './aspect';
import {Observable} from 'rxjs';
import {AspectsResponseInterface} from '../interfaces/aspects-response';

export class Builder {
    initializationPromise = null;
    model_class;
    aspects_table: {[key: string]: Aspect} = {};
    search_fields: string[] = [];

    constructor(model_class) {
        this.model_class = model_class;
        this.initializationPromise = this.buildAspects();
    }

    private getAspects = (): Observable<AspectsResponseInterface> =>
        this.model_class.getAspectsFromAPI()

    public aspects() {
        return Object.values(this.aspects_table);
    }

    public sortedAspects() {
        return this.aspects().sort();
    }

    public indexAspects() {
        return this.sortedAspects().filter(aspect => aspect.isIndexAspect());
    }

    public formAspects() {
        return this.sortedAspects().filter(aspect => aspect.isEditable());
    }

    public importableAspects() {
        return this.sortedAspects().filter(aspect => aspect.isImportable());
    }

    private buildAspects() {
        return new Promise((resolve) => {
            this.getAspects().subscribe(resp => {
                resp.aspects.forEach(aspect => this.setAspectFromApiObject(aspect));
                this.setSearch(resp.search_fields);
                this.customizeAspects()
                resolve(this);
            });
        });
    }

    private setAspectFromApiObject(aspect) {
        this.addNewAspect(
            aspect.name,
            aspect.accessor,
            aspect.type,
            aspect.default_value,
            aspect.nullable,
            aspect.options
        );
    }

    public addNewAspect(name: string, accessor: string, type: string, default_value: string, nullable: boolean, options: {}) {
        const asp = new Aspect(
            name,
            accessor,
            type,
            default_value,
            nullable,
            options
        );
        this.aspects_table[asp.name] = asp;
    }

    public customizeAspects() {
        // Hook
    }

    public aspectOptions(aspects: any[], options= {}) {
        this.setOptions(aspects, options);
    }

    public setSearch = (args) => this.search_fields = args;

    private setOptions(aspects: any[], options: {}) {
        const self = this;
        aspects.forEach(function(asp) {
            const aspect = self.aspects_table[asp];
            if (aspect) {
                aspect.setOptions(options);
            }
        });
    }
}
