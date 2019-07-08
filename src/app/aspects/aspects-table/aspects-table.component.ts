import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AspectInferface } from '../interfaces/aspect';
import { AspectTableItem } from './aspect-table.interfaces';

@Component({
  selector: 'app-aspects-table',
  templateUrl: './aspects-table.component.html',
  styleUrls: ['./aspects-table.component.css']
})
export class AspectsTableComponent implements OnInit {
  @Input() public aspects: AspectInferface[];
  @Input() public data: AspectTableItem[];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const data: AspectInferface[] = changes.data ? changes.data.currentValue : undefined;
    const aspects: AspectInferface[] = changes.aspects ? changes.aspects.currentValue : undefined;
    if (data && data.length) {
      console.log(data);
    }
    if (aspects && aspects.length) {
      console.log(aspects);
    }
  }
}
