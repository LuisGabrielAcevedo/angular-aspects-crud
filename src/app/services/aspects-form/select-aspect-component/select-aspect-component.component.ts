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
import { AspectsFormDirective } from './select-aspect-component.directive';
import { FormAspectDataInterface } from '../aspects-form.interfaces';
import { AspectComponent } from './select-aspect-component.instance';


@Component({
    selector: 'app-aspect-component',
    template: `<ng-template aspectsFormDirective></ng-template>`
})
export class SelectAspectComponent implements OnInit, OnChanges {
    @ViewChild(AspectsFormDirective) aspectsFormDirective: AspectsFormDirective;
    @Input() data: FormAspectDataInterface;
    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const cData: SimpleChange = changes.data;
        if (cData) this.data = { ...cData.currentValue };
        this.loadComponent();
    }

    loadComponent() {
        const formAspect = new AspectComponent(this.data.aspect.getComponent(), this.data);
        const componentInstance = this.generateInstance<any>(formAspect);
        componentInstance.aspect = this.data.aspect;
        componentInstance.model = this.data.model;
        componentInstance.group = this.data.group;
    }

    private generateInstance<T>(FieldInstanceComponent: AspectComponent) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FieldInstanceComponent.component);
        const viewContainerRef = this.aspectsFormDirective.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        const componentInstance = <T>componentRef.instance;
        return componentInstance;
    }
}