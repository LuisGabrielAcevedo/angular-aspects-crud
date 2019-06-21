import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[aspectsFormDirective]',
})
export class AspectsFormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}