import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-aspects-form-directive]'
})
export class AspectsFormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
