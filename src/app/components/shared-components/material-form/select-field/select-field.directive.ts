import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFormSelectFieldDirective]',
})
export class FormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
