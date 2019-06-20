import {ObjectToText} from './object-to-text';

export class IntegerToText extends ObjectToText {

    displayValueFor(object) {
        return object;
    }

    fromDisplay(text, options: any[]) {
        return text;
    }

}


