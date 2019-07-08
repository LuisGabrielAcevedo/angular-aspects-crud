import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-aspects-table-directive]'
})
export class AspectsTableDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
