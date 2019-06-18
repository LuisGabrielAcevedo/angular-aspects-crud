export interface AspectInterface {
    name: string;
    accessor: string;
    type: string;
    default_value?: any;
    nullable: boolean;
    options: Options;
}

export interface Options {
    priority: number;
    required: boolean;
    importable: boolean;
    visible: boolean;
    editable: boolean;
    enum: boolean;
    label: string;
    has_unit: boolean;
    unit_group?: any;
    unit_label?: any;
}