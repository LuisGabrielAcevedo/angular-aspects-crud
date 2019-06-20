import {ObjectToText} from './object-to-text';
import {isNull} from 'util';

export class DateTimeToText extends ObjectToText {
    format: String;

    public applyOptions(options: any) {
        super.applyOptions(options);
        this.format = options.format || 'default';
    }

    public displayFor(date: any, options = {}) {
        if (isNull(date)) {
            return this.null_string;
        }
        // options.format = this.format; @mcalvo
        return this.displayValueFor(date, options);
    }

    public fromDisplay(text, options: {}) {
        return Date.parse(text);
    }
}


