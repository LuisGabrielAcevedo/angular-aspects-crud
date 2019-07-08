import {ObjectToText} from './object-to-text';
import {isNull} from 'util';

export class FloatToText extends ObjectToText {
    precision: number;

    public applyOptions(options: any) {
        super.applyOptions(options);
        this.precision = options.precision;
    }

    public displayFor(number: any, options: any) {
        if (isNull(number)) {
            return this.null_string;
        }
        return this.displayValueFor(number, options);
    }

    public displayValueFor(number, options = {}) {
        return this.round(number);
    }

    public fromDisplay(text, options: any[]) {
        return this.round(text);
    }

    private round(number: any) {
        if (isNull(this.precision)) {
            return number;
        }
        return parseFloat(number).toFixed(this.precision);
    }
}


