import { Base } from './base';
import { ImageComponent } from '../aspects-form/image/image.component';

export class File extends Base {
    public getFormComponent = (): typeof ImageComponent => ImageComponent;
}
