import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ComponentFactoryResolver,
    OnChanges,
    SimpleChanges,
    SimpleChange
} from '@angular/core';
import { AspectComponent } from './select-aspect-component.instance';
import { AspectsTableDirective } from './select-aspect-component.directive';
import { TableAspectDataInterface } from '../aspect-table.interfaces';


@Component({
    selector: 'app-aspect-component',
    template: `<ng-template app-aspects-table-directive></ng-template>`
})
export class SelectAspectComponent implements OnInit, OnChanges {
    @ViewChild(AspectsTableDirective) aspectsTableDirective: AspectsTableDirective;
    @Input() data: TableAspectDataInterface;
    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const cData: SimpleChange = changes.data;
        if (cData) { this.data = { ...cData.currentValue }; }
        this.loadComponent();
    }

    loadComponent() {
        const formAspect = new AspectComponent(this.data.aspect.getFormComponent(), this.data);
        const componentInstance = this.generateInstance<any>(formAspect);
        componentInstance.aspect = this.data.aspect;
    }

    private generateInstance<T>(FieldInstanceComponent: AspectComponent) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FieldInstanceComponent.component);
        const viewContainerRef = this.aspectsTableDirective.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        const componentInstance = <T>componentRef.instance;
        return componentInstance;
    }
}
