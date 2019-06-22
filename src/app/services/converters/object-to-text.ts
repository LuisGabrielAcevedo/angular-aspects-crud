export class ObjectToText {

    null_string: String;

    constructor(options: any) {
        this.applyOptions(options);
    }

    public applyOptions(options: any) {
        this.null_string = options.null_string || '';
    }

    public displayFor(object, options = {}) {
        return object ? this.displayValueFor(object).toString() : this.nullString(options);
    }

    public displayValueFor(object, options = {}) {
        return object;
    }

    public fromDisplay(text, options = {}) {
        return text;
    }

    private nullString(options) {
        return options.null_string || this.null_string;
    }

}


