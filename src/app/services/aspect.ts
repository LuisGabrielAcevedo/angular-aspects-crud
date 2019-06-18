export class Aspect {
  name: string;
  accessor: string;
  type: string;
  default_value: string;
  nullable: boolean;
  options: {
    [key: string]: any;
  };
  constructor(
    name: string,
    accessor: string,
    type: string,
    default_value: string,
    nullable: boolean,
    options?: {
      [key: string]: any;
    }
  ) {
    this.name = name;
    this.accessor = accessor;
    this.type = type;
    this.default_value = default_value
    this.nullable = nullable;
    this.options = options ? options : [];
  }

  label = () => this.options.label ? this.options.label : this.name;

  isRequired = () => this.options.required; 
  
  isVisible = () => this.options.visible;

  isEditable = () => this.options.editable;

  isImportable = () => this.options.importable;
}
