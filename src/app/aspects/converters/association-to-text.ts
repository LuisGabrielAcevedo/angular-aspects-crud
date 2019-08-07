import {ObjectToText} from './object-to-text';

export class AssociationToText extends ObjectToText {

    association_class: string;
    association_key: string;

    public applyOptions(options: any) {
        super.applyOptions(options);
        this.association_class = options.association_class;
        this.association_key = options.association_key || 'name';
    }

    public displayValueFor(object, options = {}) {
        return object[this.association_key];
    }
}
