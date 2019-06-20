export class ObjectToText {

    null_string: String;

    constructor(options: any) {
        this.applyOptions(options);
    }

    private applyOptions(options: any) {
        this.null_string = options.null_string || '';
    }

    displayFor(object, options: any[]) {
        object ? this.displayValueFor(object).toString() : this.nullString(options);
    }

    displayValueFor(object) {
        return object;
    }

    fromDisplay(text, options: any[]) {
        return text;
    }

    private nullString(options) {
        return options.null_string || this.null_string;
    }

}


