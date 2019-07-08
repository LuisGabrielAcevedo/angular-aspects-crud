import { Base } from 'src/app/aspects/form-control/base';
import { ObjectToText } from '../converters/object-to-text';
import { AspectOptions } from './aspect-elements';

export interface AspectInferface {
    name: string;
    accessor: string;
    type: string;
    default_value: string;
    nullable: boolean;
    options: AspectOptions;
    form_control: Base;
    converter: ObjectToText;
    isRequired: () => boolean;
    isVisible: () => boolean;
    isEditable: () => boolean;
    isIndexAspect: () => boolean;
    isImportable: () => boolean;
    fieldFor: (form: any, view_options: any) => void;
    searchFieldFor: (form: any, view_options: any) => void;
    getFormComponent: () => any;
    label: () => string;
    defaultValue: () => any;
    selectOptions: () => any;
    setOptions(args: object): void;
}
