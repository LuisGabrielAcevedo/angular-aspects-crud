export interface AspectElementsInterface {
    name: string;
    accessor: string;
    type: string;
    default_value?: any;
    nullable: boolean;
    options: AspectOptions;
}

export interface AspectOptions {
    priority?: number;
    required?: boolean;
    importable?: boolean;
    visible?: boolean;
    editable?: boolean;
    enum?: boolean;
    label?: string;
    has_unit?: boolean;
    index?: boolean;
    control_type?: string;
    unit_group?: string;
    unit_label?: string;
    foreign_key?: string;
    tab?: string;
    association_class?: any;
    association_key?: string;
    form_component?: string;
    table_component?: string;
    in?: any[];
    [key: string]: any;
}
