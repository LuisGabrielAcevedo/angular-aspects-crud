import { ObjectToText } from './object-to-text';

export class AssociationToText extends ObjectToText {
    public fromDisplay(label: string, options: object) {
        return options[label || 'name'];
    }
}
