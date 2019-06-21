import {Aspect} from '../aspect';
import { FormControlInterface } from '../../interfaces/form-control-interface';

export abstract class Base implements FormControlInterface {
    aspect: Aspect;
    options = [];

    protected constructor(aspect, options) {
        this.aspect = aspect;
        this.options = options;
    }

    fieldFor(form: any, options: any) {
        this.mergeOptions(options);
        if (this.options.includes('hidden')) {
            this.renderHiddenFieldFor(form, options);
        } else {
            this.renderFieldFor(form, options);
        }
    }

    searchFieldFor(form: any, options: any) {
        this.mergeOptions(options);
        this.renderSearchFieldFor(form, options);
    }

    private mergeOptions(options: any) {
        this.options.concat(options);
        this.options.concat({'placeholder': this.aspect.label});
    }

    public renderHiddenFieldFor(form, options){}

    abstract renderFieldFor(form, options);
    abstract renderSearchFieldFor(form, options);
    abstract getComponent();
}


