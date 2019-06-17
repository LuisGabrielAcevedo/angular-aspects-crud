import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Aspect {
  name: string;
  accessor : string;
  type: string;
  default_value: string;
  nullable: boolean;
  options: any[];
  constructor(
    name,
    accessor,
    type,
    default_value,
    nullable,
    options?
  ) {
    this.name = name;
    this.accessor = accessor;
    this.type = type;
    this.default_value = default_value
    this.nullable = nullable;
    this.options = options ? options: [];
  }

  label() {
    // @ts-ignore
    return this.options.label ? this.options.label : this.name;
  }

  isRequired () {
    // @ts-ignore
    return this.options.required ? this.options.required : !this.nullable;
  }

  isVisible () {
    // @ts-ignore
    return this.options.visible ? this.options.visible : true;
  }
}
