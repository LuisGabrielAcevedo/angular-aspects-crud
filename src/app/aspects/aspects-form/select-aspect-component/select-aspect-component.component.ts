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
import { cloneDeep } from 'lodash';

@Component({
    selector: 'app-aspect-component',
    template: `<ng-template app-aspects-form-directive></ng-template>`
})
export class SelectAspectComponent implements OnInit, OnChanges {
    @ViewChild(AspectsFormDirective) aspectsFormDirective: AspectsFormDirective;
    @Input() data: FormAspectDataInterface;
    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const data: FormAspectDataInterface = changes.data ? changes.data.currentValue : undefined;
        if (data) { this.data = data; }
        this.loadComponent();
    }

    loadComponent() {
        const formAspect = new AspectComponent(this.data.aspect.getFormComponent(), this.data);
        const componentInstance = this.generateInstance<any>(formAspect);
        componentInstance.aspect = cloneDeep(this.data.aspect);
        componentInstance.model = cloneDeep(this.data.model);
        componentInstance.group = this.data.group;
        componentInstance.appearance = this.data.appearance;
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
