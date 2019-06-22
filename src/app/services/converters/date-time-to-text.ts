import {ObjectToText} from './object-to-text';
import {isNull} from 'util';
import * as moment from 'moment';

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
        const formatted_date = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format(this.getMomentFormat());
        return this.displayValueFor(formatted_date, options);
    }

    private getMomentFormat() {
        if (this.format === 'default') {
            return 'YYYY-MM-DD HH:mm:ss';
        }
        if (this.format === 'long') {
            return 'LLLL';
        }
        if (this.format === 'short') {
            return 'LLL';
        }
        return 'YYYY-MM-DD HH:mm:ss';
    }

    public fromDisplay(text, options: {}) {
        return Date.parse(text);
    }
}


