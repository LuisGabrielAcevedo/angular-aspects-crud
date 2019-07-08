import { Builder } from './builder';

export class BuilderMixin {
    public builderClass(): typeof Builder {
        return Builder;
    }

    public builder(): Promise<Builder> {
        const builderClass: typeof Builder = this.builderClass();
        const builder: Builder = new builderClass(this);
        return builder.initializationPromise;
    }
}
