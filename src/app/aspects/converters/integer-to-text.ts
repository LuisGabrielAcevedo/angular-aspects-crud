import {ObjectToText} from './object-to-text';

export class IntegerToText extends ObjectToText {

    public displayValueFor(object, options = {}) {
        return object ? parseInt(object, 10) : object;
    }

    public fromDisplay(text, options = {}) {
        return parseInt(text, 10);
    }

}
