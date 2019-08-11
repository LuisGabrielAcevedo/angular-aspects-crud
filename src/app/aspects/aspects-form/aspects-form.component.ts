import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AspectInferface } from '../interfaces/aspect';
import { AspectsFormModel } from '../interfaces/aspects-form-model';
import { chunk, cloneDeep } from 'lodash';
import { AspectsSearch } from '../interfaces/aspects-search';
import { ColumnsFormatted, AspectsGroup } from './aspects-form.interfaces';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-aspects-form',
  templateUrl: './aspects-form.component.html',
  styleUrls: ['./aspects-form.component.css']
})
export class AspectsFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private messagesService: MessagesService
  ) {
  }
  @Input() public aspects: AspectInferface[] | AspectsSearch;
  @Input() public model: AspectsFormModel;
  @Input() public appearance = 'standard';
  @Input() public columns = 1;
  @Output() submitted: any = new EventEmitter();
  @ViewChild('aspectsForm') form: ElementRef;
  public aspectsCopy: AspectInferface[] | AspectsSearch = [];
  public modelCopy: AspectsFormModel;
  aspectsFormatted: AspectsGroup[] = [];
  leftAspectsGroup: AspectInferface[] = [];
  rightAspectsGroup: AspectInferface[] = [];
  index = 0;
  group: FormGroup;
  ngOnInit() {
    this.group = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    const aspects: AspectInferface[] | AspectsSearch = changes.aspects ? changes.aspects.currentValue : undefined;
    if (aspects) { this.aspectsCopy = cloneDeep(aspects); 
      this.initForm();
    }
  }

  initForm() {
    this.aspectsFormatted = [];
    this.leftAspectsGroup = [];
    this.rightAspectsGroup = [];
    if (Array.isArray(this.aspectsCopy)) {
      if (this.aspectsCopy.length) { this.aspectsFormattedAction(); }
    } else if (typeof this.aspectsCopy === 'object') {
      if (Object.keys(this.aspectsCopy).length) {
        this.aspectsSearchFormatted();
      }
    } else {
      throw new Error('The argument for input aspects must be a object or an array');
    }
  }

  aspectsFormattedAction(): void {
    (this.aspectsCopy as AspectInferface[]).forEach(aspect => {
      const tab: string = aspect.options.tab;
      const group: string = aspect.options.group;
      if (tab) {
        const group = this.aspectsFormatted.find(aspectFormatted => aspectFormatted.tab === tab);
        group ? (group.aspects as AspectInferface[]).push(aspect) : this.aspectsFormatted.push({
          tab,
          aspects: [aspect]
        });
      } else if (group) {
        group === 'left' ? this.leftAspectsGroup.push(aspect) : this.rightAspectsGroup.push(aspect);
      }
    });
    this.aspectsFormattedColumns();
  }

  aspectsFormattedColumns() {
    if (!this.aspectsFormatted.length) {
      this.aspectsFormatted = [{
        tab: 'default_tab',
        aspects: this.aspectsCopy as AspectInferface[]
      }];
    }
    this.aspectsFormatted = this.aspectsFormatted.map((tab, i) => {
      if (tab.aspects.length === 1) {
        const row: ColumnsFormatted = {
          fxLayout: 100,
          aspects: tab.aspects as AspectInferface[]
        };
        tab.aspects = [row];
      } else {
        tab.aspects = this.columnsFormattedAction(tab.aspects as AspectInferface[]);
      }
      return tab;
    });
  }

  columnsFormattedAction(aspects: AspectInferface[]): ColumnsFormatted[] {
    const fxLayout: number = Math.floor(100 / this.columns);
    const rowsToAdd: ColumnsFormatted[] = [];
    const aspectsToAdd: Array<AspectInferface[]> = chunk(aspects, this.columns);
    aspectsToAdd.forEach(aspectsArray => {
      rowsToAdd.push({
        fxLayout: fxLayout,
        aspects: aspectsArray
      });
    });
    return rowsToAdd;
  }

  aspectsSearchFormatted() {
    const aspectsToSearch: AspectInferface[] = [];
    Object.keys(this.aspectsCopy).forEach(key => {
      const aspect: AspectInferface = this.aspectsCopy[key];
      aspect.accessor = key;
      aspect.options.required = false;
      aspectsToSearch.push(aspect);
    });
    this.aspectsCopy = aspectsToSearch;
    this.aspectsFormattedColumns();
  }

  submit(): void {
    let outObject = this.group.value;
    if (this.modelCopy) { outObject = { ... this.modelCopy, ...this.group.value }; }
    this.group.valid ? this.submitted.emit(outObject) : this.validateAllFormFields(this.group);
  }

  reset(): void {
    this.group.reset();
    this.submitted.emit(this.group.value);
  }

  validateAllFormFields(formGroup: FormGroup) {         
  Object.keys(formGroup.controls).forEach(field => {  
    const control = formGroup.get(field);             
    if (control instanceof FormControl) {             
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        
      this.validateAllFormFields(control);            
    }
  });
}
}

