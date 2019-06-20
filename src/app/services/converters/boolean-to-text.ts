import {ObjectToText} from './object-to-text';
import {isNull} from 'util';

export class BooleanToText extends ObjectToText {

    public displayFor(boolean: any, options = {}) {
        if (isNull(boolean)) {
            return this.null_string;
        }
        return this.displayValueFor(boolean, options);
    }

    public fromDisplay(text, options: {}) {
        return this.parse(text);
    }

    private parse(text: any) {
        if ((/^(true|t|yes|y|1|si|sí|v)$/i).test(text)) {
            return true;
        }
        if (this.isEmpty(text) || (/^(false|f|no|n|0)$/i).test(text)) {
            return false;
        }
        throw new Error('invalid value for Boolean: "#{text}"');
    }

    private isEmpty(str) {
        return (isNull(str) || 0 === str.length);
    }
}


