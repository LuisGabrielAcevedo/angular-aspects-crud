import {ObjectToText} from './object-to-text';
import {isNull} from 'util';
import * as moment from 'moment';

export class DateTimeToText extends ObjectToText {
    format: string;

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
       return this.momentFormatTypes()[this.format] || 'YYYY-MM-DD HH:mm:ss';
    }

    private momentFormatTypes() {
        return {
            long: 'LLLL',
            short: 'LLL'
        };
    }

    public fromDisplay(text, options: {}) {
        return Date.parse(text);
    }
}


