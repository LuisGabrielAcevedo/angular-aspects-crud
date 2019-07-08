import { Aspect } from './aspect';
import { AspectsResponseInterface } from './interfaces/aspects-response';
declare var require: any;

export class Builder {
    initializationPromise: Promise<Builder> = null;
    model_class;
    columns = 2;
    localDirectory: string = null;
    aspects_table: { [key: string]: Aspect } = {};
    search_fields: { [key: string]: Aspect } = {};

    constructor(model_class, localDirectory?: string) {
        this.localDirectory = localDirectory || null;
        this.model_class = model_class;
        this.initializationPromise = this.buildAspects();
    }

    private getAspects = async (): Promise<AspectsResponseInterface> => {
        return await this.model_class.aspects();
    }

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

    private async buildAspects() {
        if (!this.localDirectory) {
            const resp = await this.getAspects();
            resp.aspects.forEach(aspect => this.setAspectFromApiObject(aspect));
            this.setSearch(resp.search_fields);
        } else {
            const url = `${this.localDirectory}/${this.model_class.getResource()}`;
            const aspects = await require(`src/app/${url}`).default;
            aspects.forEach(aspect => this.setAspectFromApiObject(aspect));

        }
        this.customizeAspects();
        return this;
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

    public aspectOptions(aspects: any[], options = {}) {
        this.setOptions(aspects, options);
    }

    private setSearch(args: { [key: string]: string[] }) {
        const self = this;
        for (const [key, conditions] of Object.entries(args)) {
            const asp = this.aspectNamed(key);
            conditions.forEach((cond) => {
                if (asp) { self.search_fields[asp.name + '_' + cond] = asp; }
            });
        }
    }

    public aspectNamed(name) {
        return this.aspects_table[name];
    }

    public searchFields() {
        return this.search_fields;
    }

    private setOptions(aspects: any[], options: object) {
        const self = this;
        aspects.forEach(function (asp) {
            const aspect = self.aspects_table[asp];
            if (aspect) { aspect.setOptions(options); }
        });
    }

    public formColumns() {
        return 2;
    }
}
